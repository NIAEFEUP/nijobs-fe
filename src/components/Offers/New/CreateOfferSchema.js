/* istanbul ignore file */
import { format } from "date-fns";
import * as yup from "yup";
import { ValidationReasons } from "../../../utils";
import { generateValidationRule, isValidPublishEndDate } from "./CreateOfferUtils";

export default yup.object().shape({
    title: yup.string()
        .required(ValidationReasons.REQUIRED)
        .max(...generateValidationRule("title", "maxLength", ValidationReasons.TOO_LONG)),
    publishDate: yup.date(ValidationReasons.DATE)
        .min(format(new Date(), "yyyy-MM-dd"), ValidationReasons.DATE_EXPIRED)
        .typeError(ValidationReasons.DATE)
        .required(),
    publishEndDate: yup.date(ValidationReasons.DATE)
        .min(format(new Date(), "yyyy-MM-dd"), ValidationReasons.DATE_EXPIRED)
        .typeError(ValidationReasons.DATE)
        .nullable(true)
        .required(ValidationReasons.REQUIRED)
        .when("publishDate", (publishDate, schema) => schema.test({
            test: (publishEndDate) => isValidPublishEndDate(publishDate, publishEndDate),
            message: ValidationReasons.PUBLISH_END_DATE,
        })),

    jobDuration: yup.array()
        .of(yup.number(ValidationReasons.INT).positive()),
    jobStartDate: yup.date(ValidationReasons.DATE)
        .min(format(new Date(), "yyyy-MM-dd"), ValidationReasons.DATE_EXPIRED)
        .typeError(ValidationReasons.DATE)
        .nullable(true),
    description: yup.string()
        .required(ValidationReasons.REQUIRED),
    descriptionText: yup.string()
        .required(ValidationReasons.REQUIRED)
        .max(...generateValidationRule("description", "maxLength", ValidationReasons.TOO_LONG)),
    contacts: yup.array()
        .min(...generateValidationRule("contacts", "minLength", ValidationReasons.OPTIONS_TOO_SHORT))
        .of(
            yup.object().shape({
                value: yup.string()
                    .min(1, ValidationReasons.TOO_SHORT(1)),
            })
        ),
    vacancies: yup.lazy((value) => {
        if (value === "") {
            return yup.string();
        }

        return yup.number(ValidationReasons.INT);
    }),
    jobType: yup.string()
        .nullable(true),
    fields: yup.array()
        .min(...generateValidationRule("fields", "minLength", ValidationReasons.OPTIONS_TOO_SHORT))
        .max(...generateValidationRule("fields", "maxLength", ValidationReasons.OPTIONS_TOO_LONG))
        .required(ValidationReasons.REQUIRED),
    technologies: yup.array()
        .min(...generateValidationRule("technologies", "minLength", ValidationReasons.OPTIONS_TOO_SHORT))
        .max(...generateValidationRule("technologies", "maxLength", ValidationReasons.OPTIONS_TOO_LONG))
        .required(ValidationReasons.REQUIRED),
    location: yup.string()
        .nullable(true)
        .matches(/^([a-zA-Z]+([\s-][a-zA-Z])*)+, ([a-zA-Z]+([\s-][a-zA-Z])*)+$/,
            ValidationReasons.LOCATION_FORMAT)
        .required(ValidationReasons.REQUIRED),
    requirements: yup.array()
        .min(...generateValidationRule("requirements", "minLength", ValidationReasons.OPTIONS_TOO_SHORT))
        .of(
            yup.object().shape({
                value: yup.string()
                    .min(1, ValidationReasons.TOO_SHORT(1)),
            })
        ),
    isHidden: yup.boolean(ValidationReasons.BOOLEAN),
    owner: yup.string(),
});

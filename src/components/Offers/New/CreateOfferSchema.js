/* istanbul ignore file */
import { format } from "date-fns";
import * as yup from "yup";
import { HumanValidationReasons } from "../../../utils";
import { generateValidationRule, isValidPublishEndDate } from "./CreateOfferUtils";

export default yup.object().shape({
    title: yup.string()
        .required(HumanValidationReasons.REQUIRED)
        .max(...generateValidationRule("title", "maxLength", HumanValidationReasons.TOO_LONG)),
    publishDate: yup.date(HumanValidationReasons.DATE)
        .min(format(new Date(), "yyyy-MM-dd"), HumanValidationReasons.DATE_EXPIRED)
        .typeError(HumanValidationReasons.DATE)
        .required(),
    publishEndDate: yup.date(HumanValidationReasons.DATE)
        .min(format(new Date(), "yyyy-MM-dd"), HumanValidationReasons.DATE_EXPIRED)
        .typeError(HumanValidationReasons.DATE)
        .nullable(true)
        .required(HumanValidationReasons.REQUIRED)
        .when("publishDate", (publishDate, schema) => schema.test({
            test: (publishEndDate) => isValidPublishEndDate(publishDate, publishEndDate),
            message: HumanValidationReasons.PUBLISH_END_DATE,
        })),
    jobDuration: yup.array()
        .of(yup.number(HumanValidationReasons.INT).positive()),
    jobStartDate: yup.date(HumanValidationReasons.DATE)
        .min(format(new Date(), "yyyy-MM-dd"), HumanValidationReasons.DATE_EXPIRED)
        .typeError(HumanValidationReasons.DATE)
        .nullable(true),
    description: yup.string()
        .required(HumanValidationReasons.REQUIRED),
    descriptionText: yup.string()
        .required(HumanValidationReasons.REQUIRED)
        .max(...generateValidationRule("description", "maxLength", HumanValidationReasons.TOO_LONG)),
    contacts: yup.array()
        .min(...generateValidationRule("contacts", "minLength", HumanValidationReasons.OPTIONS_TOO_SHORT))
        .of(
            yup.object().shape({
                value: yup.string()
                    .min(1, HumanValidationReasons.TOO_SHORT(1)),
            })
        ),
    vacancies: yup.lazy((value) => {
        if (value === "") {
            return yup.string();
        }

        return yup.number(HumanValidationReasons.INT);
    }),
    jobType: yup.string()
        .required(HumanValidationReasons.REQUIRED),
    fields: yup.array()
        .min(...generateValidationRule("fields", "minLength", HumanValidationReasons.OPTIONS_TOO_SHORT))
        .max(...generateValidationRule("fields", "maxLength", HumanValidationReasons.OPTIONS_TOO_LONG))
        .required(HumanValidationReasons.REQUIRED),
    technologies: yup.array()
        .min(...generateValidationRule("technologies", "minLength", HumanValidationReasons.OPTIONS_TOO_SHORT))
        .max(...generateValidationRule("technologies", "maxLength", HumanValidationReasons.OPTIONS_TOO_LONG))
        .required(HumanValidationReasons.REQUIRED),
    location: yup.string()
        .nullable(true)
        .matches(/^([a-zA-Z]+([\s-][a-zA-Z])*)+, ([a-zA-Z]+([\s-][a-zA-Z])*)+$/,
            HumanValidationReasons.LOCATION_FORMAT)
        .required(HumanValidationReasons.REQUIRED),
    requirements: yup.array()
        .min(...generateValidationRule("requirements", "minLength", HumanValidationReasons.OPTIONS_TOO_SHORT))
        .of(
            yup.object().shape({
                value: yup.string()
                    .min(1, HumanValidationReasons.TOO_SHORT(1)),
            })
        ),
    isHidden: yup.boolean(HumanValidationReasons.BOOLEAN),
    owner: yup.string(),
});

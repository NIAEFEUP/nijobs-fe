/* istanbul ignore file */
import * as yup from "yup";
import { ValidationReasons } from "../../../utils";
import { generateValidationRule } from "./CreateOfferUtils";


export default yup.object().shape({
    title: yup.string()
        .required(ValidationReasons.REQUIRED)
        .max(...generateValidationRule("title", "maxLength", ValidationReasons.TOO_LONG)),
    publishDate: yup.date(ValidationReasons.DATE)
        .required(),
    publishEndDate: yup.date(ValidationReasons.DATE)
        .nullable(true)
        .required(ValidationReasons.REQUIRED),
    jobDuration: yup.array()
        .of(yup.number(ValidationReasons.INT).positive()),
    jobStartDate: yup.date().nullable(true),
    description: yup.string()
        .required(ValidationReasons.REQUIRED),
    descriptionText: yup.string()
        .required(ValidationReasons.REQUIRED)
        .max(...generateValidationRule("description", "maxLength", ValidationReasons.TOO_LONG)),
    contact: yup.array()
        .min(1),
    vacancies: yup.lazy((value) => {
        if (value === "") {
            return yup.string();
        }

        return yup.number(ValidationReasons.INT);
    }),
    jobType: yup.string()
        .required(ValidationReasons.REQUIRED),
    fields: yup.array()
        .required(ValidationReasons.REQUIRED),
    technologies: yup.array()
        .required(ValidationReasons.REQUIRED),
    location: yup.string()
        .required(ValidationReasons.REQUIRED),
    requirements: yup.array()
        .of(yup.string()),
    isHidden: yup.boolean(ValidationReasons.BOOLEAN),
});

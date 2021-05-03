/* istanbul ignore file */
import * as yup from "yup";
import { ValidationReasons } from "../../../utils";
import { generateValidationRule } from "./CreateOfferUtils";


export default yup.object().shape({
    password: yup.string()
        .required(ValidationReasons.REQUIRED)
        .min(...generateValidationRule("password", "minLength", ValidationReasons.TOO_SHORT)),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match."),
    offerTitle: yup.string()
        .required(ValidationReasons.REQUIRED)
        .min(...generateValidationRule("offerTitle", "minLength", ValidationReasons.TOO_SHORT))
        .max(...generateValidationRule("offerTitle", "maxLength", ValidationReasons.TOO_LONG)),
    offerDescription: yup.string()
        .required(ValidationReasons.REQUIRED)
        .min(...generateValidationRule("offerDescription", "minLength", ValidationReasons.TOO_SHORT))
        .max(...generateValidationRule("offerDescription", "maxLength", ValidationReasons.TOO_LONG)),
    employmentType: yup.string()
        .required(ValidationReasons.REQUIRED)
        .min(...generateValidationRule("employmentType", "minLength", ValidationReasons.TOO_SHORT))
        .max(...generateValidationRule("employmentType", "maxLength", ValidationReasons.TOO_LONG)),
});

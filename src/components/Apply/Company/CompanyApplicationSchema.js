/* istanbul ignore file */
import * as yup from "yup";
import { ValidationReasons } from "../../../utils";
import { generateValidationRule } from "./CompanyApplicationUtils";


export default yup.object().shape({
    email: yup.string()
        .required(ValidationReasons.REQUIRED)
        .email(ValidationReasons.EMAIL),
    password: yup.string()
        .required(ValidationReasons.REQUIRED)
        .min(...generateValidationRule("password", "minLength", ValidationReasons.TOO_SHORT))
        .matches(...generateValidationRule("password", "hasNumber", ValidationReasons.HAVE_NUMBER)),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match."),
    motivation: yup.string()
        .required(ValidationReasons.REQUIRED)
        .min(...generateValidationRule("motivation", "minLength", ValidationReasons.TOO_SHORT))
        .max(...generateValidationRule("motivation", "maxLength", ValidationReasons.TOO_LONG)),
    companyName: yup.string()
        .required(ValidationReasons.REQUIRED)
        .min(...generateValidationRule("companyName", "minLength", ValidationReasons.TOO_SHORT))
        .max(...generateValidationRule("companyName", "maxLength", ValidationReasons.TOO_LONG)),
});

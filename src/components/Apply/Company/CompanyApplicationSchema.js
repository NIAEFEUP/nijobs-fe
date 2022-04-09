/* istanbul ignore file */
import * as yup from "yup";
import { HumanValidationReasons } from "../../../utils";
import { generateValidationRule } from "./CompanyApplicationUtils";


export default yup.object().shape({
    email: yup.string()
        .required(HumanValidationReasons.REQUIRED)
        .email(HumanValidationReasons.EMAIL),
    password: yup.string()
        .required(HumanValidationReasons.REQUIRED)
        .min(...generateValidationRule("password", "minLength", HumanValidationReasons.TOO_SHORT))
        .matches(...generateValidationRule("password", "hasNumber", HumanValidationReasons.HAVE_NUMBER)),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords must match."),
    motivation: yup.string()
        .required(HumanValidationReasons.REQUIRED)
        .min(...generateValidationRule("motivation", "minLength", HumanValidationReasons.TOO_SHORT))
        .max(...generateValidationRule("motivation", "maxLength", HumanValidationReasons.TOO_LONG)),
    companyName: yup.string()
        .required(HumanValidationReasons.REQUIRED)
        .min(...generateValidationRule("companyName", "minLength", HumanValidationReasons.TOO_SHORT))
        .max(...generateValidationRule("companyName", "maxLength", HumanValidationReasons.TOO_LONG)),
});

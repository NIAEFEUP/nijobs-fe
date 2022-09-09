/* istanbul ignore file */

import * as yup from "yup";
import { HumanValidationReasons } from "../../../utils";
import { generateValidationRule } from "./AuthUtils";

export default yup.object().shape({
    password: yup.string()
        .required(HumanValidationReasons.REQUIRED)
        .min(...generateValidationRule("password", "minLength", HumanValidationReasons.TOO_SHORT))
        .matches(...generateValidationRule("password", "hasNumber", HumanValidationReasons.HAVE_NUMBER)),
});

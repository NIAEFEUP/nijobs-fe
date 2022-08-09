/* istanbul ignore file */
import * as yup from "yup";
import { HumanValidationReasons } from "../../utils";


export default yup.object().shape({
    email: yup.string()
        .required(HumanValidationReasons.REQUIRED)
        .email(HumanValidationReasons.EMAIL),
});

/* istanbul ignore file */
import * as yup from "yup";
import { ValidationReasons } from "../../../utils";

export const Rules = Object.freeze({
    REJECT_REASON: {
        minLength: 10,
        maxLength: 1500,
    },
});

export default yup.object().shape({
    rejectReason: yup.string()
        .required(ValidationReasons.REQUIRED)
        .min(Rules.REJECT_REASON.minLength, ValidationReasons.TOO_SHORT(Rules.REJECT_REASON.minLength))
        .max(Rules.REJECT_REASON.maxLength, ValidationReasons.TOO_LONG(Rules.REJECT_REASON.maxLength)),
});

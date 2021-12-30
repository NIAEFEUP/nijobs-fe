/* istanbul ignore file */
import * as yup from "yup";
import { HumanValidationReasons } from "../../../utils";

export const Rules = Object.freeze({
    REJECT_REASON: {
        minLength: 10,
        maxLength: 1500,
    },
});

export default yup.object().shape({
    rejectReason: yup.string()
        .required(HumanValidationReasons.REQUIRED)
        .min(Rules.REJECT_REASON.minLength, HumanValidationReasons.TOO_SHORT(Rules.REJECT_REASON.minLength))
        .max(Rules.REJECT_REASON.maxLength, HumanValidationReasons.TOO_LONG(Rules.REJECT_REASON.maxLength)),
});

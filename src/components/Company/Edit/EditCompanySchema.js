import * as yup from "yup";
import { HumanValidationReasons } from "../../../utils";
import FinishCompanyRegistrationSchema from "../Registration/Finish/FinishCompanyRegistrationSchema";
import { generateValidationRule } from "./EditCompanyUtils";

// export default FinishCompanyRegistrationSchema.concat(yup.object().shape({
//     name: yup.string()
//         .required(HumanValidationReasons.REQUIRED)
//         .min(...generateValidationRule("name", "minLength", HumanValidationReasons.TOO_SHORT))
//         .max(...generateValidationRule("name", "maxLength", HumanValidationReasons.TOO_LONG)),
// }));

export default yup.object().shape({
    name: yup.string()
        .required(HumanValidationReasons.REQUIRED)
        .min(...generateValidationRule("name", "minLength", HumanValidationReasons.TOO_SHORT))
        .max(...generateValidationRule("name", "maxLength", HumanValidationReasons.TOO_LONG)),
});

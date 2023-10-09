import * as yup from "yup";
import { HumanValidationReasons } from "../../../utils";
import { generateValidationRule } from "./EditCompanyUtils";
import { FinishCompanyRegistrationConstants } from "../Registration/Finish/FinishCompanyRegistrationUtils";

const contactSchema = {
    value: yup.string().required("Cannot be empty."),
};

export default yup.object().shape({
    logo: yup.mixed().when("image", {
        is: (value) => value !== undefined,
        then:
            yup.mixed()
                .test("fileSize",
                    HumanValidationReasons.FILE_TOO_BIG(`${FinishCompanyRegistrationConstants.logo.maxSize / 1e6}MB`),
                    (value) => value[0]?.size <= FinishCompanyRegistrationConstants.logo.maxSize)
                .test("fileType",
                    HumanValidationReasons.FILE_TYPE_ALLOWED(FinishCompanyRegistrationConstants.logo.allowedTypes),
                    (value) => !value[0] || FinishCompanyRegistrationConstants.logo.allowedTypes.includes(value[0].type)),
    }),
    name: yup.string()
        .required(HumanValidationReasons.REQUIRED)
        .min(...generateValidationRule("name", "minLength", HumanValidationReasons.TOO_SHORT))
        .max(...generateValidationRule("name", "maxLength", HumanValidationReasons.TOO_LONG)),
    bio: yup.string()
        .required(HumanValidationReasons.REQUIRED)
        .max(...generateValidationRule("bio", "maxLength", HumanValidationReasons.TOO_LONG)),
    contacts: yup.array()
        .of(yup.object().shape(contactSchema)),
});

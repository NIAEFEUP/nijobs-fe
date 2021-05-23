/* istanbul ignore file */
import * as yup from "yup";
import { ValidationReasons } from "../../../../utils";
import { FinishCompanyRegistrationConstants, generateValidationRule } from "./FinishCompanyRegistrationUtils";

const contactSchema = {
    value: yup.string().required("Cannot be empty."),
};

export default yup.object().shape({
    logo: yup.mixed()
        .required(ValidationReasons.REQUIRED)
        .test("fileSize",
            ValidationReasons.FILE_TOO_BIG(`${FinishCompanyRegistrationConstants.logo.maxSize / 1e6}MB`),
            (value) => value[0]?.size <= FinishCompanyRegistrationConstants.logo.maxSize)
        .test("fileType",
            ValidationReasons.FILE_TYPE_ALLOWED(FinishCompanyRegistrationConstants.logo.allowedTypes),
            (value) => !value[0] || FinishCompanyRegistrationConstants.logo.allowedTypes.includes(value[0].type)),
    bio: yup.string()
        .required(ValidationReasons.REQUIRED)
        .max(...generateValidationRule("bio", "maxLength", ValidationReasons.TOO_LONG)),
    contacts: yup.array()
        .of(yup.object().shape(contactSchema)),
});

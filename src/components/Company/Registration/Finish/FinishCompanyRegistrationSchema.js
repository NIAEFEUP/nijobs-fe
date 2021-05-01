/* istanbul ignore file */
import * as yup from "yup";
import { ValidationReasons } from "../../../../utils";
import { generateValidationRule } from "./FinishCompanyRegistrationUtils";

const MAX_FILE_SIZE_BYTES = 10e6;

const MIME_TYPES_ALLOWED = ["image/jpeg", "image/png"];

const contactSchema = {
    value: yup.string().required("Cannot be empty."),
};

export default yup.object().shape({
    logo: yup.mixed()
        .required(ValidationReasons.REQUIRED)
        .test("fileSize",
            ValidationReasons.FILE_TOO_BIG(`${MAX_FILE_SIZE_BYTES / 1e6}MB`),
            (value) => value[0].size <= MAX_FILE_SIZE_BYTES)
        .test("fileType",
            ValidationReasons.FILE_TYPE_ALLOWED(["jpg", "jpeg", "png"]),
            (value) => MIME_TYPES_ALLOWED.includes(value[0].type)),
    bio: yup.string()
        .required(ValidationReasons.REQUIRED)
        .max(...generateValidationRule("bio", "maxLength", ValidationReasons.TOO_LONG)),
    contacts: yup.array()
        .of(yup.object().shape(contactSchema)),
});

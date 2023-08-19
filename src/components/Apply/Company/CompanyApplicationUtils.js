import { validationRulesGenerator, generalHumanError } from "../../../utils";
import { AuthConstants } from "../../Navbar/Auth/AuthUtils";
export const CompanyApplicationConstants = {
    password: AuthConstants.password,
    motivation: {
        minLength: 10,
        maxLength: 1500,
    },
    companyName: {
        minLength: 2,
        maxLength: 50,
    },
};

export const generateValidationRule = validationRulesGenerator(CompanyApplicationConstants);

const HumanReadableErrors = Object.freeze({
    "email-already-exists": "The provided email is already associated to our platform.",
    "company-application-duplicate-email": "There is already an application associated with that email.",
    "company-application-recently-created": "There is an application created less than 10 minutes ago associated with this email.",
});

const ValidationMessages = Object.freeze({
    "success": {
        title: "Your application has been validated successfully!",
        text: "You should receive a confirmation email shortly. If not, please contact us at ",
    },
    "invalid-token": {
        title: "Error! Application does not exist!",
        text: "An error has occurred while validating your application! The application you are trying to validate does not exist.",
    },
    "expired-token": {
        title: "Error! Link has expired!",
        text: "An error has occurred while validating your application. The link that was sent to you has expired." +
            " You will need to create a new application.",
    },
    "application-already-validated": {
        title: "Application is already validated!",
        text: "This application is already validated. ",
    },
});

export const getValidationMessage = (description) => {
    const errorMsg = { title: "Unexpected Error!", text: "An unexpected error has occurred while validating your application. " };
    if (!description) {
        return errorMsg;
    }
    if (typeof ValidationMessages[description] === "object") {
        return ValidationMessages[description];
    }
    return errorMsg;
};

export const getHumanError = (error) => generalHumanError(error, HumanReadableErrors);

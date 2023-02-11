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

const ValidationErrors = Object.freeze({
    "invalid-token": {
        title: "Error! Application does not exist!",
        text: "An error has occured while validating your application! The application you are trying to validate does not exist,",
    },
    "expired-token": {
        title: "Error! Link has expired!",
        text: "An error has occured while validating your application! The link sent to you has expired, \
        you now need to create a new application,",
    },
    "application-already-validated": {
        title: "Application is already validated!",
        text: "This application is already validated",
    },
});

export const getValidationError = (error) => {
    const errorMsg = { title: "Unexpected Error!", text: "An unexpected error has occured while validating your application, " };
    if (!error) {
        return errorMsg;
    }
    if (typeof ValidationErrors[error] === "object") {
        return ValidationErrors[error];
    }
    return errorMsg;
};

export const getHumanError = (error) => generalHumanError(error, HumanReadableErrors);

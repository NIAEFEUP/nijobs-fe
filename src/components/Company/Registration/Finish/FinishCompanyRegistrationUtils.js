import { validationRulesGenerator } from "../../../../utils";

export const FinishCompanyRegistrationConstants = {
    bio: {
        maxLength: 1500,
    },
};

export const generateValidationRule = validationRulesGenerator(FinishCompanyRegistrationConstants);

const HumanReadableErrors = Object.freeze({
    "email-already-exists": "The provided email is already associated to our platform.",
    "company-application-duplicate-email": "There is already an application associated with that email.",
});

export const getHumanError = (error) => HumanReadableErrors[error] || "An error occurred, please try again.";

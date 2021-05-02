import { validationRulesGenerator } from "../../../../utils";

export const FinishCompanyRegistrationConstants = {
    bio: {
        maxLength: 1500,
    },
};

export const generateValidationRule = validationRulesGenerator(FinishCompanyRegistrationConstants);

const HumanReadableErrors = Object.freeze({
    "registration-already-finished": "This company is already registered.",
});

export const getHumanError = (error) => HumanReadableErrors[error] || "An error occurred, please try again.";

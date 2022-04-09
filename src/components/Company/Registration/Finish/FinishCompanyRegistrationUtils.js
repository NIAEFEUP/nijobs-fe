import { validationRulesGenerator, generalHumanError } from "../../../../utils";

export const FinishCompanyRegistrationConstants = {
    bio: {
        maxLength: 1500,
    },
    logo: {
        maxSize: 10e6,
        allowedTypes: ["image/jpeg", "image/png"],
    },
    contacts: {
        min: 1,
        max: 10,
    },
};

export const generateValidationRule = validationRulesGenerator(FinishCompanyRegistrationConstants);

const HumanReadableErrors = Object.freeze({
    "registration-already-finished": "This company is already registered.",
});

export const getHumanError = (error) => generalHumanError(error, HumanReadableErrors);

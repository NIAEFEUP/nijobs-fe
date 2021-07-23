import { validationRulesGenerator } from "../../../utils";


export const CreateOfferConstants = {
    title: {
        maxLength: 90,
    },
    description: {
        maxLength: 1500,
    },
};

export const generateValidationRule = validationRulesGenerator(CreateOfferConstants);

const HumanReadableErrors = Object.freeze({
    // TODO
});

export const getHumanError = (error) => HumanReadableErrors[error] || "An error occurred, please try again.";

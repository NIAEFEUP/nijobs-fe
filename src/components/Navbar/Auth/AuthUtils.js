import { validationRulesGenerator, generalHumanError, HumanValidationReasons, generalParseRequestErrors } from "../../../utils";


export const AuthConstants = {
    password: {
        minLength: 8,
        hasNumber: /\d/,
    },
};

export const generateValidationRule = validationRulesGenerator(AuthConstants);

const HumanReadableErrors = Object.freeze({
    "must-be-a-valid-email": HumanValidationReasons.EMAIL,
    "invalid-token": "The token provided is invalid or has expired.",
});

export const getHumanError = (error) => generalHumanError(error, HumanReadableErrors);

export const parseRequestErrors = (error) => generalParseRequestErrors(error, getHumanError);

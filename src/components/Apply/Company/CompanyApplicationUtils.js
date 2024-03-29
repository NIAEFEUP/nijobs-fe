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
});

export const getHumanError = (error) => generalHumanError(error, HumanReadableErrors);

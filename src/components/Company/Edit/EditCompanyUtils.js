import { validationRulesGenerator, generalHumanError } from "../../../utils";
import { CompanyApplicationConstants } from "../../Apply/Company/CompanyApplicationUtils";

export const EditCompanyConstants = {
    name: { ...CompanyApplicationConstants.companyName },
};

export const generateValidationRule = validationRulesGenerator(EditCompanyConstants);

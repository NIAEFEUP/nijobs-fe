import { validationRulesGenerator } from "../../../utils";
import { CompanyApplicationConstants } from "../../Apply/Company/CompanyApplicationUtils";
import { FinishCompanyRegistrationConstants } from "../Registration/Finish/FinishCompanyRegistrationUtils";

export const EditCompanyConstants = {
    name: { ...CompanyApplicationConstants.companyName },
    ...FinishCompanyRegistrationConstants,
};


export const generateValidationRule = validationRulesGenerator(EditCompanyConstants);

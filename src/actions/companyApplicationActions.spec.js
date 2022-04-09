import {
    CompanyApplicationActionTypes,
    setCompanyApplication,
    setCompanyApplicationSending,
    setCompanyApplicationSubmissionError,
} from "./companyApplicationActions";

describe("Company Application actions", () => {
    it("should return sending application action", () => {

        const expectedActionLoading = {
            type: CompanyApplicationActionTypes.SET_SENDING_COMPANY_APPLICATION,
            sendingApplication: true,
        };
        const expectedActionNotLoading = {
            type: CompanyApplicationActionTypes.SET_SENDING_COMPANY_APPLICATION,
            sendingApplication: false,
        };

        expect(setCompanyApplicationSending(true)).toEqual(expectedActionLoading);
        expect(setCompanyApplicationSending(false)).toEqual(expectedActionNotLoading);
    });

    it("should return Set Company Application action", () => {

        const companyApplication = { field1: 1, field2: 2 };
        const expectedAction = {
            type: CompanyApplicationActionTypes.SET_COMPANY_APPLICATION,
            companyApplication,
        };

        expect(setCompanyApplication(companyApplication)).toEqual(expectedAction);
    });

    it("should return Set Company Application errors action", () => {

        const errors = [{ error: "something" }, { error: "something2" }];
        const expectedAction = {
            type: CompanyApplicationActionTypes.SET_COMPANY_APPLICATION_SUBMISSION_ERROR,
            errors,
        };

        expect(setCompanyApplicationSubmissionError(errors)).toEqual(expectedAction);
    });
});

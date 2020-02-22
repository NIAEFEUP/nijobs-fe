export const CompanyApplicationActionTypes = {
    SET_SENDING_COMPPANY_APPLICATION: "SET_SENDING_COMPPANY_APPLICATION",
    SET_COMPANY_APPLICATION: "SET_COMPANY_APPLICATION",
    SET_COMPANY_APPLICATION_SUBMISSION_ERROR: "SET_COMPANY_APPLICATION_SUBMISSION_ERROR",
};

export const setCompanyApplication = (companyApplication) => ({
    type: CompanyApplicationActionTypes.SET_COMPANY_APPLICATION,
    companyApplication,
});

export const setCompanyApplicationSending = (sendingApplication) => ({
    type: CompanyApplicationActionTypes.SET_SENDING_COMPPANY_APPLICATION,
    sendingApplication,
});

export const setCompanyApplicationSubmissionError = (errors) => ({
    type: CompanyApplicationActionTypes.SET_COMPANY_APPLICATION_SUBMISSION_ERROR,
    errors,
});

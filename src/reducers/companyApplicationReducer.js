import { CompanyApplicationActionTypes } from "../actions/companyApplicationActions";

export const INITIAL_JOB_TYPE = undefined;
export const INITIAL_JOB_DURATION = 1;

const initialState = {
    companyApplication: null,
    sendingApplication: false,
    errors: null,
};

export default (state = initialState, action) => {

    switch (action.type) {
        case CompanyApplicationActionTypes.SET_SENDING_COMPPANY_APPLICATION:
            return {
                ...state,
                sendingApplication: action.sendingApplication,
            };
        case CompanyApplicationActionTypes.SET_COMPANY_APPLICATION:
            return {
                ...state,
                companyApplication: action.companyApplication,
            };
        case CompanyApplicationActionTypes.SET_COMPANY_APPLICATION_SUBMISSION_ERROR:
            return {
                ...state,
                errors: action.errors,
            };
        default:
            return state;
    }
};

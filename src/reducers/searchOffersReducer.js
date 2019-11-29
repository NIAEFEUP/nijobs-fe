import { offerSearchTypes } from "../actions/searchOffersActions";

export const INITIAL_JOB_TYPE = undefined;
export const INITIAL_JOB_DURATION = 1;

const initialState = {
    searchValue: "",
    jobType: INITIAL_JOB_TYPE,
    jobDuration: [null, null],
    offers: [],
    loading: false,
    error: null,
};

export default (state = initialState, action) => {

    switch (action.type) {
        case offerSearchTypes.SET_OFFERS_SEARCH_RESULT:
            return {
                ...state,
                offers: action.offers,
            };
        case offerSearchTypes.SET_OFFERS_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        case offerSearchTypes.SET_SEARCH_OFFERS_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case offerSearchTypes.SET_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.value,
            };
        case offerSearchTypes.SET_JOB_DURATION:
            return {
                ...state,
                jobDuration: action.jobDuration,
            };
        case offerSearchTypes.SET_JOB_TYPE:
            return {
                ...state,
                jobType: action.jobType,
            };
        default:
            return state;
    }
};

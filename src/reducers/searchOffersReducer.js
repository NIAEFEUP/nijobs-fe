import { OfferSearchTypes } from "../actions/searchOffersActions";

export const INITIAL_JOB_TYPE = null;
export const INITIAL_JOB_DURATION = 1;

const initialState = {
    searchValue: "",
    jobType: INITIAL_JOB_TYPE,
    filterJobDuration: false,
    jobDuration: [null, null],
    fields: [],
    techs: [],
    offers: [],
    loading: false,
    error: null,
};

export default (state = initialState, action) => {

    switch (action.type) {
        case OfferSearchTypes.SET_OFFERS_SEARCH_RESULT:
            return {
                ...state,
                offers: action.offers,
            };
        case OfferSearchTypes.SET_OFFERS_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        case OfferSearchTypes.SET_SEARCH_OFFERS_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case OfferSearchTypes.SET_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.value,
            };
        case OfferSearchTypes.SET_JOB_DURATION:
            return {
                ...state,
                jobDuration: action.jobDuration,
            };
        case OfferSearchTypes.SET_JOB_TYPE:
            return {
                ...state,
                jobType: action.jobType,
            };
        case OfferSearchTypes.SET_JOB_FIELDS:
            return {
                ...state,
                fields: action.fields,
            };
        case OfferSearchTypes.SET_JOB_TECHS:
            return {
                ...state,
                techs: action.techs,
            };
        case OfferSearchTypes.SET_JOB_DURATION_TOGGLE:
            return {
                ...state,
                filterJobDuration: action.filterJobDuration,
            };
        default:
            return state;
    }
};

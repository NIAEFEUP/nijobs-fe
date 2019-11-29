import { INITIAL_JOB_TYPE, INITIAL_JOB_DURATION } from "../reducers/searchOffersReducer";

export const offerSearchTypes = Object.freeze({
    SET_SEARCH_VALUE: "SET_SEARCH_VALUE",
    SET_JOB_DURATION: "SET_JOB_DURATION",
    SET_JOB_TYPE: "SET_JOB_TYPE",
    SET_OFFERS_SEARCH_RESULT: "SET_OFFERS_SEARCH_RESULT",
    SET_OFFERS_LOADING: "SET_OFFERS_LOADING",
    SET_SEARCH_OFFERS_ERROR: "SET_SEARCH_OFFERS_ERROR",
});

export const setLoadingOffers = (loading) => ({
    type: offerSearchTypes.SET_OFFERS_LOADING,
    loading,
});

export const setSearchOffers = (offers) => ({
    type: offerSearchTypes.SET_OFFERS_SEARCH_RESULT,
    offers,
});

export const setOffersFetchError = (error) => ({
    type: offerSearchTypes.SET_SEARCH_OFFERS_ERROR,
    error,
});

export const setSearchValue = (value) => ({
    type: offerSearchTypes.SET_SEARCH_VALUE,
    value,
});

export const setJobDuration = (minJobDuration, maxJobDuration) => ({
    type: offerSearchTypes.SET_JOB_DURATION,
    jobDuration: [minJobDuration, maxJobDuration],
});

export const setJobType = (jobType) => ({
    type: offerSearchTypes.SET_JOB_TYPE,
    jobType,
});

export const resetAdvancedSearchFields = () => (dispatch) => {
    dispatch(setJobType(INITIAL_JOB_TYPE));
    dispatch(setJobDuration(INITIAL_JOB_DURATION, INITIAL_JOB_DURATION + 1));
};

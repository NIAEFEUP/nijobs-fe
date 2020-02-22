import { INITIAL_JOB_TYPE, INITIAL_JOB_DURATION } from "../reducers/searchOffersReducer";

export const OfferSearchTypes = Object.freeze({
    SET_SEARCH_VALUE: "SET_SEARCH_VALUE",
    SET_JOB_DURATION: "SET_JOB_DURATION",
    SET_JOB_TYPE: "SET_JOB_TYPE",
    SET_JOB_FIELDS: "SET_JOB_FIELDS",
    SET_JOB_TECHS: "SET_JOB_TECHS",
    SET_OFFERS_SEARCH_RESULT: "SET_OFFERS_SEARCH_RESULT",
    SET_OFFERS_LOADING: "SET_OFFERS_LOADING",
    SET_SEARCH_OFFERS_ERROR: "SET_SEARCH_OFFERS_ERROR",
    SET_JOB_DURATION_TOGGLE: "SET_JOB_DURATION_TOGGLE",
});

export const setLoadingOffers = (loading) => ({
    type: OfferSearchTypes.SET_OFFERS_LOADING,
    loading,
});

export const setSearchOffers = (offers) => ({
    type: OfferSearchTypes.SET_OFFERS_SEARCH_RESULT,
    offers,
});

export const setOffersFetchError = (error) => ({
    type: OfferSearchTypes.SET_SEARCH_OFFERS_ERROR,
    error,
});

export const setSearchValue = (value) => ({
    type: OfferSearchTypes.SET_SEARCH_VALUE,
    value,
});

export const setJobDuration = (minJobDuration, maxJobDuration) => ({
    type: offerSearchTypes.SET_JOB_DURATION,
    jobDuration: [minJobDuration, maxJobDuration],
});

export const setJobType = (jobType) => ({
    type: OfferSearchTypes.SET_JOB_TYPE,
    jobType,
});

export const setFields = (fields) => ({
    type: offerSearchTypes.SET_JOB_FIELDS,
    fields,
});
export const setTechs = (techs) => ({
    type: offerSearchTypes.SET_JOB_TECHS,
    techs,
});

export const setShowJobDurationSlider = (filterJobDuration) => ({
    type: offerSearchTypes.SET_JOB_DURATION_TOGGLE,
    filterJobDuration,
});

export const resetAdvancedSearchFields = () => (dispatch) => {
    dispatch(setJobType(INITIAL_JOB_TYPE));
    dispatch(setShowJobDurationSlider(false));
    dispatch(setJobDuration(INITIAL_JOB_DURATION, INITIAL_JOB_DURATION + 1));
    dispatch(setFields([]));
    dispatch(setTechs([]));
};

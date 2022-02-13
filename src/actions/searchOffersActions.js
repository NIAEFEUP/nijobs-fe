import { INITIAL_JOB_TYPE, INITIAL_JOB_DURATION, INITIAL_ERROR } from "../reducers/searchOffersReducer";

export const OfferSearchTypes = Object.freeze({
    SET_SUBMIT_NUMBER: "SET_SUBMIT_NUMBER",
    SET_SEARCH_VALUE: "SET_SEARCH_VALUE",
    SET_JOB_DURATION: "SET_JOB_DURATION",
    SET_JOB_TYPE: "SET_JOB_TYPE",
    SET_JOB_FIELDS: "SET_JOB_FIELDS",
    SET_JOB_TECHS: "SET_JOB_TECHS",
    SET_OFFERS_SEARCH_RESULT: "SET_OFFERS_SEARCH_RESULT",
    SET_OFFERS_LOADING: "SET_OFFERS_LOADING",
    SET_SEARCH_OFFERS_ERROR: "SET_SEARCH_OFFERS_ERROR",
    SET_JOB_DURATION_TOGGLE: "SET_JOB_DURATION_TOGGLE",
    HIDE_OFFER: "HIDE_OFFER",
    DISABLE_OFFER: "DISABLE_OFFER",
    COMPANY_ENABLE_OFFER: "COMPANY_ENABLE_OFFER",
    ADMIN_ENABLE_OFFER: "ADMIN_ENABLE_OFFER",
});

export const setSubmitNumber = (submitNumber) => ({
    type: OfferSearchTypes.SET_SUBMIT_NUMBER,
    submitNumber,
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

export const resetOffersFetchError = () => ({
    type: OfferSearchTypes.SET_SEARCH_OFFERS_ERROR,
    error: INITIAL_ERROR,
});

export const setSearchValue = (value) => ({
    type: OfferSearchTypes.SET_SEARCH_VALUE,
    value,
});

export const setJobDuration = (jobMinDuration, jobMaxDuration) => ({
    type: OfferSearchTypes.SET_JOB_DURATION,
    jobDuration: [jobMinDuration, jobMaxDuration],
});

export const setJobType = (jobType) => ({
    type: OfferSearchTypes.SET_JOB_TYPE,
    jobType,
});

export const setFields = (fields) => ({
    type: OfferSearchTypes.SET_JOB_FIELDS,
    fields,
});
export const setTechs = (technologies) => ({
    type: OfferSearchTypes.SET_JOB_TECHS,
    technologies,
});

export const setShowJobDurationSlider = (filterJobDuration) => ({
    type: OfferSearchTypes.SET_JOB_DURATION_TOGGLE,
    filterJobDuration,
});

export const hideOffer = (offerIdx) => ({
    type: OfferSearchTypes.HIDE_OFFER,
    offerIdx,
});

export const disableOffer = (offerIdx, adminReason) => ({
    type: OfferSearchTypes.DISABLE_OFFER,
    offerIdx,
    adminReason,
});

export const companyEnableOffer = (offerIdx) => ({
    type: OfferSearchTypes.COMPANY_ENABLE_OFFER,
    offerIdx,
});

export const adminEnableOffer = (offerIdx) => ({
    type: OfferSearchTypes.ADMIN_ENABLE_OFFER,
    offerIdx,
});

export const resetAdvancedSearchFields = () => (dispatch) => {
    dispatch(setJobType(INITIAL_JOB_TYPE));
    dispatch(setShowJobDurationSlider(false));
    dispatch(setJobDuration(INITIAL_JOB_DURATION, INITIAL_JOB_DURATION + 1));
    dispatch(setFields([]));
    dispatch(setTechs([]));
};

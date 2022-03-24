import { OfferSearchTypes } from "../actions/searchOffersActions";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import { OfferConstants } from "../components/Offers/Form/OfferUtils";

export const INITIAL_JOB_TYPE = null;
export const INITIAL_JOB_DURATION = 1;
export const INITIAL_ERROR = null;
export const JOB_MIN_DURATION = 1;
export const JOB_MAX_DURATION = 12;

const initialState = {
    searchValue: "",
    jobType: INITIAL_JOB_TYPE,
    filterJobDuration: false,
    jobDuration: [null, null],
    fields: [],
    technologies: [],
    offers: [],
    loading: false,
    error: INITIAL_ERROR,
};

export default (state = initialState, action) => {

    switch (action.type) {
        case OfferSearchTypes.SET_OFFERS_SEARCH_RESULT:
            return {
                ...state,
                offers: action.offers,
            };
        case OfferSearchTypes.SET_SEARCH_QUERY_TOKEN:
            return {
                ...state,
                queryToken: action.queryToken,
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
                technologies: action.technologies,
            };
        case OfferSearchTypes.SET_JOB_DURATION_TOGGLE:
            return {
                ...state,
                filterJobDuration: action.filterJobDuration,
            };
        case OfferSearchTypes.HIDE_OFFER:
            return {
                ...state,
                offers: state.offers.map((offer, idx) => action.offerIdx === idx ?
                    new Offer({ ...offer, isHidden: true, hiddenReason: OfferConstants.COMPANY_REQUEST })
                    : offer
                ) };
        case OfferSearchTypes.DISABLE_OFFER:
            return {
                ...state,
                offers: state.offers.map((offer, idx) => action.offerIdx === idx ?
                    new Offer({ ...offer, isHidden: true, hiddenReason: OfferConstants.ADMIN_REQUEST, adminReason: action.adminReason })
                    : offer
                ) };
        case OfferSearchTypes.COMPANY_ENABLE_OFFER:
            return {
                ...state,
                offers: state.offers.map((offer, idx) => action.offerIdx === idx ?
                    new Offer({ ...offer, isHidden: false })
                    : offer
                ) };
        case OfferSearchTypes.ADMIN_ENABLE_OFFER:
            return {
                ...state,
                offers: state.offers.map((offer, idx) => action.offerIdx === idx ?
                    new Offer({ ...offer, isHidden: false, hiddenReason: null, adminReason: null })
                    : offer
                ) };
        default:
            return state;
    }
};

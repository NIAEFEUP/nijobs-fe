import { offerTypes } from "../actions/offerActions";

const initialState = {
    offers: [],
    loading: false,
    error: null,
};

export default (state = initialState, action) => {

    switch (action.type) {
        case offerTypes.SET_SEARCH_OFFERS:
            return {
                ...state,
                offers: action.offers,
            };
        case offerTypes.SET_OFFERS_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        case offerTypes.SET_SEARCH_OFFERS_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

import { INITIAL_ERROR } from "../reducers/getOfferReducer";

export const GetOfferTypes = Object.freeze({
    SET_OFFER: "SET_OFFER",
    SET_OFFER_LOADING: "SET_OFFER_LOADING",
    SET_GET_OFFER_ERROR: "SET_GET_OFFER_ERROR",
});

export const setLoadingOffer = (loading) => ({
    type: GetOfferTypes.SET_OFFER_LOADING,
    loading,
});

export const setOffer = (offer) => ({
    type: GetOfferTypes.SET_OFFER,
    offer,
});

export const setOfferFetchError = (error) => ({
    type: GetOfferTypes.SET_GET_OFFER_ERROR,
    error,
});

export const resetOfferFetchError = () => ({
    type: GetOfferTypes.SET_GET_OFFER_ERROR,
    error: INITIAL_ERROR,
});

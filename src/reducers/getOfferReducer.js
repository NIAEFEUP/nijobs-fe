import React from "react";
import { GetOfferTypes } from "../actions/getOfferActions";

export const INITIAL_ERROR = null;

const initialState = {
    offer: null,
    loading: false,
    error: INITIAL_ERROR,
};

export const GetOfferContext = React.createContext();

export default (state = initialState, action) => {

    switch (action.type) {
        case GetOfferTypes.SET_OFFER:
            return {
                ...state,
                offer: action.offer,
            };
        case GetOfferTypes.SET_OFFER_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        case GetOfferTypes.SET_GET_OFFER_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

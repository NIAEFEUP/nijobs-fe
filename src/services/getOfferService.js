import { setLoadingOffer, setOffer, setOfferFetchError, resetOfferFetchError } from "../actions/getOfferActions";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";

import config from "../config";
const { API_HOSTNAME } = config;

export const getOffer = (id) => async (dispatch) => {

    dispatch(resetOfferFetchError());
    dispatch(setLoadingOffer(true));

    try {
        const res = await fetch(`${API_HOSTNAME}/offers?${id}`, {
            method: "GET",
        });
        if (!res.ok) {
            dispatch(setOfferFetchError({
                cause: "BAD_RESPONSE",
                error: res.status,
            }));
            dispatch(setLoadingOffer(false));
            // TODO count metrics
            return;
        }
        const offerData = await res.json();
        dispatch(setOffer(new Offer(offerData)));

        dispatch(setLoadingOffer(false));
        // TODO count metrics

    } catch (error) {
        dispatch(setOfferFetchError({
            cause: "NETWORK_FAILURE",
            error,
        }));
        dispatch(setLoadingOffer(false));
        // TODO count metrics
    }

};

import { setLoadingOffers, setSearchOffers, setOffersFetchError, resetOffersFetchError } from "../actions/searchOffersActions";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import config from "../config";
import { parseFiltersToURL, buildCancelableRequest } from "../utils";
import { createEvent, recordTime, EVENT_TYPES, TIMED_ACTIONS } from "../utils/AnalyticsUtils";

const { API_HOSTNAME } = config;


export const searchOffers = (filters) => buildCancelableRequest(async (dispatch, { signal }) => {
    const t0 = performance.now();

    dispatch(resetOffersFetchError());
    dispatch(setLoadingOffers(true));

    try {
        const res = await fetch(`${API_HOSTNAME}/offers?${parseFiltersToURL(filters)}`, {
            method: "GET",
            credentials: "include",
            signal,
        });
        if (!res.ok) {
            dispatch(setOffersFetchError({
                cause: "BAD_RESPONSE",
                error: res.status,
            }));
            dispatch(setLoadingOffers(false));

            createEvent(EVENT_TYPES.ERROR(
                "Offer Search",
                "BAD_RESPONSE",
                res.status
            ));
            return;
        }
        const offers = await res.json();
        dispatch(setSearchOffers(offers.map((offerData) => new Offer(offerData))));
        dispatch(setLoadingOffers(false));

        recordTime(TIMED_ACTIONS.OFFER_SEARCH, t0, performance.now());

    } catch (error) {
        dispatch(setOffersFetchError({
            cause: "NETWORK_FAILURE",
            error,
        }));
        dispatch(setLoadingOffers(false));

        createEvent(EVENT_TYPES.ERROR(
            "Offer Search",
            "NETWORK_FAILURE"
        ));
    }
});

export const hideOffer = async (offerId) => {

    try {
        const res = await fetch(`${API_HOSTNAME}/offers/${offerId}/hide`, {
            method: "POST",
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {
            throw json.errors;
        }
        // TODO count metrics
        return json;

    } catch (error) {
        // TODO count metrics
        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
};

export const disableOffer = async (offerId, adminReason) => {

    try {
        const res = await fetch(`${API_HOSTNAME}/offers/${offerId}/disable`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ adminReason }),
        });
        const json = await res.json();

        if (!res.ok) {
            throw json.errors;
        }
        // TODO count metrics
        return json;

    } catch (error) {
        // TODO count metrics
        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
};

export const enableOffer = async (offerId) => {

    try {
        const res = await fetch(`${API_HOSTNAME}/offers/${offerId}/enable`, {
            method: "PUT",
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {
            throw json.errors;
        }
        // TODO count metrics
        return json;

    } catch (error) {
        // TODO count metrics
        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
};

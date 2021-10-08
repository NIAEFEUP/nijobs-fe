import { setLoadingOffers, setSearchOffers, setOffersFetchError, resetOffersFetchError } from "../actions/searchOffersActions";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import config from "../config";
import { parseFiltersToURL, buildCancelableRequest } from "../utils";
import { createEvent, recordTime, EVENT_TYPES, TIMED_ACTIONS, measureTime } from "../utils/AnalyticsUtils";
const { API_HOSTNAME } = config;

const OFFER_SEARCH = "Offer Search";
const HIDE_OFFER = "Hide Offer";
const DISABLE_OFFER = "Disable Offer";
const ENABLE_OFFER = "Enable Offer";


export const searchOffers = (filters) => buildCancelableRequest(async (dispatch, { signal }) => {
    const t0 = performance.now();

    dispatch(resetOffersFetchError());
    dispatch(setLoadingOffers(true));

    try {
        const query = parseFiltersToURL(filters);
        const res = await fetch(`${API_HOSTNAME}/offers?${query}`, {
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
                OFFER_SEARCH,
                "BAD_RESPONSE",
                res.status
            ));
            return;
        }
        const offers = await res.json();
        dispatch(setSearchOffers(offers.map((offerData) => new Offer(offerData))));
        dispatch(setLoadingOffers(false));

        createEvent(EVENT_TYPES.SUCCESS(OFFER_SEARCH, query));
        recordTime(TIMED_ACTIONS.OFFER_SEARCH, t0, performance.now());

    } catch (error) {
        dispatch(setOffersFetchError({
            cause: "NETWORK_FAILURE",
            error,
        }));
        dispatch(setLoadingOffers(false));

        createEvent(EVENT_TYPES.ERROR(
            OFFER_SEARCH,
            "NETWORK_FAILURE"
        ));
    }
});

export const hideOffer = measureTime(TIMED_ACTIONS.OFFER_HIDE, async (offerId) => {
    try {
        const res = await fetch(`${API_HOSTNAME}/offers/${offerId}/hide`, {
            method: "POST",
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {

            createEvent(EVENT_TYPES.ERROR(
                HIDE_OFFER,
                "BAD_RESPONSE",
                res.status
            ));

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(HIDE_OFFER));
        return json;

    } catch (error) {

        createEvent(EVENT_TYPES.ERROR(
            HIDE_OFFER,
            "UNEXPECTED"
        ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
});

export const disableOffer = measureTime(TIMED_ACTIONS.OFFER_DISABLE, async (offerId, adminReason) => {

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

            createEvent(EVENT_TYPES.ERROR(
                DISABLE_OFFER,
                "BAD_RESPONSE",
                res.status
            ));

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(DISABLE_OFFER));
        return json;

    } catch (error) {

        createEvent(EVENT_TYPES.ERROR(
            DISABLE_OFFER,
            "UNEXPECTED"
        ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
});

export const enableOffer = measureTime(TIMED_ACTIONS.OFFER_ENABLE, async (offerId) => {

    try {
        const res = await fetch(`${API_HOSTNAME}/offers/${offerId}/enable`, {
            method: "PUT",
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {

            createEvent(EVENT_TYPES.ERROR(
                ENABLE_OFFER,
                "BAD_RESPONSE",
                res.status
            ));

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(ENABLE_OFFER));
        return json;

    } catch (error) {

        createEvent(EVENT_TYPES.ERROR(
            ENABLE_OFFER,
            "UNEXPECTED"
        ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
});

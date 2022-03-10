import { setLoadingOffers, setSearchOffers, setOffersFetchError, resetOffersFetchError } from "../actions/searchOffersActions";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import config from "../config";
import { parseFiltersToURL, buildCancelableRequest } from "../utils";
import { createEvent, measureTime, sendSearchReport } from "../utils/analytics";
import { EVENT_TYPES, TIMED_ACTIONS } from "../utils/analytics/constants";
import ErrorTypes from "../utils/ErrorTypes";
const { API_HOSTNAME } = config;

const OFFER_SEARCH_METRIC_ID = "offer/search";
const OFFER_NEW_METRIC_ID = "offer/new";
const OFFER_EDIT_METRIC_ID = "offer/edit";
const OFFER_HIDE_METRIC_ID = "offer/hide";
const OFFER_DISABLE_METRIC_ID = "offer/disable";
const OFFER_ENABLE_METRIC_ID = "offer/enable";


export const searchOffers = (filters) => buildCancelableRequest(
    measureTime(TIMED_ACTIONS.OFFER_SEARCH, async (dispatch, { signal }) => {
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
                    cause: ErrorTypes.BAD_RESPONSE,
                    error: res.status,
                }));
                dispatch(setLoadingOffers(false));

                createEvent(EVENT_TYPES.ERROR(
                    OFFER_SEARCH_METRIC_ID,
                    ErrorTypes.BAD_RESPONSE,
                    res.status
                ));
                return;
            }
            const offers = await res.json();
            dispatch(setSearchOffers(offers.map((offerData) => new Offer(offerData))));
            dispatch(setLoadingOffers(false));

            sendSearchReport(filters, `/offers?${query}`);
            createEvent(EVENT_TYPES.SUCCESS(OFFER_SEARCH_METRIC_ID, query));

        } catch (error) {
            dispatch(setOffersFetchError({
                cause: ErrorTypes.NETWORK_FAILURE,
                error,
            }));
            dispatch(setLoadingOffers(false));

            createEvent(EVENT_TYPES.ERROR(
                OFFER_SEARCH_METRIC_ID,
                ErrorTypes.NETWORK_FAILURE
            ));
        }
    })
);

export const hideOffer = measureTime(TIMED_ACTIONS.OFFER_HIDE, async (offerId) => {
    let isErrorRegistered = false;
    try {
        const res = await fetch(`${API_HOSTNAME}/offers/${offerId}/hide`, {
            method: "POST",
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {

            createEvent(EVENT_TYPES.ERROR(
                OFFER_HIDE_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                res.status
            ));
            isErrorRegistered = true;

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(OFFER_HIDE_METRIC_ID));
        return json;

    } catch (error) {

        if (!isErrorRegistered) createEvent(EVENT_TYPES.ERROR(
            OFFER_HIDE_METRIC_ID,
            ErrorTypes.NETWORK_FAILURE
        ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
});

export const disableOffer = measureTime(TIMED_ACTIONS.OFFER_DISABLE, async (offerId, adminReason) => {

    let isErrorRegistered = false;
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
                OFFER_DISABLE_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                res.status
            ));
            isErrorRegistered = true;

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(OFFER_DISABLE_METRIC_ID));
        return json;

    } catch (error) {

        if (!isErrorRegistered) createEvent(EVENT_TYPES.ERROR(
            OFFER_DISABLE_METRIC_ID,
            ErrorTypes.NETWORK_FAILURE
        ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
});

export const enableOffer = measureTime(TIMED_ACTIONS.OFFER_ENABLE, async (offerId) => {

    let isErrorRegistered = false;
    try {
        const res = await fetch(`${API_HOSTNAME}/offers/${offerId}/enable`, {
            method: "PUT",
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {

            createEvent(EVENT_TYPES.ERROR(
                OFFER_ENABLE_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                res.status
            ));
            isErrorRegistered = true;

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(OFFER_ENABLE_METRIC_ID));
        return json;

    } catch (error) {

        if (!isErrorRegistered) createEvent(EVENT_TYPES.ERROR(
            OFFER_ENABLE_METRIC_ID,
            ErrorTypes.NETWORK_FAILURE
        ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
});

export const newOffer = measureTime(TIMED_ACTIONS.OFFER_CREATE, async ({
    title,
    publishDate,
    publishEndDate,
    jobMinDuration,
    jobMaxDuration,
    jobStartDate,
    description,
    contacts,
    isPaid,
    vacancies,
    jobType,
    fields,
    technologies,
    isHidden,
    owner,
    location,
    coordinates,
    requirements,
}) => {

    const data = {
        title,
        publishDate,
        publishEndDate,
        jobMinDuration,
        jobMaxDuration,
        jobStartDate,
        description,
        contacts,
        isPaid,
        vacancies,
        jobType,
        fields,
        technologies,
        isHidden,
        owner,
        location,
        coordinates,
        requirements,
    };

    try {
        const res = await fetch(`${API_HOSTNAME}/offers/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        const json = await res.json();

        if (!res.ok) {
            createEvent(EVENT_TYPES.ERROR(
                OFFER_NEW_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                res.status
            ));

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(OFFER_NEW_METRIC_ID));
        return json;

    } catch (error) {
        createEvent(EVENT_TYPES.ERROR(
            OFFER_NEW_METRIC_ID,
            ErrorTypes.NETWORK_FAILURE
        ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
});

export const editOffer = measureTime(TIMED_ACTIONS.OFFER_EDIT, async ({
    offerId,
    title,
    publishDate,
    publishEndDate,
    jobMinDuration,
    jobMaxDuration,
    jobStartDate,
    description,
    contacts,
    isPaid,
    vacancies,
    jobType,
    fields,
    technologies,
    location,
    coordinates,
    requirements,
}) => {
    const data = {
        title,
        publishDate,
        publishEndDate,
        jobMinDuration,
        jobMaxDuration,
        jobStartDate,
        description,
        contacts,
        isPaid,
        vacancies,
        jobType,
        fields,
        technologies,
        location,
        coordinates,
        requirements,
    };

    let isErrorRegistered = false;

    try {
        const res = await fetch(`${API_HOSTNAME}/offers/edit/${offerId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
        const json = await res.json();

        if (!res.ok) {
            createEvent(EVENT_TYPES.ERROR(
                OFFER_NEW_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                res.status
            ));

            isErrorRegistered = true;

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(OFFER_EDIT_METRIC_ID));
        return json;

    } catch (error) {
        if (!isErrorRegistered)  createEvent(EVENT_TYPES.ERROR(
            OFFER_EDIT_METRIC_ID,
            ErrorTypes.NETWORK_FAILURE
        ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
});

import ReactGA from "react-ga4";
import { EVENT_TYPES, TIMED_ACTIONS, DIMENSION_IDS, QUERY_VALUE_PARAMETER } from "./constants";

/**
 * Removed the given cookie from the user's browser
 */
export const removeCookie = (cookie) => {
    document.cookie = `${cookie}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
};

/**
 * Initializes Google Analytics.
 */
export const initAnalytics = () => {
    ReactGA.initialize(process.env.ANALYTICS_ID, {
        gaOptions: {
            siteSpeedSampleRate: 100,
        },
    });
};

/**
 * Clears cookies relative to analytics
 */
export const clearAnalytics = () => {
    removeCookie("_ga");
    removeCookie("_gat");
    removeCookie("_gid");
};

/**
 * Measures the time taken by func and sends it to Google Analytics.
 *
 * @param func Function whose time will be measured. Func shouldn't return if there's an error, it must throw it.
 * @param action Type of action being measured, from {@link TIMED_ACTIONS}.
 * @param label Optional label to describe the action.
 * @param args The func's arguments.
 */
export const measureTime = (action = TIMED_ACTIONS.UNKNOWN, func, label) => async (...args) => {
    const t0 = performance.now();
    const result = await func(...args);
    const t1 = performance.now();

    recordTime(action, t0, t1, label);
    return result;
};

/**
 * Sends the time passed as an argument to Google Analytics.
 *
 * @param action Type of action being measured, from {@link TIMED_ACTIONS}.
 * @param t0 Timestamp before the action.
 * @param t1 Timestamp after the action.
 * @param label Optional label to describe the action.
 */
export const recordTime = (action = TIMED_ACTIONS.UNKNOWN, t0, t1, label) => {
    ReactGA.send({
        hitType: "timing",
        timingCategory: action.category,
        timingVar: action.variable,
        timingLabel: label,
        timingValue: t1 - t0,
    });
};

/**
 * Sends an event to Google Analytics
 *
 * @param event Type of event, from {@link EVENT_TYPES}.
 */
export const createEvent = (event = EVENT_TYPES.OTHER) => {
    ReactGA.event(event);
};

/**
 * Constructs an error event and sends it to Google Analytics
 *
 * @param {*} metricId Identifier of the metric where the error occurred
 * @param {*} type Type of error
 * @param {*} errors Array of error objects with a 'msg' property defined
 * @param {*} status HTTP status
 */
export const createErrorEvent = (metricId, type, errors, status = 500) => {
    const label = errors.reduce(
        (acc, err) => err.param ? `${acc} ${err.param}-${err.msg};` : `${acc} ${err.msg};`,
        `${type}:`
    );

    createEvent(EVENT_TYPES.ERROR(metricId, label, status));
};

/**
 * Sends a search report to Google Analytics.
 * Filters are recorded using custom dimensions, except for value which is the main parameter.
 *
 * @param {*} filters Object with the search filters
 * @param {*} queryUrl URL to be used for the pageview
 */
export const sendSearchReport = (filters, queryUrl) => {
    const searchDimensions = parseFiltersToDimensions(filters);
    const parsedUrl = parseSearchUrl(queryUrl);

    ReactGA.set(searchDimensions);
    ReactGA.send({ hitType: "pageview", page: parsedUrl });
};

/**
 * Parses search filters to GA dimensions. Joins arrays by commas
 *
 * @param {*} filters Original search filters
 * @returns Parsed search filters
 */
export const parseFiltersToDimensions = (filters) => {
    const searchDimensions = {};

    Object.keys(filters)
        .filter((key) => Array.isArray(filters[key]) ? filters[key].length : !!filters[key] // Remove falsy values
            && DIMENSION_IDS[key]) // Check if filter should be recorded
        .forEach((key) => {
            searchDimensions[DIMENSION_IDS[key]] = Array.isArray(filters[key]) ?
                filters[key].join()
                :
                filters[key];
        });

    return searchDimensions;
};

/**
 * Parses search URL to register searches without value
 */
export const parseSearchUrl = (queryUrl) => {
    if (queryUrl.includes(QUERY_VALUE_PARAMETER)) return queryUrl;

    let parsedUrl = queryUrl;
    if (queryUrl.includes("?")) {
        if (queryUrl.slice(-1) !== "?") parsedUrl += "&";
    } else {
        parsedUrl += "?";
    }

    parsedUrl += `${QUERY_VALUE_PARAMETER}[EMPTY]`;
    return parsedUrl;
};

/**
 * Records a visit to an offer's page
 *
 * @param {*} companyName Name of the company who owns the offer
 * @param {*} offerTitle Title of the offer
 * @param {*} offerId ID of the offer
 */
export const recordOfferVisit = (offerId, offerTitle, companyName) => {
    if (!offerId) return; // Invalid offer, do not set dimensions

    ReactGA.set({
        [DIMENSION_IDS.companyName]: companyName,
        [DIMENSION_IDS.offerTitle]: offerTitle,
    });

    ReactGA.event({
        action: "Offer/visit",
        category: "Success",
        label: `${offerId}`,
    });
};

export const recordOfferImpression = (offerId, offerTitle, companyName) => {
    if (!offerId) return;

    ReactGA.set({
        [DIMENSION_IDS.companyName]: companyName,
        [DIMENSION_IDS.offerTitle]: offerTitle,
    });

    ReactGA.event({
        action: "Offer/impression",
        category: "Success",
        label: `${offerId}`,
    });
};

/**
 * Records a click to an offer's Apply URL button
 * @param {*} offerId ID of the offer
 * @param {*} offerTitle Title of the offer
 * @param {*} companyName Name of the company who owns the offer
 * @returns
 */
export const recordApplyURLVisit = (offerId, offerTitle, companyName) => {
    if (!offerId) return;

    ReactGA.set({
        [DIMENSION_IDS.companyName]: companyName,
        [DIMENSION_IDS.offerTitle]: offerTitle,
    });

    ReactGA.event({
        action: "Offer/applyURL",
        category: "Success",
        label: `${offerId}`,
    });
};

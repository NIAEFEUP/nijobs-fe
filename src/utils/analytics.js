import ReactGa from "react-ga";

/**
 * Initializes Google Analytics.
 */
export const initAnalytics = () => {
    ReactGa.initialize(process.env.ANALYTICS_ID, {
        gaOptions: {
            siteSpeedSampleRate: 100,
        },
    });
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
    ReactGa.timing({
        ...action,
        value: t1 - t0,
        label,
    });
};

/** Creates a new event.
 *
 * @param event Type of event, from {@link EVENT_TYPES}.
 */
export const createEvent = (event = EVENT_TYPES.OTHER) => {
    ReactGa.event(event);
};

export const EVENT_TYPES = Object.freeze({
    ERROR: (action, type, status = 500) => ({
        category: "error",
        action: `error-${action}`,
        label: `ERROR: ${type}`,
        value: status,
    }),
    SUCCESS: (action, label) => ({
        category: "success",
        action,
        label,
    }),
    OTHER: {
        category: "other",
        action: "another-event-type",
    },
});

export const TIMED_ACTIONS = Object.freeze({
    OFFER_CREATE: {
        category: "offer",
        variable: "offer/create",
    },
    OFFER_SEARCH: {
        category: "offer",
        variable: "offer/search",
    },
    OFFER_HIDE: {
        category: "offer",
        variable: "offer/hide",
    },
    OFFER_DISABLE: {
        category: "offer",
        variable: "offer/disable",
    },
    OFFER_ENABLE: {
        category: "offer",
        variable: "offer/enable",
    },
    COMPLETE_REGISTRATION: {
        category: "registration",
        variable: "registration/complete",
    },
    APPLICATION_SEARCH: {
        category: "application",
        variable: "application/search",
    },
    APPLICATION_APPROVE: {
        category: "application",
        variable: "application/approve",
    },
    APPLICATION_REJECT: {
        category: "application",
        variable: "application/reject",
    },
    APPLICATION_SUBMIT: {
        category: "application",
        variable: "application/submit",
    },
    COMPANY_OFFERS_FETCH: {
        category: "company_offers",
        variable: "company_offers/fetch",
    },
    OTHER: {
        category: "other",
        variable: "other",
    },
    UNKNOWN: {
        category: "unknown",
        variable: "unknown",
    },
});

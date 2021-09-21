import ReactGa from "react-ga";

/**
 * Initializes Google Analytics.
 */
export const initAnalytics = () => {
    ReactGa.initialize(process.env.ANALYTICS_ID, {
        debug: true, // enables useful info on console
        gaOptions: {
            siteSpeedSampleRate: 100,
        },
    });
    ReactGa.pageview(window.location.pathname + window.location.search);
};

/**
 * Measures the time taken by func and sends it to Google Analytics.
 *
 * @param func Function whose time will be measured.
 * @param action Type of action being measured, from {@link TIMED_ACTIONS}.
 * @param label Optional label to describe the action.
 * @param args The func's arguments.
 */
export const measureTime = (action = TIMED_ACTIONS.UNKNOWN, func, label) => (...args) => {
    const t0 = performance.now();
    func(...args);
    const t1 = performance.now();

    ReactGa.timing({
        ...action,
        value: t1 - t0,
        label,
    });
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
        category: "Error",
        action: `${action} Error`,
        label: `ERROR: ${type}`,
        value: status,
    }),
    OTHER: {
        category: "Other",
        action: "Another type of event",
    },
});

export const TIMED_ACTIONS = Object.freeze({
    OFFER_CREATE: {
        category: "Offer",
        variable: "Offer Create",
    },
    OFFER_SEARCH: {
        category: "Offer",
        variable: "Offer Search",
    },
    OTHER: {
        category: "Other",
        variable: "Other",
    },
    UNKNOWN: {
        category: "Unknown",
        variable: "Unknown",
    },
});

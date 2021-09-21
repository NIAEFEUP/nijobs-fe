import ReactGa from "react-ga";

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
 * Records the time taken by func and sends it to Google Analytics.
 *
 * @param func Function whose time will be measured.
 * @param action Type of action being measured, from {@link TIMED_ACTIONS}.
 * @param label Optional label to describe the action.
 */
export const measureTime = (func, action = TIMED_ACTIONS.UNKNOWN, label) => (...args) => {
    const t0 = performance.now();
    func(...args);
    const t1 = performance.now();

    ReactGa.timing({
        ...action,
        value: t1 - t0,
        label,
    });
};

export const TIMED_ACTIONS = Object.freeze({
    OFFER_CREATE: {
        category: "Offer",
        variable: "Create",
    },
    OFFER_SEARCH: {
        category: "Offer",
        variable: "Search",
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

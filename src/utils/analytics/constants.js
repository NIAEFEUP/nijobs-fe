export const QUERY_VALUE_PARAMETER = "value=";

export const EVENT_TYPES = Object.freeze({
    ERROR: (action, label, status) => ({
        category: "error",
        action: `error-${action}`,
        label,
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
    RELESES_FETCH: {
        category: "changelog",
        variable: "changelog/fetch",
    },
    PASSWORD_RECOVERY_REQUEST: {
        category: "password_recovery",
        variable: "password_recovery/request",
    },
    FINISH_PASSWORD_RECOVERY_REQUEST: {
        category: "password_recovery",
        variable: "password_recovery/finish",
    },
    VERIFY_PASSWORD_RECOVERY_TOKEN: {
        category: "password_recovery",
        variable: "password_recovery/token",
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

/**
 * Object mapping search filters to GA dimensions' indexes
 */
export const DIMENSION_IDS = Object.freeze({
    jobType: "dimension1",
    jobMinDuration: "dimension2",
    jobMaxDuration: "dimension3",
    fields: "dimension4",
    technologies: "dimension5",
    offerTitle: "dimension6",
    companyName: "dimension7",
});

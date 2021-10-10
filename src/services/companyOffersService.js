import config from "../config";
import { parseFiltersToURL } from "../utils";
import { createEvent, EVENT_TYPES, TIMED_ACTIONS, measureTime } from "../utils/analytics";
import ErrorTypes from "../utils/ErrorTypes";
const { API_HOSTNAME } = config;

const COMPANY_OFFERS_FETCH_METRIC_ID = "company_offers/fetch";

export const fetchCompanyOffers = measureTime(TIMED_ACTIONS.COMPANY_OFFERS_FETCH, async (companyID, filters) => {
    let isErrorRegistered = false;
    try {
        const res = await fetch(`${API_HOSTNAME}/offers/company/${companyID}${filters ? `?${parseFiltersToURL(filters)}` : ""}`, {
            method: "GET",
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {

            createEvent(EVENT_TYPES.ERROR(
                COMPANY_OFFERS_FETCH_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                res.status
            ));
            isErrorRegistered = true;

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(COMPANY_OFFERS_FETCH_METRIC_ID));
        return json;
    } catch (error) {

        if (!isErrorRegistered) createEvent(EVENT_TYPES.ERROR(
            COMPANY_OFFERS_FETCH_METRIC_ID,
            ErrorTypes.NETWORK_FAILURE
        ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error" }];
    }
});

import config from "../config";
import { parseFiltersToURL } from "../utils";
import { createEvent, EVENT_TYPES, TIMED_ACTIONS, measureTime } from "../utils/AnalyticsUtils";
const { API_HOSTNAME } = config;

const FETCH_COMPANY_OFFERS = "Fetch Company Offers";

export const fetchCompanyOffers = measureTime(TIMED_ACTIONS.COMPANY_OFFERS_FETCH, async (companyID, filters) => {
    try {
        const res = await fetch(`${API_HOSTNAME}/offers/company/${companyID}${filters ? `?${parseFiltersToURL(filters)}` : ""}`, {
            method: "GET",
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {

            createEvent(EVENT_TYPES.ERROR(
                FETCH_COMPANY_OFFERS,
                "BAD_RESPONSE",
                res.status
            ));

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(FETCH_COMPANY_OFFERS));
        return json;
    } catch (error) {

        createEvent(EVENT_TYPES.ERROR(
            FETCH_COMPANY_OFFERS,
            "UNEXPECTED"
        ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error" }];
    }
});

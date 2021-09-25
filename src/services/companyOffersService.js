import config from "../config";
import { parseFiltersToURL } from "../utils";
import { createEvent, EVENT_TYPES, TIMED_ACTIONS, measureTime } from "../utils/AnalyticsUtils";
const { API_HOSTNAME } = config;

export const fetchCompanyOffers = measureTime(TIMED_ACTIONS.COMPANY_OFFERS_FETCH, async (companyID, filters) => {
    try {
        const res = await fetch(`${API_HOSTNAME}/offers/company/${companyID}${filters ? `?${parseFiltersToURL(filters)}` : ""}`, {
            method: "GET",
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {

            createEvent(EVENT_TYPES.ERROR(
                "Fetch Company Offers",
                "BAD_RESPONSE",
                res.status
            ));

            throw json.errors;
        }
        return json;
    } catch (error) {

        createEvent(EVENT_TYPES.ERROR(
                "Fetch Company Offers",
                "UNEXPECTED"
            ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error" }];
    }
});

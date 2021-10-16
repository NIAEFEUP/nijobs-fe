import config from "../config";
import { createEvent, EVENT_TYPES, TIMED_ACTIONS, measureTime } from "../utils/analytics";
import ErrorTypes from "../utils/ErrorTypes";
import { buildCancelableRequest, parseFiltersToURL } from "../utils";

const { API_HOSTNAME } = config;

const COMPANY_OFFERS_FETCH_METRIC_ID = "company_offers/fetch";

export const fetchCompanyOffers = measureTime(TIMED_ACTIONS.COMPANY_OFFERS_FETCH,
    buildCancelableRequest(async (companyID, filters, { signal } = {}) => {
        let isErrorRegistered = false;
        try {
            const res = await fetch(`${API_HOSTNAME}/offers/company/${companyID}${filters ? `?${parseFiltersToURL(filters)}` : ""}`, {
                method: "GET",
                credentials: "include",
                signal,
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
    }));

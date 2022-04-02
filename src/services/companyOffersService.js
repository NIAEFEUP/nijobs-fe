import config from "../config";
import { createEvent, measureTime, createErrorEvent } from "../utils/analytics";
import { EVENT_TYPES, TIMED_ACTIONS } from "../utils/analytics/constants";
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

                createErrorEvent(
                    COMPANY_OFFERS_FETCH_METRIC_ID,
                    ErrorTypes.BAD_RESPONSE,
                    json.errors,
                    res.status
                );
                isErrorRegistered = true;

                throw json.errors;
            }

            createEvent(EVENT_TYPES.SUCCESS(COMPANY_OFFERS_FETCH_METRIC_ID));
            return json;
        } catch (error) {

            const errorArray = Array.isArray(error) ? error :
                [{ msg: "Unexpected Error. Please try again later." }];

            if (!isErrorRegistered) createErrorEvent(
                COMPANY_OFFERS_FETCH_METRIC_ID,
                ErrorTypes.NETWORK_FAILURE,
                errorArray,
            );

            throw errorArray;
        }
    }));

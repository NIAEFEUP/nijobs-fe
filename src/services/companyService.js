import {buildCancelableRequest} from "../utils";
import {createErrorEvent, createEvent, measureTime} from "../utils/analytics";
import {EVENT_TYPES, TIMED_ACTIONS} from "../utils/analytics/constants";
import ErrorTypes from "../utils/ErrorTypes";
import Constants from "../utils/Constants";
import config from "../config";

const COMPANY_APPLICATION_FETCH_METRIC_ID = "company_application/fetch";
const { API_HOSTNAME } = config;

export const fetchCompanyApplicationState = buildCancelableRequest(measureTime(TIMED_ACTIONS.COMPANY_APPLICATION_FETCH, async (companyId) => {

    let isErrorRegistered = false;
    try {
        const res = await fetch(`${API_HOSTNAME}/company/${companyId}/state`, {
            method: "GET",
            credentials: "include",
        });
        const json = await res.json();
        console.log(json);

        if (!res.ok) {

            createErrorEvent(
                COMPANY_APPLICATION_FETCH_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                json.errors,
                res.status
            );
            isErrorRegistered = true;

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(COMPANY_APPLICATION_FETCH_METRIC_ID));
        return json;

    } catch (error) {
        const errorArray = Array.isArray(error) ? error :
            [{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }];

        if (!isErrorRegistered) {
            createErrorEvent(
                COMPANY_APPLICATION_FETCH_METRIC_ID,
                ErrorTypes.NETWORK_FAILURE,
                errorArray,
            );
        }

        throw errorArray;
    }
}));
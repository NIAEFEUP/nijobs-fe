import Constants from "../utils/Constants";
import { buildCancelableRequest } from "../utils";
import { createErrorEvent, createEvent, measureTime } from "../utils/analytics";
import { EVENT_TYPES, TIMED_ACTIONS } from "../utils/analytics/constants";
import ErrorTypes from "../utils/ErrorTypes";

const RELEASES_FETCH_METRIC_ID = "changelog/fetch";

export const fetchReleases = measureTime(
    TIMED_ACTIONS.RELESES_FETCH,
    buildCancelableRequest(async ({ signal } = {}) => {
        let isErrorRegistered = false;
        try {
            const res = await fetch(
                "https://api.github.com/repos/NIAEFEUP/nijobs-fe/releases",
                {
                    method: "GET",
                    signal,
                }
            );
            const json = await res.json();

            if (!res.ok) {
                createErrorEvent(
                    RELEASES_FETCH_METRIC_ID,
                    ErrorTypes.BAD_RESPONSE,
                    json.errors,
                    res.status
                );
                isErrorRegistered = true;

                throw json.errors;
            }

            createEvent(EVENT_TYPES.SUCCESS(RELEASES_FETCH_METRIC_ID));
            return json;
        } catch (error) {
            const errorArray = Array.isArray(error)
                ? error
                : [{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }];

            if (!isErrorRegistered) {
                createErrorEvent(
                    RELEASES_FETCH_METRIC_ID,
                    ErrorTypes.NETWORK_FAILURE,
                    errorArray
                );
            }

            throw errorArray;
        }
    })
);

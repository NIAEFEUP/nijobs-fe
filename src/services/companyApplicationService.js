import {
    setCompanyApplication,
    setCompanyApplicationSending,
    setCompanyApplicationSubmissionError,
} from "../actions/companyApplicationActions";

import config from "../config";
import { buildCancelableRequest } from "../utils";
import { createEvent, measureTime } from "../utils/analytics";
import { EVENT_TYPES, TIMED_ACTIONS } from "../utils/analytics/constants";
import ErrorTypes from "../utils/ErrorTypes";
const { API_HOSTNAME } = config;

const APPLICATION_SUBMIT_METRIC_ID = "application/submit";

export const submitCompanyApplication = (formData) => buildCancelableRequest(
    measureTime(TIMED_ACTIONS.APPLICATION_SUBMIT, async (dispatch, { signal }) => {
        dispatch(setCompanyApplicationSending(true));
        dispatch(setCompanyApplicationSubmissionError([]));

        try {
            const res = await fetch(`${API_HOSTNAME}/apply/company`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                signal,
            });
            const json = await res.json();

            if (!res.ok) {
                dispatch(setCompanyApplicationSubmissionError(json.errors));
                dispatch(setCompanyApplicationSending(false));

                createEvent(EVENT_TYPES.ERROR(
                    APPLICATION_SUBMIT_METRIC_ID,
                    ErrorTypes.BAD_RESPONSE,
                    res.status
                ));

                return false;
            }

            dispatch(setCompanyApplication(json));
            dispatch(setCompanyApplicationSending(false));

            createEvent(EVENT_TYPES.SUCCESS(APPLICATION_SUBMIT_METRIC_ID));
            return true;

        } catch (error) {
            dispatch(setCompanyApplicationSubmissionError([{ msg: "Unexpected Error" }]));
            dispatch(setCompanyApplicationSending(false));

            createEvent(EVENT_TYPES.ERROR(
                APPLICATION_SUBMIT_METRIC_ID,
                ErrorTypes.NETWORK_FAILURE
            ));

            return false;
        }
    })
);

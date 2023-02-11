import {
    setCompanyApplication,
    setCompanyApplicationSending,
    setCompanyApplicationSubmissionError,
} from "../actions/companyApplicationActions";

import config from "../config";
import { buildCancelableRequest } from "../utils";
import { createEvent, measureTime, createErrorEvent } from "../utils/analytics";
import { EVENT_TYPES, TIMED_ACTIONS } from "../utils/analytics/constants";
import Constants from "../utils/Constants";
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

                createErrorEvent(
                    APPLICATION_SUBMIT_METRIC_ID,
                    ErrorTypes.BAD_RESPONSE,
                    json.errors,
                    res.status
                );

                return false;
            }

            dispatch(setCompanyApplication(json));
            dispatch(setCompanyApplicationSending(false));

            createEvent(EVENT_TYPES.SUCCESS(APPLICATION_SUBMIT_METRIC_ID));
            return true;

        } catch (error) {

            const errorArray = [{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }];

            dispatch(setCompanyApplicationSubmissionError(errorArray));
            dispatch(setCompanyApplicationSending(false));

            createErrorEvent(
                APPLICATION_SUBMIT_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                errorArray
            );

            return false;
        }
    })
);

export const validateApplication = async (token) => {
    try {
        const res = await fetch(`${API_HOSTNAME}/apply/company/validate/${token}/confirm`, {
            method: "POST",
            credentials: "include",

        });
        const json = await res.json();
        if (!res.ok) {
            throw json.errors;
        }
        return json;

    } catch (error) {
        const errorArray = Array.isArray(error) ? error :
            [{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }];
        throw errorArray;
    }

};

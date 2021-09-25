import {
    setCompanyApplication,
    setCompanyApplicationSending,
    setCompanyApplicationSubmissionError,
} from "../actions/companyApplicationActions";

import config from "../config";
import { buildCancelableRequest } from "../utils";
import { recordTime, TIMED_ACTIONS, createEvent, EVENT_TYPES } from "../utils/AnalyticsUtils";
const { API_HOSTNAME } = config;

export const submitCompanyApplication = (formData) => buildCancelableRequest(async (dispatch, { signal }) => {
    const t0 = performance.now();
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
                "Submit Company Application",
                "BAD_RESPONSE",
                res.status
            ));

            return false;
        }

        dispatch(setCompanyApplication(json));
        dispatch(setCompanyApplicationSending(false));

        recordTime(TIMED_ACTIONS.APPLICATION_SUBMIT, t0, performance.now());
        return true;

    } catch (error) {
        dispatch(setCompanyApplicationSubmissionError([{ msg: "Unexpected Error" }]));
        dispatch(setCompanyApplicationSending(false));

        createEvent(EVENT_TYPES.ERROR(
            "Submit Company Application",
            "UNEXPECTED"
        ));

        return false;
    }

});

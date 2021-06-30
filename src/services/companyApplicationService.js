import {
    setCompanyApplication,
    setCompanyApplicationSending,
    setCompanyApplicationSubmissionError,
} from "../actions/companyApplicationActions";

import config from "../config";
import { buildCancelableRequest } from "../utils";
const { API_HOSTNAME } = config;

export const submitCompanyApplication = (formData) => buildCancelableRequest(async (dispatch, { signal }) => {
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
            // TODO count metrics
            return false;
        }

        dispatch(setCompanyApplication(json));

        dispatch(setCompanyApplicationSending(false));
        // TODO count metrics
        return true;

    } catch (error) {
        dispatch(setCompanyApplicationSubmissionError([{ msg: "Unexpected Error" }]));
        dispatch(setCompanyApplicationSending(false));
        // TODO count metrics
        return false;
    }

});

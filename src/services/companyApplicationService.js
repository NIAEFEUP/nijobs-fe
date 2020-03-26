import { API_HOSTNAME } from "../config";
import {
    setCompanyApplication,
    setCompanyApplicationSending,
    setCompanyApplicationSubmissionError,
} from "../actions/companyApplicationActions";


export const submitCompanyApplication = (formData) => async (dispatch) => {
    dispatch(setCompanyApplicationSending(true));
    dispatch(setCompanyApplicationSubmissionError([]));


    try {
        const res = await fetch(`${API_HOSTNAME}/apply/company`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
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
        dispatch(setCompanyApplicationSubmissionError({
            error,
        }));
        dispatch(setCompanyApplicationSending(false));
        // TODO count metrics
        return false;
    }

};

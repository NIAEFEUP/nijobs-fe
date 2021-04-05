import {
    setCreateOffer,
    setCreateOfferSending,
    setCreateOfferSubmissionError,
} from "../actions/createOfferActions";

import config from "../config";
const { API_HOSTNAME } = config;

export const submitCreateOffer = (formData) => async (dispatch) => {
    dispatch(setCreateOfferSending(true));
    dispatch(setCreateOfferSubmissionError([]));

    try {
        const res = await fetch(`${API_HOSTNAME}/offer/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const json = await res.json();

        if (!res.ok) {
            dispatch(setCreateOfferSubmissionError(json.errors));
            dispatch(setCreateOfferSending(false));
            // TODO count metrics
            return false;
        }

        dispatch(setCreateOffer(json));

        dispatch(setCreateOfferSending(false));
        // TODO count metrics
        return true;

    } catch (error) {
        dispatch(setCreateOfferSubmissionError([{ msg: "Unexpected Error" }]));
        dispatch(setCreateOfferSending(false));
        // TODO count metrics
        return false;
    }

};

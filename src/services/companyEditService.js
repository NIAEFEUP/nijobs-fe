import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import config from "../config";
import { parseFiltersToURL, buildCancelableRequest } from "../utils";
import { createEvent, measureTime, sendSearchReport, createErrorEvent } from "../utils/analytics";
import { EVENT_TYPES, TIMED_ACTIONS } from "../utils/analytics/constants";
import Constants from "../utils/Constants";
import ErrorTypes from "../utils/ErrorTypes";
const { API_HOSTNAME } = config;

export const editCompany = measureTime(TIMED_ACTIONS.OFFER_EDIT, async ({
    _id: id,
    name,
    contacts,
    bio,
    logo,
}) => {
    const updatedCompany = {
        id,
        name,
        contacts,
        bio,
        logo,
    };

    try {
        const res = await fetch(`${API_HOSTNAME}/company/${id}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(updatedCompany),
        });
        const json = await res.json();

        if (!res.ok) {
            throw json.errors;
        }

        return json;
    } catch (error) {

    }
});

import config from "../config";
import Constants from "../utils/Constants";
import ErrorTypes from "../utils/ErrorTypes";
import { createErrorEvent, createEvent, measureTime } from "../utils/analytics";
import { EVENT_TYPES, TIMED_ACTIONS } from "../utils/analytics/constants";
const { API_HOSTNAME } = config;

const COMPANY_EDIT_METRIC_ID = "company/edit";

export const editCompany = measureTime(TIMED_ACTIONS.COMPANY_EDIT, async ({
    _id: id,
    name,
    contacts,
    bio,
    logo,
}) => {
    const formData = new FormData();

    if (logo) formData.append("logo", logo);
    formData.append("name", name);
    contacts.forEach((contact) => {
        formData.append("contacts", contact);
    });
    formData.append("bio", bio);

    let isErrorRegistered = false;
    try {
        const res = await fetch(`${API_HOSTNAME}/company/${id}/edit`, {
            method: "PUT",
            body: formData,
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {
            createErrorEvent(
                COMPANY_EDIT_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                res.status
            );
            isErrorRegistered = true;

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(COMPANY_EDIT_METRIC_ID));
        return json;
    } catch (error) {
        const errorArray = Array.isArray(error) ? error :
            [{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }];

        if (!isErrorRegistered) {
            createErrorEvent(
                COMPANY_EDIT_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                errorArray
            );
        }
        isErrorRegistered = true;

        throw errorArray;
    }
});

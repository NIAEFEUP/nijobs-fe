import config from "../config";
import { measureTime, createEvent, TIMED_ACTIONS, EVENT_TYPES } from "../utils/analytics";
import ErrorTypes from "../utils/ErrorTypes";
const { API_HOSTNAME } = config;

const COMPLETE_REGISTRATION_METRIC_ID = "registration/complete";


export const completeRegistration = measureTime(TIMED_ACTIONS.COMPLETE_REGISTRATION, async ({ logo, bio, contacts }) => {

    const formData  = new FormData();

    formData.append("logo", logo);
    contacts.forEach((contact) => {
        formData.append("contacts", contact);
    });
    formData.append("bio", bio);

    let isErrorRegistered = false;
    try {
        const res = await fetch(`${API_HOSTNAME}/company/application/finish`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {

            createEvent(EVENT_TYPES.ERROR(
                COMPLETE_REGISTRATION_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                res.status
            ));
            isErrorRegistered = true;

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(COMPLETE_REGISTRATION_METRIC_ID));
        return json;

    } catch (error) {

        if (!isErrorRegistered) createEvent(EVENT_TYPES.ERROR(
            COMPLETE_REGISTRATION_METRIC_ID,
            ErrorTypes.NETWORK_FAILURE
        ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
});

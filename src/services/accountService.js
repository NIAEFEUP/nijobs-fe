import config from "../config";
import { measureTime, createEvent, TIMED_ACTIONS, EVENT_TYPES } from "../utils/AnalyticsUtils";
const { API_HOSTNAME } = config;

const COMPLETE_REGISTRATION = "Complete Registration";


export const completeRegistration = measureTime(TIMED_ACTIONS.COMPLETE_REGISTRATION, async ({ logo, bio, contacts }) => {

    const formData  = new FormData();

    formData.append("logo", logo);
    contacts.forEach((contact) => {
        formData.append("contacts", contact);
    });
    formData.append("bio", bio);

    try {
        const res = await fetch(`${API_HOSTNAME}/company/application/finish`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {

            createEvent(EVENT_TYPES.ERROR(
                COMPLETE_REGISTRATION,
                "BAD_RESPONSE",
                res.status
            ));

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(COMPLETE_REGISTRATION));
        return json;

    } catch (error) {

        createEvent(EVENT_TYPES.ERROR(
            COMPLETE_REGISTRATION,
            "UNEXPECTED"
        ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
});

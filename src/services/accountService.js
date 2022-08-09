import { setSendingRequest } from "../actions/passwordRecoveryActions";
import config from "../config";
import { buildCancelableRequest } from "../utils";
import { measureTime, createEvent, createErrorEvent } from "../utils/analytics";
import { TIMED_ACTIONS, EVENT_TYPES } from "../utils/analytics/constants";
import Constants from "../utils/Constants";
import ErrorTypes from "../utils/ErrorTypes";
const { API_HOSTNAME } = config;

const COMPLETE_REGISTRATION_METRIC_ID = "registration/complete";
const PASSWORD_RECOVERY_REQUEST_METRIC_ID = "password_recovery/request";


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

            createErrorEvent(
                COMPLETE_REGISTRATION_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                json.errors,
                res.status
            );
            isErrorRegistered = true;

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(COMPLETE_REGISTRATION_METRIC_ID));
        return json;

    } catch (error) {

        const errorArray = Array.isArray(error) ? error :
            [{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }];

        if (!isErrorRegistered) {
            createErrorEvent(
                COMPLETE_REGISTRATION_METRIC_ID,
                ErrorTypes.NETWORK_FAILURE,
                errorArray,
            );
        }

        throw errorArray;
    }
});

export const submitPasswordRequest = (email) => buildCancelableRequest(
    measureTime(TIMED_ACTIONS.PASSWORD_RECOVERY_REQUEST, async (dispatch, { signal }) => {
        let isErrorRegistered = false;
        console.log("email", email);
        dispatch(setSendingRequest(true));
        try {
            const res = await fetch(`${API_HOSTNAME}/auth/recover/request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
                credentials: "include",
                signal,
            });
            const json = await res.json();
            dispatch(setSendingRequest(false));


            if (!res.ok) {

                createErrorEvent(
                    PASSWORD_RECOVERY_REQUEST_METRIC_ID,
                    ErrorTypes.BAD_RESPONSE,
                    json.errors,
                    res.status
                );
                isErrorRegistered = true;

                throw json.errors;
            }

            createEvent(EVENT_TYPES.SUCCESS(PASSWORD_RECOVERY_REQUEST_METRIC_ID));
            return json;

        } catch (error) {
            dispatch(setSendingRequest(false));

            const errorArray = Array.isArray(error) ? error :
                [{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }];

            if (!isErrorRegistered) {
                createErrorEvent(
                    PASSWORD_RECOVERY_REQUEST_METRIC_ID,
                    ErrorTypes.NETWORK_FAILURE,
                    errorArray,
                );
            }

            throw errorArray;
        }
    })
);

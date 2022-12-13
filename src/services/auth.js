import config from "../config";
import { buildCancelableRequest } from "../utils";
import { createErrorEvent, createEvent, measureTime } from "../utils/analytics";
import { EVENT_TYPES, TIMED_ACTIONS } from "../utils/analytics/constants";
import Constants from "../utils/Constants";
import ErrorTypes from "../utils/ErrorTypes";
const { API_HOSTNAME } = config;

const AUTH_ENDPOINT = `${API_HOSTNAME}/auth/login`;
const PASSWORD_RECOVERY_REQUEST_METRIC_ID = "password_recovery/request";
const FINISH_PASSWORD_RECOVERY_REQUEST_METRIC_ID = "password_recovery/finish";
const VERIFY_PASSWORD_RECOVERY_TOKEN_METRIC_ID = "password_recovery/token";

export const login = buildCancelableRequest(async (email, password, { signal }) => {

    const res = await fetch(AUTH_ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        signal,
    });

    if (!res.ok) throw { status: res.status };

});

export const logout = buildCancelableRequest(({ signal }) =>
    fetch(AUTH_ENDPOINT, {
        method: "DELETE",
        credentials: "include",
        signal,
    }));

export const submitPasswordRecoverRequest = measureTime(TIMED_ACTIONS.PASSWORD_RECOVERY_REQUEST, async (email) => {
    let isErrorRegistered = false;

    try {
        const res = await fetch(`${API_HOSTNAME}/auth/recover/request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
            credentials: "include",
        });
        const json = await res.json();

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
});

export const submitFinishPasswordRecover = measureTime(TIMED_ACTIONS.FINISH_PASSWORD_RECOVERY_REQUEST, async (token, password) => {
    let isErrorRegistered = false;

    try {
        const res = await fetch(`${API_HOSTNAME}/auth/recover/${token}/confirm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {

            createErrorEvent(
                FINISH_PASSWORD_RECOVERY_REQUEST_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                json.errors,
                res.status
            );
            isErrorRegistered = true;

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(FINISH_PASSWORD_RECOVERY_REQUEST_METRIC_ID));
        return json;

    } catch (error) {
        const errorArray = Array.isArray(error) ? error :
            [{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }];

        if (!isErrorRegistered) {
            createErrorEvent(
                FINISH_PASSWORD_RECOVERY_REQUEST_METRIC_ID,
                ErrorTypes.NETWORK_FAILURE,
                errorArray,
            );
        }

        throw errorArray;
    }
});

export const verifyPasswordRecoveryToken = measureTime(TIMED_ACTIONS.VERIFY_PASSWORD_RECOVERY_TOKEN, async (token) => {
    let isErrorRegistered = false;

    try {
        const res = await fetch(`${API_HOSTNAME}/auth/recover/${token}/confirm`, {
            method: "GET",
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {

            createErrorEvent(
                VERIFY_PASSWORD_RECOVERY_TOKEN_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                json.errors,
                res.status
            );
            isErrorRegistered = true;

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(VERIFY_PASSWORD_RECOVERY_TOKEN_METRIC_ID));
        return json;

    } catch (error) {
        const errorArray = Array.isArray(error) ? error :
            [{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }];

        if (!isErrorRegistered) {
            createErrorEvent(
                VERIFY_PASSWORD_RECOVERY_TOKEN_METRIC_ID,
                ErrorTypes.NETWORK_FAILURE,
                errorArray,
            );
        }

        throw errorArray;
    }
});

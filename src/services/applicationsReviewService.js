import config from "../config";
import { buildCancelableRequest } from "../utils";
import { createEvent, measureTime } from "../utils/analytics";
import { EVENT_TYPES, TIMED_ACTIONS } from "../utils/analytics/constants";
import ErrorTypes from "../utils/ErrorTypes";
const { API_HOSTNAME } = config;

const APPLICATION_SEARCH_METRIC_ID = "application/search";
const APPLICATION_APPROVE_METRIC_ID = "application/approve";
const APPLICATION_REJECT_METRIC_ID = "application/reject";


const encodeFilters = (filters) => {
    const encodedValues = [];

    if (filters.limit) encodedValues.push(`limit=${filters.limit}`);
    if (filters.offset) encodedValues.push(`offset=${filters.offset}`);
    if (filters.companyName) encodedValues.push(`companyName=${filters.companyName}`);
    if (filters.state)
        encodedValues.push(`state=[${filters.state.map((state) => `"${state}"`).join(",")}]`);
    if (filters.sortBy)
        encodedValues.push(`sortBy=${Object.entries(filters.sortBy)
            .map(([field, mode]) => `${field}:${mode}`)
            .join(",")}`
        );

    return encodedValues.join("&");
};

export const searchApplications = buildCancelableRequest(measureTime(TIMED_ACTIONS.APPLICATION_SEARCH, async (filters, { signal } = {}) => {

    let isErrorRegistered = false;
    try {
        const res = await fetch(`${API_HOSTNAME}/applications/company/search${filters ? `?${encodeFilters(filters)}` : ""}`, {
            method: "GET",
            credentials: "include",
            signal,
        });
        const json = await res.json();

        if (!res.ok) {

            createEvent(EVENT_TYPES.ERROR(
                APPLICATION_SEARCH_METRIC_ID,
                ErrorTypes.BAD_RESPONSE,
                res.status
            ));
            isErrorRegistered = true;

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(APPLICATION_SEARCH_METRIC_ID));
        return json;

    } catch (error) {

        if (!isErrorRegistered) createEvent(EVENT_TYPES.ERROR(
            APPLICATION_SEARCH_METRIC_ID,
            ErrorTypes.NETWORK_FAILURE
        ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
}));

export const approveApplication = buildCancelableRequest(
    measureTime(TIMED_ACTIONS.APPLICATION_APPROVE, async (applicationId, { signal }) => {

        let isErrorRegistered = false;
        try {
            const res = await fetch(`${API_HOSTNAME}/applications/company/${applicationId}/approve`, {
                method: "POST",
                credentials: "include",
                signal,
            });
            const json = await res.json();

            if (!res.ok) {

                createEvent(EVENT_TYPES.ERROR(
                    APPLICATION_APPROVE_METRIC_ID,
                    ErrorTypes.BAD_RESPONSE,
                    res.status
                ));
                isErrorRegistered = true;

                throw json.errors;
            }

            createEvent(EVENT_TYPES.SUCCESS(APPLICATION_APPROVE_METRIC_ID));
            return json;

        } catch (error) {

            if (!isErrorRegistered) createEvent(EVENT_TYPES.ERROR(
                APPLICATION_APPROVE_METRIC_ID,
                ErrorTypes.NETWORK_FAILURE
            ));

            if (Array.isArray(error)) throw error;
            throw [{ msg: "Unexpected Error. Please try again later." }];
        }
    })
);

export const rejectApplication = buildCancelableRequest(
    measureTime(TIMED_ACTIONS.APPLICATION_REJECT, async (applicationId, rejectReason, { signal }) => {
        let isErrorRegistered = false;
        try {
            const res = await fetch(`${API_HOSTNAME}/applications/company/${applicationId}/reject`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rejectReason }),
                signal,
            });
            const json = await res.json();

            if (!res.ok) {

                createEvent(EVENT_TYPES.ERROR(
                    APPLICATION_REJECT_METRIC_ID,
                    ErrorTypes.BAD_RESPONSE,
                    res.status
                ));
                isErrorRegistered = true;

                throw json.errors;
            }

            createEvent(EVENT_TYPES.SUCCESS(APPLICATION_REJECT_METRIC_ID));
            return json;

        } catch (error) {

            if (!isErrorRegistered) createEvent(EVENT_TYPES.ERROR(
                APPLICATION_REJECT_METRIC_ID,
                ErrorTypes.NETWORK_FAILURE
            ));

            if (Array.isArray(error)) throw error;
            throw [{ msg: "Unexpected Error. Please try again later." }];
        }
    })
);

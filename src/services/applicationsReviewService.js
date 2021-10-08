import config from "../config";
import { buildCancelableRequest } from "../utils";
import { createEvent, EVENT_TYPES, TIMED_ACTIONS, measureTime } from "../utils/AnalyticsUtils";
const { API_HOSTNAME } = config;

const SEARCH_APPLICATIONS = "Search Applications";
const APPROVE_APPLICATION = "Approve Application";
const REJECT_APPLICATION = "Reject Application";


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

    try {
        const res = await fetch(`${API_HOSTNAME}/applications/company/search${filters ? `?${encodeFilters(filters)}` : ""}`, {
            method: "GET",
            credentials: "include",
            signal,
        });
        const json = await res.json();

        if (!res.ok) {

            createEvent(EVENT_TYPES.ERROR(
                SEARCH_APPLICATIONS,
                "BAD_RESPONSE",
                res.status
            ));

            throw json.errors;
        }

        createEvent(EVENT_TYPES.SUCCESS(SEARCH_APPLICATIONS));
        return json;

    } catch (error) {

        createEvent(EVENT_TYPES.ERROR(
            SEARCH_APPLICATIONS,
            "UNEXPECTED"
        ));

        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
}));

export const approveApplication = buildCancelableRequest(
    measureTime(TIMED_ACTIONS.APPLICATION_APPROVE, async (applicationId, { signal }) => {

        try {
            const res = await fetch(`${API_HOSTNAME}/applications/company/${applicationId}/approve`, {
                method: "POST",
                credentials: "include",
                signal,
            });
            const json = await res.json();

            if (!res.ok) {

                createEvent(EVENT_TYPES.ERROR(
                    APPROVE_APPLICATION,
                    "BAD_RESPONSE",
                    res.status
                ));

                throw json.errors;
            }

            createEvent(EVENT_TYPES.SUCCESS(APPROVE_APPLICATION));
            return json;

        } catch (error) {

            createEvent(EVENT_TYPES.ERROR(
                APPROVE_APPLICATION,
                "UNEXPECTED"
            ));

            if (Array.isArray(error)) throw error;
            throw [{ msg: "Unexpected Error. Please try again later." }];
        }
    })
);

export const rejectApplication = buildCancelableRequest(
    measureTime(TIMED_ACTIONS.APPLICATION_REJECT, async (applicationId, rejectReason, { signal }) => {
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
                    REJECT_APPLICATION,
                    "BAD_RESPONSE",
                    res.status
                ));

                throw json.errors;
            }

            createEvent(EVENT_TYPES.SUCCESS(REJECT_APPLICATION));
            return json;

        } catch (error) {

            createEvent(EVENT_TYPES.ERROR(
                REJECT_APPLICATION,
                "UNEXPECTED"
            ));

            if (Array.isArray(error)) throw error;
            throw [{ msg: "Unexpected Error. Please try again later." }];
        }
    })
);

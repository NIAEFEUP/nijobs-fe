import config from "../config";
import { buildCancelableRequest } from "../utils";
const { API_HOSTNAME } = config;


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

export const searchApplications = buildCancelableRequest(async (filters, { signal } = {}) => {

    try {
        const res = await fetch(`${API_HOSTNAME}/applications/company/search${filters ? `?${encodeFilters(filters)}` : ""}`, {
            method: "GET",
            credentials: "include",
            signal,
        });
        const json = await res.json();

        if (!res.ok) {
            throw json.errors;
        }
        // TODO count metrics
        return json;

    } catch (error) {
        // TODO count metrics
        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
});

export const approveApplication = buildCancelableRequest(async (applicationId, { signal }) => {

    try {
        const res = await fetch(`${API_HOSTNAME}/applications/company/${applicationId}/approve`, {
            method: "POST",
            credentials: "include",
            signal,
        });
        const json = await res.json();

        if (!res.ok) {
            throw json.errors;
        }
        // TODO count metrics
        return json;

    } catch (error) {
        // TODO count metrics
        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
});

export const rejectApplication = buildCancelableRequest(async (applicationId, rejectReason, { signal }) => {
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
            throw json.errors;
        }
        // TODO count metrics
        return json;

    } catch (error) {
        // TODO count metrics
        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
});

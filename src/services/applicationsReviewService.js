import { API_HOSTNAME } from "../config";

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

export const searchApplications = async (filters) => {

    try {
        const res = await fetch(`${API_HOSTNAME}/applications/company/search${filters ? `?${encodeFilters(filters)}` : ""}`, {
            method: "GET",
            credentials: "include",
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
        throw [{ msg: "Unexpected Error" }];
    }
};

export const approveApplication = async (applicationId) => {

    try {
        const res = await fetch(`${API_HOSTNAME}/applications/company/${applicationId}/approve`, {
            method: "POST",
            credentials: "include",
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
        throw [{ msg: "Unexpected Error" }];
    }
};

export const rejectApplication = async (applicationId, rejectReason) => {
    try {
        const res = await fetch(`${API_HOSTNAME}/applications/company/${applicationId}/reject`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rejectReason }),
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
        throw [{ msg: "Unexpected Error" }];
    }
};

import { API_HOSTNAME } from "../config";

export const searchApplications = async (filters) => {

    try {
        const res = await fetch(`${API_HOSTNAME}/applications/company/search`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: filters ? JSON.stringify({ filters }) : "",
        });
        const json = await res.json();

        if (!res.ok) {
            throw json.errors;
        }
        // TODO count metrics
        return json;

    } catch (error) {
        // TODO count metrics
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
        throw [{ msg: "Unexpected Error" }];
    }
};

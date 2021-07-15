import config from "../config";
const { API_HOSTNAME } = config;

export const hideOffer = async (offerId) => {

    try {
        const res = await fetch(`${API_HOSTNAME}/offers/${offerId}/hide`, {
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
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
};

export const disableOffer = async (offerId, adminReason) => {

    try {
        const res = await fetch(`${API_HOSTNAME}/offers/${offerId}/disable`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ adminReason }),
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
};

export const enableOffer = async (offerId) => {

    try {
        const res = await fetch(`${API_HOSTNAME}/offers/${offerId}/enable`, {
            method: "PUT",
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
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }
};

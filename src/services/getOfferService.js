import config from "../config";
const { API_HOSTNAME } = config;

export const getOffer = async (id) => {

    try {
        const res = await fetch(`${API_HOSTNAME}/offers/${id}`, {
            method: "GET",
        });
        const json = await res.json();

        if (!res.ok) {
            throw json.errors;
        }
        return json;
        // TODO count metrics

    } catch (error) {
        if (Array.isArray(error)) throw error;
        throw [{ msg: "Unexpected Error" }];
        // TODO count metrics
    }

};

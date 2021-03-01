/* eslint-disable no-useless-catch */
import config from "../config";
const { API_HOSTNAME } = config;

export const searchMyOffers = async () => {
    try {
        const res = await fetch(`${API_HOSTNAME}/offers`, {
            method: "GET",
            credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {
            throw json.errors;
        }

        return json;
    } catch (error) {
        throw error;
    }
};

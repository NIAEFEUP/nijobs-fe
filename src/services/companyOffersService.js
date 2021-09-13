import config from "../config";
import { parseSearchFiltersToURL } from "./offerService";
const { API_HOSTNAME } = config;

export const fetchCompanyOffers = async (companyID, filters) => {
    try {
        const res = await fetch(`${API_HOSTNAME}/offers/company/${companyID}${filters ? `?${parseSearchFiltersToURL(filters)}` : ""}`, {
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

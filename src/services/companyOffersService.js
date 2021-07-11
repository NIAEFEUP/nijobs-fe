import config from "../config";
const { API_HOSTNAME } = config;


const parseFiltersToURL = (filters) => Object.keys(filters).map((key) => `${key}=${filters[key]}`).join("&");

export const fetchCompanyOffers = async (companyID, filters) => {
    try {
        const res = await fetch(`${API_HOSTNAME}/offers/company/${companyID}${filters ? `?${parseFiltersToURL(filters)}` : ""}`, {
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

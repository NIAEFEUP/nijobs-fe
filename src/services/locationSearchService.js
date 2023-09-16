import Constants from "../utils/Constants";
import config from "../config";

export const searchCities = async (query, limit = 10) => {

    const API_ENDPOINT = `${config.LOCATION_SERVICE_HOSTNAME}/search`;
    const options = {
        limit,
        searchTerm: query,
    };
    try {
        const res = await fetch(`${API_ENDPOINT}?${Object.entries(options).map(
            ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
        ).join("&")}`);

        if (!res.ok)
            return [];

        const data = await res.json();
        return data.map(({ city, country, latitude, longitude }) => ({ city, country, latitude, longitude }));

    } catch (err) {
        throw [{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }];
    }
};

export const searchCities = async (prefix, limit = 10) => {

    const API_ENDPOINT = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
    const options = {
        types: "CITY",
        minPopulation: "100000",
        namePrefix: prefix,
        limit,
    };
    try {
        const res = await fetch(`${API_ENDPOINT}?${Object.entries(options).map(([k, v]) => `${k}=${v}`).join("&")}`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
                "x-rapidapi-key": process.env.GEO_API_KEY,
            },
        });

        if (!res.ok) return [];

        const data = (await res.json()).data;
        return data.map(({ city, country, latitude, longitude }) => ({ city, country, latitude, longitude }));

    } catch (err) {
        throw [{ msg: UNEXPECTED_ERROR_MESSAGE }];
    }

};

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
                "x-rapidapi-key": "TRpfb7GujpmshTOR1UmR0a0QKER9p1MAzLEjsn58ZsGXD9lPMx",
            },
        });

        if (!res.ok) return [];

        const data = (await res.json()).data;
        return data.map(({ city, country, latitude, longitude }) => ({ city, country, latitude, longitude }));

    } catch (err) {
        throw [{ msg: "Unexpected Error. Please try again later." }];
    }

};

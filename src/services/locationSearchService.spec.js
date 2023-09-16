
import config from "../config";
import Constants from "../utils/Constants";

import { searchCities } from "./locationSearchService";

const API_ENDPOINT = `${config.LOCATION_SERVICE_HOSTNAME}/search`;

describe("Location Service", () => {

    afterEach(() => {
        fetch.resetMocks();
    });

    const buildUriParams = (params) => `${Object.entries(params).map(
        ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
    ).join("&")}`;

    it("Should send a GET request to search for cities with default limit", async () => {

        const cities = [
            {
                city: "test",
                country: "test",
                latitude: 0,
                longitude: 0,
            },
        ];

        // Simulate request success
        fetch.mockResponse(JSON.stringify(cities));

        const searchTerm = "test";
        const data = {
            limit: 10,
            searchTerm,
        };

        const res = await searchCities(searchTerm);

        expect(fetch).toHaveBeenCalledWith(`${API_ENDPOINT}?${buildUriParams(data)}`);
        expect(res).toEqual(cities);
    });

    it("Should send a GET request to search for cities with custom limit", async () => {

        const cities = [
            {
                city: "test",
                country: "test",
                latitude: 0,
                longitude: 0,
            },
        ];

        // Simulate request success
        fetch.mockResponse(JSON.stringify(cities));

        const searchTerm = "test";
        const limit = 5;
        const data = {
            limit,
            searchTerm,
        };

        const res = await searchCities(searchTerm, limit);

        expect(fetch).toHaveBeenCalledWith(`${API_ENDPOINT}?${buildUriParams(data)}`);
        expect(res).toEqual(cities);
    });

    it("Should handle non successful requests", async () => {

        // Simulate request error
        // any non-2XX status code will be treated as an error so this will do
        fetch.mockResponseOnce("{}", { status: 500, headers: { "content-type": "application/json" } });

        expect(await searchCities("this value does not matter")).toEqual([]);
    });

    it("Should handle aborted requests or requests with network errors", async () => {

        // Simulate request error
        fetch.mockReject(new Error("fake error message"));

        try {
            await searchCities("this value does not matter");
        } catch (err) {
            expect(err).toEqual([{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }]);
        }
    });
});

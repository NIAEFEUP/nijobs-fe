import config from "../config";

import { getOffer } from "./getOfferService";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
const { API_HOSTNAME } = config;

describe("Get Offer Service", () => {

    let id, offer;

    beforeEach(() => {
        id = "60f16140fb2b9800321e2ca1";
        offer = new Offer({
            id: id,
            title: "position1",
            ownerName: "company1",
            location: "location1",
            jobStartDate: (new Date()).toISOString(),
            publishDate: "2021-04-22T22:35:57.177Z",
            publishEndDate: "2021-09-19T23:00:00.000Z",
            description: "description1",
        });

        fetch.resetMocks();
    });

    it("Should send a GET request to get a specific offer", async () => {
        // Simulate request success
        fetch.mockResponse(JSON.stringify({ mockData: offer }));

        await getOffer(id);

        expect(fetch).toHaveBeenCalledWith(`${API_HOSTNAME}/offers/${id}`, {
            method: "GET",
            credentials: "include",
        });
    });

    it("Should handle non successful requests", async () => {
        const errors = [{ msg: "error1" }, { msg: "error2" }];

        // Simulate request error
        fetch.mockResponse(JSON.stringify({ errors }), { status: 422 });

        try {
            await getOffer("123");
        } catch (e) {
            expect(e).toStrictEqual(errors);
        }
    });

    it("Should handle network error", async () => {

        // Simulate network failure
        fetch.mockAbort();

        try {
            await getOffer(id);
        } catch (e) {
            expect(e).toStrictEqual([{ msg: "Unexpected Error. Please try again later." }]);
        }
    });
});

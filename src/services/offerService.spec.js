import config from "../config";

import {hideOffer, disableOffer, enableOffer, editOffer} from "./offerService";
import Constants from "../utils/Constants";
const { API_HOSTNAME } = config;

describe("Offer Service", () => {

    const id = "60f16140fb2b9800321e2ca1";
    const adminReason = "This offer is offensive.";
    const data = { };

    beforeEach(() => {
        fetch.resetMocks();
    });

    it("Should send a POST request to hide a specific offer", async () => {

        // Simulate request success
        fetch.mockResponse(JSON.stringify({ mockData: true }));

        await hideOffer(id);

        expect(fetch).toHaveBeenCalledWith(`${API_HOSTNAME}/offers/${id}/hide`, {
            method: "POST",
            credentials: "include",
        });
    });

    it("Should send a POST request to disable a specific offer", async () => {

        // Simulate request success
        fetch.mockResponse(JSON.stringify({ mockData: true }));

        await disableOffer(id, adminReason);

        expect(fetch).toHaveBeenCalledWith(`${API_HOSTNAME}/offers/${id}/disable`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ adminReason }),
        });
    });

    it("Should send a PUT request to enable a specific offer", async () => {

        // Simulate request success
        fetch.mockResponse(JSON.stringify({ mockData: true }));

        await enableOffer(id);

        expect(fetch).toHaveBeenCalledWith(`${API_HOSTNAME}/offers/${id}/enable`, {
            method: "PUT",
            credentials: "include",
        });
    });

    it("Should send a POST request to edit a specific offer", async () => {

        //Simulate request success
        fetch.mockResponse(JSON.stringify({mockData: true }));

        await editOffer({offerId:id}, data);

        expect(fetch).toHaveBeenCalledWith(`${API_HOSTNAME}/offers/${id}/edit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });
    });

    it("Should handle non successful requests", async () => {
        const errors = [{ msg: "error1" }, { msg: "error2" }];

        // Simulate request error
        fetch.mockResponse(JSON.stringify({ errors }), { status: 422 });

        try {
            await hideOffer(id);
        } catch (e) {
            expect(e).toStrictEqual(errors);
        }

        try {
            await disableOffer(id, adminReason);
        } catch (e) {
            expect(e).toStrictEqual(errors);
        }

        try {
            await enableOffer(id);
        } catch (e) {
            expect(e).toStrictEqual(errors);
        }

        try {
            await editOffer(id);
        } catch (e) {
            expect(e).toStrictEqual(errors);
        }
    });

    it("Should handle network error", async () => {

        // Simulate network failure
        fetch.mockAbort();

        try {
            await hideOffer(id);
        } catch (e) {
            expect(e).toStrictEqual([{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }]);
        }

        try {
            await disableOffer(id, adminReason);
        } catch (e) {
            expect(e).toStrictEqual([{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }]);
        }

        try {
            await enableOffer(id);
        } catch (e) {
            expect(e).toStrictEqual([{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }]);
        }

        try {
            await editOffer(id);
        } catch (e) {
            expect(e).toStrictEqual([{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }]);
        }
    });
});

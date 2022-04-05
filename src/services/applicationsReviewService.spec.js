import config from "../config";

import { searchApplications, approveApplication, rejectApplication } from "./applicationsReviewService";
const { API_HOSTNAME } = config;

describe("Company Application Service", () => {

    beforeEach(() => {
        fetch.resetMocks();
    });

    it("should GET the API with the correct filters data", async () => {

        // Simulate request success
        fetch.mockResponse(JSON.stringify({ applications: [{ thisIsAnApplication: true }, { thisIsAnotherApplication: true }] }));

        const filters = {
            limit: 10,
            offset: 10,
            companyName: "company",
            state: ["APPROVED", "PENDING"],
            sortBy: {
                state: "asc",
                companyName: "desc",
            },
        };
        await searchApplications(filters);

        const filtersString = "limit=10&offset=10&companyName=company&state=[\"APPROVED\",\"PENDING\"]&sortBy=state:asc,companyName:desc";
        expect(fetch).toHaveBeenCalledWith(`${API_HOSTNAME}/applications/company/search?${filtersString}`, expect.objectContaining({
            method: "GET",
            credentials: "include",
        }));

    });

    it("should handle network error", async () => {

        // Simulate network failure
        fetch.mockAbort();

        try {
            await searchApplications();
        } catch (e) {
            expect(e).toStrictEqual([{ msg: UNEXPECTED_ERROR_MESSAGE }]);
        }

        try {
            await approveApplication("id1");
        } catch (e) {
            expect(e).toStrictEqual([{ msg: UNEXPECTED_ERROR_MESSAGE }]);
        }

        try {
            await rejectApplication("id1", "rejectReason");
        } catch (e) {
            expect(e).toStrictEqual([{ msg: UNEXPECTED_ERROR_MESSAGE }]);
        }

    });

    it("should handle not-ok response from API", async () => {

        const errors = [{ msg: "error1" }, { msg: "error2" }];

        // Simulate request error
        fetch.mockResponse(JSON.stringify({ errors }), { status: 422 });

        try {
            await searchApplications();
        } catch (e) {
            expect(e).toStrictEqual(errors);
        }

        try {
            await approveApplication("id1");
        } catch (e) {
            expect(e).toStrictEqual(errors);
        }

        try {
            await rejectApplication("id1", "rejectReason");
        } catch (e) {
            expect(e).toStrictEqual(errors);
        }

    });

    it("should POST the API to approve application", async () => {

        // Simulate request success
        fetch.mockResponse(JSON.stringify({ mockData: true }));

        await approveApplication("id1");

        expect(fetch).toHaveBeenCalledWith(`${API_HOSTNAME}/applications/company/id1/approve`, expect.objectContaining({
            method: "POST",
            credentials: "include",
        }));

    });

    it("should POST the API to reject application", async () => {

        // Simulate request success
        fetch.mockResponse(JSON.stringify({ mockData: true }));

        await rejectApplication("id1", "rejectReason");

        expect(fetch).toHaveBeenCalledWith(`${API_HOSTNAME}/applications/company/id1/reject`, expect.objectContaining({
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rejectReason: "rejectReason" }),
        }));

    });
});

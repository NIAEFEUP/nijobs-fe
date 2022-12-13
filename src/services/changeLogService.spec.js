import { fetchReleases } from "./changeLogService";
import { createErrorEvent, createEvent } from "../utils/analytics";

jest.mock("../utils/analytics", () => {
    const originalModule = jest.requireActual("../utils/analytics");

    //  Mock the default export and named export 'foo'
    return {
        __esModule: true,
        ...originalModule,
        createErrorEvent: jest.fn(() => null),
        createEvent: jest.fn(() => null),
    };
});

describe("Changelog Service", () => {
    it("should Fetch the Github API for releases", async () => {
        // Simulate request success
        const fetchRes = { mockData: true };
        fetch.mockResponse(JSON.stringify(fetchRes));

        const result = await fetchReleases();

        expect(fetch).toHaveBeenCalledWith(
            "https://api.github.com/repos/NIAEFEUP/nijobs-fe/releases",
            expect.objectContaining({ method: "GET" })
        );

        expect(result).toEqual(fetchRes);
        expect(createEvent).toBeCalledTimes(1);
        expect(createErrorEvent).toBeCalledTimes(0);
    });

    it("should handle network error", async () => {
        // Simulate network failure
        fetch.mockAbort();

        try {
            await fetchReleases();
        } catch (err) {
            expect(fetch).toHaveBeenCalledWith(
                "https://api.github.com/repos/NIAEFEUP/nijobs-fe/releases",
                expect.objectContaining({ method: "GET" })
            );

            expect(createEvent).toBeCalledTimes(0);
            expect(createErrorEvent).toBeCalledTimes(1);
        }
    });

    it("should handle not-ok response from API", async () => {
        // Simulate request errprs
        const errors = [{ msg: "error1" }, { msg: "error2" }];
        fetch.mockResponse(JSON.stringify({ errors }), { status: 422 });

        try {
            await fetchReleases();
        } catch (err) {
            expect(fetch).toHaveBeenCalledWith(
                "https://api.github.com/repos/NIAEFEUP/nijobs-fe/releases",
                expect.objectContaining({ method: "GET" })
            );

            expect(createEvent).toBeCalledTimes(0);
            expect(createErrorEvent).toBeCalledTimes(1);
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});

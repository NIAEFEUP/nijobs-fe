import Constants from "../utils/Constants";
import { fetchCompanyApplication } from "./companyService";
import config from "../config";
const { API_HOSTNAME } = config;
describe("Company Service", () => {
    describe("Fetch Company Application", () => {
        const companyId = 0;
        it("should GET the API to fetch the company application ", async () => {

            // Simulate request success
            fetch.mockResponse(JSON.stringify({ mockData: true }));

            await fetchCompanyApplication(companyId);
            expect(fetch).toHaveBeenCalledWith(
                `${API_HOSTNAME}/company/${companyId}/application`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
        });

        it("should handle network error", async () => {

            // Simulate network failure
            fetch.mockAbort();
            try {
                await fetchCompanyApplication(companyId);

            } catch (err) {
                expect(err).toStrictEqual([{ msg: Constants.UNEXPECTED_ERROR_MESSAGE }]);
            }
        });

        it("should handle not-ok response from API", async () => {

            const errors = [{ msg: "error1" }, { msg: "error2" }];

            // Simulate request error
            fetch.mockResponse(JSON.stringify({ errors }), { status: 422 });

            try {
                await fetchCompanyApplication(companyId);
            } catch (e) {
                expect(e).toStrictEqual(errors);
            }
        });
    });

});

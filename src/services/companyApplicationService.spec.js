import config from "../config";

import { submitCompanyApplication } from "./companyApplicationService";
import {
    setCompanyApplicationSending,
    setCompanyApplicationSubmissionError,
    setCompanyApplication,
} from "../actions/companyApplicationActions";
import Constants from "../utils/Constants";
const { API_HOSTNAME } = config;

describe("Company Application Service", () => {
    it("should POST the API with the form data in JSON format and dispatch the correct actions", async () => {

        // Simulate request success
        fetch.mockResponse(JSON.stringify({ mockData: true }));

        const dispatchMock = jest.fn();

        const formData = { field1: 1, field2: 2 };
        await submitCompanyApplication(formData)(dispatchMock);

        expect(fetch).toHaveBeenCalledWith(`${API_HOSTNAME}/apply/company`, expect.objectContaining({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }));


        expect(dispatchMock).toHaveBeenNthCalledWith(1, setCompanyApplicationSending(true));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setCompanyApplicationSubmissionError([]));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setCompanyApplication({ mockData: true }));
        expect(dispatchMock).toHaveBeenNthCalledWith(4, setCompanyApplicationSending(false));
    });

    it("should handle network error", async () => {

        // Simulate network failure
        fetch.mockAbort();

        const dispatchMock = jest.fn();

        const formData = { field1: 1, field2: 2 };
        await submitCompanyApplication(formData)(dispatchMock);


        expect(dispatchMock).toHaveBeenNthCalledWith(1, setCompanyApplicationSending(true));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setCompanyApplicationSubmissionError([]));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setCompanyApplicationSubmissionError([
            { msg: Constants.UNEXPECTED_ERROR_MESSAGE },
        ]));
        expect(dispatchMock).toHaveBeenNthCalledWith(4, setCompanyApplicationSending(false));
    });

    it("should handle not-ok response from API", async () => {

        const errors = [{ msg: "error1" }, { msg: "error2" }];

        // Simulate request error
        fetch.mockResponse(JSON.stringify({ errors }), { status: 422 });

        const dispatchMock = jest.fn();

        const formData = { field1: 1, field2: 2 };
        await submitCompanyApplication(formData)(dispatchMock);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, setCompanyApplicationSending(true));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setCompanyApplicationSubmissionError([]));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setCompanyApplicationSubmissionError(errors));
        expect(dispatchMock).toHaveBeenNthCalledWith(4, setCompanyApplicationSending(false));
    });
});

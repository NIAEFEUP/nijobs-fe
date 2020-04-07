import { API_HOSTNAME } from "../config";
import { submitCompanyApplication } from "./companyApplicationService";
import {
    setCompanyApplicationSending,
    setCompanyApplicationSubmissionError,
    setCompanyApplication,
} from "../actions/companyApplicationActions";

describe("Company Application Service", () => {
    it("should POST the API with the form data in JSON format and dispatch the correct actions", async () => {

        // Simulate request success
        fetchMock.doMock();
        fetch.mockResponse(JSON.stringify({ mockData: true }));

        const dispatchMock = jest.fn();

        const formData = { field1: 1, field2: 2 };
        await submitCompanyApplication(formData)(dispatchMock);

        expect(fetch).toHaveBeenCalledWith(`${API_HOSTNAME}/apply/company`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });


        expect(dispatchMock).toHaveBeenNthCalledWith(1, setCompanyApplicationSending(true));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setCompanyApplicationSubmissionError([]));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setCompanyApplication({ mockData: true }));
        expect(dispatchMock).toHaveBeenNthCalledWith(4, setCompanyApplicationSending(false));
    });

    it("should handle network error", async () => {

        // Simulate network failure
        fetchMock.doMock();
        fetch.mockAbort();

        const dispatchMock = jest.fn();

        const formData = { field1: 1, field2: 2 };
        await submitCompanyApplication(formData)(dispatchMock);


        expect(dispatchMock).toHaveBeenNthCalledWith(1, setCompanyApplicationSending(true));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setCompanyApplicationSubmissionError([]));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setCompanyApplicationSubmissionError([{ msg: "Unexpected Error" }]));
        expect(dispatchMock).toHaveBeenNthCalledWith(4, setCompanyApplicationSending(false));
    });

    it("should handle not-ok response from API", async () => {

        const errors = [{ msg: "error1" }, { msg: "error2" }];

        // Simulate request error
        fetchMock.doMock();
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

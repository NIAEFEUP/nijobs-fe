import companyApplicationReducer from "./companyApplicationReducer";
import {
    setCompanyApplication,
    setCompanyApplicationSending,
    setCompanyApplicationSubmissionError,
} from "../actions/companyApplicationActions";

describe("Company Applications Reducer", () => {
    it("should correctly initialize company application state", () => {
        const state = companyApplicationReducer(undefined, {});
        expect(state).toEqual({
            companyApplication: null,
            sendingApplication: false,
            errors: null,
        });
    });

    it("should set company application when setSearchOffers action is called", () => {
        const state = companyApplicationReducer(
            {
                companyApplication: null,
            },
            setCompanyApplication({ field1: 1, field2: 2 })
        );

        expect(state.companyApplication.field1).toBe(1);
        expect(state.companyApplication.field2).toBe(2);
    });
    it("should set loading when setCompanyApplicationSending action is called", () => {
        const state = companyApplicationReducer(
            {
                sendingApplication: false,
            },
            setCompanyApplicationSending(true)
        );

        expect(state.sendingApplication).toBe(true);

        const newState = companyApplicationReducer(state, setCompanyApplicationSending(false));
        expect(newState.sendingApplication).toBe(false);
    });
    it("should set error when setOffersFetchError action is called", () => {
        const state = companyApplicationReducer(
            {
                error: null,
            },
            setCompanyApplicationSubmissionError([{ error: "something" }, { error: "something2" }])
        );

        expect(state.errors[0]).toEqual({ error: "something" });
        expect(state.errors[1]).toEqual({ error: "something2" });
    });

});

import React from "react";
import { renderWithStoreAndTheme } from "../utils/test-utils";
import CompanyApplicationPage from "./CompanyApplicationPage";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createMuiTheme } from "@material-ui/core";

describe("CompanyApplicationPage", () => {

    const initialState = {
        companyApplication: {
            companyApplication: null,
            sendingApplication: false,
            errors: null,
        },
    }; // add initial values
    const mockStore = configureMockStore([thunk]);
    const store = mockStore(initialState);

    const theme = createMuiTheme({});

    describe("render", () => {
        const wrapper = renderWithStoreAndTheme(<CompanyApplicationPage />, { store, theme });

        it("should render an input for email", () => {
            expect(wrapper.container.querySelector("input[name='email']")).toBeTruthy();
        });
        it("should render an input for password", () => {
            expect(wrapper.container.querySelector("input[name='password']").type).toBe("password");
        });
        it("should render an input for password confirmation", () => {
            expect(wrapper.container.querySelector("input[name='confirmPassword']").type).toBe("password");
        });
        it("should render an input for company name", () => {
            expect(wrapper.container.querySelector("input[name='companyName']")).toBeTruthy();
        });
        it("should render a textarea for motivation", () => {
            expect(wrapper.container.querySelector("textarea[name='motivation']")).toBeTruthy();
        });
        it("should render a confirmation dialog on registration completion", () => {
            const wrapper = renderWithStoreAndTheme(<CompanyApplicationPage showConfirmation/>, { store, theme });
            expect(wrapper.getByText("Application Submitted")).toBeTruthy();

        });
    });
});

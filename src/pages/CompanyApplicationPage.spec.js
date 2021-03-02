import React from "react";
import { renderWithStoreAndTheme } from "../test-utils";
import CompanyApplicationPage from "./CompanyApplicationPage";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createMuiTheme } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";

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

        it("should render form components", () => {
            const wrapper = renderWithStoreAndTheme(<CompanyApplicationPage />, { store, theme });
            const emailInput = wrapper.getByLabelText("Email");
            expect(emailInput.name).toBe("email");

            const passwordInput = wrapper.getByLabelText("Password");
            expect(passwordInput.name).toBe("password");
            expect(passwordInput.type).toBe("password");

            const confirmPasswordInput = wrapper.getByLabelText("Confirm Password");
            expect(confirmPasswordInput.name).toBe("confirmPassword");
            expect(confirmPasswordInput.type).toBe("password");

            const companyNameInput = wrapper.getByLabelText("Company Name");
            expect(companyNameInput.name).toBe("companyName");

            const motivationInput = wrapper.getByLabelText("Motivation");
            expect(motivationInput.name).toBe("motivation");
            expect(motivationInput.type).toBe("textarea");
            expect(motivationInput.placeholder).toBe("Tell us about the company. How do you think NIJobs can help you achieve your goal?");

            const applyButton = wrapper.getByText("Apply");
            expect(applyButton).toBeTruthy();

            const resetButton = wrapper.getByText("Reset");
            expect(resetButton).toBeTruthy();
        });

        it("should render a confirmation dialog on registration completion", () => {
            const wrapper = renderWithStoreAndTheme(
                <Router>
                    <CompanyApplicationPage showConfirmation />
                </Router>,
                { store, theme }
            );
            expect(wrapper.getByText("Application Submitted")).toBeTruthy();

        });
    });
});

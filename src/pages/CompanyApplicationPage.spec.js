/* eslint-disable react/prop-types */
import React from "react";
import CompanyApplicationPage, {
    CompanyApplicationPageController,
    CompanyApplicationPageControllerContext,
} from "./CompanyApplicationPage";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import useComponentController from "../hooks/useComponentController";
import { renderWithStoreAndTheme, screen, act, fireEvent } from "../test-utils";

const CompanyApplicationPageWrapper = ({ children, showConfirmation = false }) => {
    const {
        ContextProvider,
        contextProviderProps,
    } = useComponentController(
        CompanyApplicationPageController,
        {
            showConfirmation,
        },
        CompanyApplicationPageControllerContext
    );

    return (
        <ContextProvider {...contextProviderProps}>
            {children}
        </ContextProvider>
    );
};

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

    const theme = createTheme({});

    describe("render", () => {

        it("should render form components", () => {
            const wrapper = renderWithStoreAndTheme(
                <CompanyApplicationPageWrapper>
                    <CompanyApplicationPage />
                </CompanyApplicationPageWrapper>,
                { store, theme }
            );
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

        it("should render a confirmation dialog on registration completion", async () => {
            // Simulate request success
            fetch.mockResponse(JSON.stringify({ mockData: true }));

            const companyName = "valid company name";
            const email = "valid@email.com";
            const password = "password123";
            const confirmPassword = "password123";
            const motivation = "valid motivation text";

            const wrapper = renderWithStoreAndTheme(
                <Router>
                    <CompanyApplicationPageWrapper>
                        <CompanyApplicationPage />
                    </CompanyApplicationPageWrapper>
                </Router>,
                { initialState, theme }
            );
            const companyNameInput = wrapper.getByLabelText("Company Name");
            const emailInput = wrapper.getByLabelText("Email");
            const passwordInput = wrapper.getByLabelText("Password");
            const confirmPasswordInput = wrapper.getByLabelText("Confirm Password");
            const motivationInput = wrapper.getByLabelText("Motivation");
            const applyButton = wrapper.getByText("Apply");

            await fireEvent.change(companyNameInput, { target: { value: companyName } });
            await fireEvent.change(emailInput, { target: { value: email } });
            await fireEvent.change(passwordInput, { target: { value: password } });
            await fireEvent.change(confirmPasswordInput, { target: { value: confirmPassword } });
            await fireEvent.change(motivationInput, { target: { value: motivation } });

            await act(async () => {
                await fireEvent.click(applyButton);
            });

            expect(screen.getByText("Application Submitted")).toBeInTheDocument();

        });
    });
});

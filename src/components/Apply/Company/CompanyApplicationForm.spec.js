import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { renderWithStoreAndTheme, fireEvent, waitFor } from "../../../test-utils";
import thunk from "redux-thunk";
import CompanyApplicationForm from "./CompanyApplicationForm";
import { createMuiTheme } from "@material-ui/core";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../../../reducers";

describe("CompanyApplicationForm", () => {

    const store = createStore(reducer, {}, compose(applyMiddleware(thunk)));

    const theme = createMuiTheme({});

    describe("interaction", () => {
        it("should fail validation if invalid email", async () => {
            const wrapper = renderWithStoreAndTheme(<CompanyApplicationForm />, { store, theme });
            const input = wrapper.getByLabelText("Email");

            // Empty value
            input.value = "";
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Email"))).toHaveTextContent("Required field.");

            // Invalid value
            input.value = "invalid email";
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Email"))).toHaveTextContent("Must be a valid email.");

            // Valid value
            input.value = "valid@email.com";
            fireEvent.blur(input);
            /*
                I'm leaving this comment here so that you, future developer, know that I've spent 3+ hours trying to understand why
                "" !== "", only to find that there is a nasty character MUI includes instead of a space
                I dove into the FormHelperText source code to find it and I finally found it.
            */
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Email"))).toHaveTextContent("\u200B");
        });
        it("should fail validation if invalid password", async () => {
            const wrapper = renderWithStoreAndTheme(<CompanyApplicationForm />, { store, theme });
            const input = wrapper.getByLabelText("Password");

            // Invalid value
            input.value = "123";
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Password")))
                .toHaveTextContent("Must have at least 8 characters.");

            // Valid value
            input.value = "password123";
            fireEvent.blur(input);
            /*
                I'm leaving this comment here so that you, future developer, know that I've spent 3+ hours trying to understand why
                "" !== "", only to find that there is a nasty character MUI includes instead of a space
                I dove into the FormHelperText source code to find it and I finally found it.
            */
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Password"))).toHaveTextContent("\u200B");
        });
        it("should fail validation if passwords don't match", async () => {
            const wrapper = renderWithStoreAndTheme(<CompanyApplicationForm />, { store, theme });
            const passwordInput = wrapper.getByLabelText("Password");

            // Invalid value
            passwordInput.value = "password123";
            fireEvent.blur(passwordInput);

            const confirmPasswordInput = wrapper.getByLabelText("Confirm Password");
            confirmPasswordInput.value = "notpassword123";
            fireEvent.blur(confirmPasswordInput);

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Confirm Password"))).toHaveTextContent("Passwords must match.");
            confirmPasswordInput.value = "password123";
            fireEvent.blur(confirmPasswordInput);
            /*
                I'm leaving this comment here so that you, future developer, know that I've spent 3+ hours trying to understand why
                "" !== "", only to find that there is a nasty character MUI includes instead of a space
                I dove into the FormHelperText source code to find it and I finally found it.
            */
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Confirm Password"))).toHaveTextContent("\u200B");
        });
        it("should fail validation if invalid company name", async () => {
            const wrapper = renderWithStoreAndTheme(<CompanyApplicationForm />, { store, theme });
            const input = wrapper.getByLabelText("Company Name");

            // Invalid value
            input.value = "f";
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Company Name")))
                .toHaveTextContent("Must have at least 2 characters.");

            input.value = "superlongcompanynameholysh1titodesnotendbutstillitgoeson";
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Company Name")))
                .toHaveTextContent("Must not exceed 50 characters.");

            // Valid value
            input.value = "validcompanyname";
            fireEvent.blur(input);

            /*
                I'm leaving this comment here so that you, future developer, know that I've spent 3+ hours trying to understand why
                "" !== "", only to find that there is a nasty character MUI includes instead of a space
                I dove into the FormHelperText source code to find it and I finally found it.
            */
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Company Name"))).toHaveTextContent("\u200B");
        });
        it("should fail validation if invalid motivation", async () => {
            const wrapper = renderWithStoreAndTheme(<CompanyApplicationForm />, { store, theme });
            const input = wrapper.getByLabelText("Motivation");

            // Invalid value
            input.value = "tiny";
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Motivation")))
                .toHaveTextContent("Must have at least 10 characters.");

            input.value = "f".repeat(1501);
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Motivation")))
                .toHaveTextContent("1501/1500 Must not exceed 1500 characters.");

            // Valid value
            input.value = "validmotivation";
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Motivation"))).toHaveTextContent("15/1500");
        });
        it("should show a char counter for motivation textarea", async () => {
            const wrapper = renderWithStoreAndTheme(<CompanyApplicationForm />, { store, theme });
            const input = wrapper.getByLabelText("Motivation");

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Motivation")))
                .toHaveTextContent("0/1500");

            input.value = "f".repeat(10);
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Motivation")))
                .toHaveTextContent("10/1500");

            input.value = "f".repeat(50);
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Motivation")))
                .toHaveTextContent("50/1500");

        });
        it("should show submission error after submit", async () => {

            // Simulate network problem
            fetchMock.doMock();
            fetch.mockAbort();

            const wrapper = renderWithStoreAndTheme(<CompanyApplicationForm />, { store, theme });
            const companyNameInput = wrapper.getByLabelText("Company Name");
            const emailInput = wrapper.getByLabelText("Email");
            const passwordInput = wrapper.getByLabelText("Password");
            const confirmPasswordInput = wrapper.getByLabelText("Confirm Password");
            const motivationInput = wrapper.getByLabelText("Motivation");
            const applyButton = wrapper.getByText("Apply");

            companyNameInput.value = "valid company name";
            emailInput.value = "valid@email.com";
            passwordInput.value = "password123";
            confirmPasswordInput.value = "password123";
            motivationInput.value = "valid motivation text";

            await act(async () => {
                await fireEvent.click(applyButton);
            });

            expect(await wrapper.findByTestId("submission-error")).toHaveTextContent("An error occurred, please try again.");
        });

        it("should reset fields and errors on reset button press", async () => {

            const wrapper = renderWithStoreAndTheme(<CompanyApplicationForm />, { store, theme });
            const companyNameInput = wrapper.getByLabelText("Company Name");
            const emailInput = wrapper.getByLabelText("Email");
            const passwordInput = wrapper.getByLabelText("Password");
            const confirmPasswordInput = wrapper.getByLabelText("Confirm Password");
            const motivationInput = wrapper.getByLabelText("Motivation");
            const resetButton = wrapper.getByText("Reset");

            // Invalid values to trigger errors
            await act(async () => {
                companyNameInput.value = "f";
                await fireEvent.blur(companyNameInput);
            });
            expect(companyNameInput).toHaveValue("f");


            await act(async () => {
                emailInput.value = "invalidemail";
                await fireEvent.blur(emailInput);
            });
            expect(emailInput).toHaveValue("invalidemail");


            await act(async () => {
                passwordInput.value = "p";
                await fireEvent.blur(passwordInput);
            });
            expect(passwordInput).toHaveValue("p");


            await act(async () => {
                confirmPasswordInput.value = "s";
                await fireEvent.blur(confirmPasswordInput);
            });
            expect(confirmPasswordInput).toHaveValue("s");


            await act(async () => {
                motivationInput.value = "invalid";
                await fireEvent.blur(motivationInput);
            });
            expect(motivationInput).toHaveValue("invalid");


            await act(async () => {
                await fireEvent.click(resetButton);
            });


            expect(companyNameInput).toHaveValue("");
            expect(await wrapper.findDescriptionOf(companyNameInput)).toHaveTextContent("\u200B");
            expect(emailInput).toHaveValue("");
            expect(await wrapper.findDescriptionOf(emailInput)).toHaveTextContent("\u200B");
            expect(passwordInput).toHaveValue("");
            expect(await wrapper.findDescriptionOf(passwordInput)).toHaveTextContent("\u200B");
            expect(confirmPasswordInput).toHaveValue("");
            expect(await wrapper.findDescriptionOf(confirmPasswordInput)).toHaveTextContent("\u200B");
            expect(motivationInput).toHaveValue("");
            expect(await wrapper.findDescriptionOf(motivationInput)).toHaveTextContent("0/1500");
        });

    });

    it("should clear submission error after changing some input", async () => {

        // Simulate network problem
        fetchMock.doMock();
        fetch.mockAbort();

        const companyName = "valid company name";
        const email = "valid@email.com";
        const password = "password123";
        const confirmPassword = "password123";
        const motivation = "valid motivation text";

        const wrapper = renderWithStoreAndTheme(<CompanyApplicationForm />, { store, theme });
        const companyNameInput = wrapper.getByLabelText("Company Name");
        const emailInput = wrapper.getByLabelText("Email");
        const passwordInput = wrapper.getByLabelText("Password");
        const confirmPasswordInput = wrapper.getByLabelText("Confirm Password");
        const motivationInput = wrapper.getByLabelText("Motivation");
        const applyButton = wrapper.getByText("Apply");

        companyNameInput.value = companyName;
        emailInput.value = email;
        passwordInput.value = password;
        confirmPasswordInput.value = confirmPassword;
        motivationInput.value = motivation;

        await act(async () => {
            await fireEvent.click(applyButton);
        });

        expect(await wrapper.findByTestId("submission-error")).toHaveTextContent("An error occurred, please try again.");

        const testFieldChangeEffect = async (input, value) => {
            // eslint-disable-next-line no-console
            console.info("Tesiting change of", input.name);
            await act(async () => {
                // Regular fireEvent does not actually trigger the onChange event required for this test
                await Simulate.change(input, { target: { value } });
            });

            expect(wrapper.queryByTestId("submission-error")).toBeFalsy();

            await act(async () => {
                await fireEvent.click(applyButton);
            });

            expect(await wrapper.findByTestId("submission-error")).toHaveTextContent("An error occurred, please try again.");
        };

        await testFieldChangeEffect(companyNameInput, companyName);
        await testFieldChangeEffect(emailInput, email);
        await testFieldChangeEffect(passwordInput, password);
        await testFieldChangeEffect(motivationInput, motivation);

    });

    it("should show a confirmation screen after submission success", async () => {

        // Simulate request success
        fetchMock.doMock();
        fetch.mockResponse(JSON.stringify({ mockData: true }));

        const companyName = "valid company name";
        const email = "valid@email.com";
        const password = "password123";
        const confirmPassword = "password123";
        const motivation = "valid motivation text";

        const toggleConfirmationModalMock = jest.fn();

        const wrapper = renderWithStoreAndTheme(
            <CompanyApplicationForm toggleConfirmationModal={toggleConfirmationModalMock}/>,
            { store, theme }
        );
        const companyNameInput = wrapper.getByLabelText("Company Name");
        const emailInput = wrapper.getByLabelText("Email");
        const passwordInput = wrapper.getByLabelText("Password");
        const confirmPasswordInput = wrapper.getByLabelText("Confirm Password");
        const motivationInput = wrapper.getByLabelText("Motivation");
        const applyButton = wrapper.getByText("Apply");

        companyNameInput.value = companyName;
        emailInput.value = email;
        passwordInput.value = password;
        confirmPasswordInput.value = confirmPassword;
        motivationInput.value = motivation;

        await act(async () => {
            await fireEvent.click(applyButton);
        });

        expect(toggleConfirmationModalMock).toHaveBeenCalled();
    });

    it("should show passwords when clicking the toggle password visibility button", async () => {

        const password = "password123";
        const confirmPassword = "password1234";

        const wrapper = renderWithStoreAndTheme(
            <CompanyApplicationForm />,
            { store, theme }
        );
        const passwordInput = wrapper.getByLabelText("Password");
        const confirmPasswordInput = wrapper.getByLabelText("Confirm Password");
        const toggleButton = wrapper.getByLabelText("toggle password visibility");

        passwordInput.value = password;
        confirmPasswordInput.value = confirmPassword;

        expect(passwordInput).toHaveAttribute("type", "password");
        expect(passwordInput).toHaveValue("password123");
        expect(confirmPasswordInput).toHaveAttribute("type", "password");
        expect(confirmPasswordInput).toHaveValue("password1234");

        await act(async () => {
            await fireEvent.click(toggleButton);
        });

        expect(passwordInput).toHaveAttribute("type", "text");
        expect(passwordInput).toHaveValue("password123");
        expect(confirmPasswordInput).toHaveAttribute("type", "text");
        expect(confirmPasswordInput).toHaveValue("password1234");

        await act(async () => {
            await fireEvent.click(toggleButton);
        });

        expect(passwordInput).toHaveAttribute("type", "password");
        expect(passwordInput).toHaveValue("password123");
        expect(confirmPasswordInput).toHaveAttribute("type", "password");
        expect(confirmPasswordInput).toHaveValue("password1234");
    });

    it("should toggle the why-modal on respective link click", async () => {


        const wrapper = renderWithStoreAndTheme(<CompanyApplicationForm />, { store, theme });
        const whyLink = wrapper.getByText("Why do I need to apply?");

        expect(wrapper.queryByRole("dialog")).not.toBeInTheDocument();

        await act(async () => {
            await fireEvent.click(whyLink, { preventDefault: () => {} });
        });

        await waitFor(() => {
            expect(wrapper.queryByRole("dialog")).toBeInTheDocument();
        });

        await act(async () => {
            await fireEvent.click(wrapper.getByText("Close"), { preventDefault: () => {} });
        });

        await waitFor(() => {
            expect(wrapper.queryByRole("dialog")).not.toBeInTheDocument();
        });

    });

});

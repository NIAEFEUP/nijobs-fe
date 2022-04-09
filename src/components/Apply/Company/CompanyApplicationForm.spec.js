import React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { renderWithStoreAndTheme, fireEvent, waitFor } from "../../../test-utils";
import CompanyApplicationForm from "./CompanyApplicationForm";
import { createTheme } from "@material-ui/core/styles";
import { CompanyApplicationPageController, CompanyApplicationPageControllerContext } from "../../../pages/CompanyApplicationPage";
import useComponentController from "../../../hooks/useComponentController";

// eslint-disable-next-line react/prop-types
const CompanyApplicationFormWrapper = ({ children, showConfirmation = false }) => {
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

describe("CompanyApplicationForm", () => {

    const initialState = {};

    const theme = createTheme({});

    describe("interaction", () => {
        it("should fail validation if invalid email", async () => {
            const wrapper = renderWithStoreAndTheme(
                <CompanyApplicationFormWrapper>
                    <CompanyApplicationForm />
                </CompanyApplicationFormWrapper>,
                { initialState, theme }
            );
            const input = wrapper.getByLabelText("Email");

            // Empty value
            fireEvent.change(input, { target: { value: "" } });
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Email"))).toHaveTextContent("Required field.");

            // Invalid value
            fireEvent.change(input, { target: { value: "invalid email" } });
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Email"))).toHaveTextContent("Must be a valid email.");

            // Valid value
            fireEvent.change(input, { target: { value: "valid@email.com" } });
            fireEvent.blur(input);
            /*
                I'm leaving this comment here so that you, future developer, know that I've spent 3+ hours trying to understand why
                "" !== "", only to find that there is a nasty character MUI includes instead of a space
                I dove into the FormHelperText source code to find it and I finally found it.
            */
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Email"))).toHaveTextContent("\u200B");
        });
        it("should fail validation if invalid password", async () => {
            const wrapper = renderWithStoreAndTheme(
                <CompanyApplicationFormWrapper>
                    <CompanyApplicationForm />
                </CompanyApplicationFormWrapper>,
                { initialState, theme });
            const input = wrapper.getByLabelText("Password");

            // Invalid value
            fireEvent.change(input, { target: { value: "123" } });
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Password")))
                .toHaveTextContent("Must have at least 8 character(s).");

            // Valid value
            fireEvent.change(input, { target: { value: "password123" } });
            fireEvent.blur(input);
            /*
                I'm leaving this comment here so that you, future developer, know that I've spent 3+ hours trying to understand why
                "" !== "", only to find that there is a nasty character MUI includes instead of a space
                I dove into the FormHelperText source code to find it and I finally found it.
            */
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Password"))).toHaveTextContent("\u200B");
        });
        it("should fail validation if passwords don't match", async () => {
            const wrapper = renderWithStoreAndTheme(
                <CompanyApplicationFormWrapper>
                    <CompanyApplicationForm />
                </CompanyApplicationFormWrapper>,
                { initialState, theme });
            const passwordInput = wrapper.getByLabelText("Password");

            // Invalid value
            fireEvent.change(passwordInput, { target: { value: "password123" } });
            fireEvent.blur(passwordInput);

            const confirmPasswordInput = wrapper.getByLabelText("Confirm Password");
            fireEvent.change(confirmPasswordInput, { target: { value: "notpassword123" } });
            fireEvent.blur(confirmPasswordInput);

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Confirm Password"))).toHaveTextContent("Passwords must match.");

            fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
            fireEvent.blur(confirmPasswordInput);
            /*
                I'm leaving this comment here so that you, future developer, know that I've spent 3+ hours trying to understand why
                "" !== "", only to find that there is a nasty character MUI includes instead of a space
                I dove into the FormHelperText source code to find it and I finally found it.
            */
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Confirm Password"))).toHaveTextContent("\u200B");
        });
        it("should fail validation if invalid company name", async () => {
            const wrapper = renderWithStoreAndTheme(
                <CompanyApplicationFormWrapper>
                    <CompanyApplicationForm />
                </CompanyApplicationFormWrapper>,
                { initialState, theme });
            const input = wrapper.getByLabelText("Company Name");

            // Invalid value
            fireEvent.change(input, { target: { value: "f" } });
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Company Name")))
                .toHaveTextContent("Must have at least 2 character(s).");

            fireEvent.change(input, { target: { value: "superlongcompanynameholysh1titodesnotendbutstillitgoeson" } });
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Company Name")))
                .toHaveTextContent("Must not exceed 50 character(s).");

            // Valid value
            fireEvent.change(input, { target: { value: "validcompanyname" } });
            fireEvent.blur(input);

            /*
                I'm leaving this comment here so that you, future developer, know that I've spent 3+ hours trying to understand why
                "" !== "", only to find that there is a nasty character MUI includes instead of a space
                I dove into the FormHelperText source code to find it and I finally found it.
            */
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Company Name"))).toHaveTextContent("\u200B");
        });
        it("should fail validation if invalid motivation", async () => {
            const wrapper = renderWithStoreAndTheme(
                <CompanyApplicationFormWrapper>
                    <CompanyApplicationForm />
                </CompanyApplicationFormWrapper>,
                { initialState, theme });
            const input = wrapper.getByLabelText("Motivation");

            // Invalid value
            fireEvent.change(input, { target: { value: "tiny" } });
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Motivation")))
                .toHaveTextContent("Must have at least 10 character(s).");

            fireEvent.change(input, { target: { value: "f".repeat(1501) } });
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Motivation")))
                .toHaveTextContent("1501/1500 Must not exceed 1500 character(s).");

            // Valid value
            fireEvent.change(input, { target: { value: "validmotivation" } });
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Motivation"))).toHaveTextContent("15/1500");
        });
        it("should show a char counter for motivation textarea", async () => {
            const wrapper = renderWithStoreAndTheme(
                <CompanyApplicationFormWrapper>
                    <CompanyApplicationForm />
                </CompanyApplicationFormWrapper>,
                { initialState, theme });
            const input = wrapper.getByLabelText("Motivation");

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Motivation")))
                .toHaveTextContent("0/1500");

            fireEvent.change(input, { target: { value: "f".repeat(10) } });
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Motivation")))
                .toHaveTextContent("10/1500");

            fireEvent.change(input, { target: { value: "f".repeat(50) } });

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Motivation")))
                .toHaveTextContent("50/1500");

        });

        it("should show submission error after submit", async () => {

            // Simulate network problem
            fetch.mockAbort();

            const wrapper = renderWithStoreAndTheme(
                <CompanyApplicationFormWrapper>
                    <CompanyApplicationForm />
                </CompanyApplicationFormWrapper>,
                { initialState, theme });
            const companyNameInput = wrapper.getByLabelText("Company Name");
            const emailInput = wrapper.getByLabelText("Email");
            const passwordInput = wrapper.getByLabelText("Password");
            const confirmPasswordInput = wrapper.getByLabelText("Confirm Password");
            const motivationInput = wrapper.getByLabelText("Motivation");
            const applyButton = wrapper.getByText("Apply");

            fireEvent.change(companyNameInput, { target: { value: "valid company name" } });
            fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
            fireEvent.change(passwordInput, { target: { value: "password123" } });
            fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
            fireEvent.change(motivationInput, { target: { value: "valid motivation text" } });

            await act(async () => {
                await fireEvent.click(applyButton);
            });

            expect(await wrapper.findByTestId("submission-error")).toHaveTextContent("An error occurred, please try again.");
        });

        it("should reset fields and errors on reset button press", async () => {

            const wrapper = renderWithStoreAndTheme(
                <CompanyApplicationFormWrapper>
                    <CompanyApplicationForm />
                </CompanyApplicationFormWrapper>,
                { initialState, theme });
            const companyNameInput = wrapper.getByLabelText("Company Name");
            const emailInput = wrapper.getByLabelText("Email");
            const passwordInput = wrapper.getByLabelText("Password");
            const confirmPasswordInput = wrapper.getByLabelText("Confirm Password");
            const motivationInput = wrapper.getByLabelText("Motivation");
            const resetButton = wrapper.getByText("Reset");

            // Invalid values to trigger errors
            await act(async () => {
                await fireEvent.change(companyNameInput, { target: { value: "f" } });
                await fireEvent.blur(companyNameInput);
            });
            expect(companyNameInput).toHaveValue("f");


            await act(async () => {
                await fireEvent.change(emailInput, { target: { value: "invalidemail" } });
                await fireEvent.blur(emailInput);
            });
            expect(emailInput).toHaveValue("invalidemail");


            await act(async () => {
                await fireEvent.change(passwordInput, { target: { value: "p" } });
                await fireEvent.blur(passwordInput);
            });
            expect(passwordInput).toHaveValue("p");


            await act(async () => {
                await fireEvent.change(confirmPasswordInput, { target: { value: "s" } });
                await fireEvent.blur(confirmPasswordInput);
            });
            expect(confirmPasswordInput).toHaveValue("s");


            await act(async () => {
                await fireEvent.change(motivationInput, { target: { value: "invalid" } });
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
        fetch.mockAbort();

        const companyName = "valid company name";
        const email = "valid@email.com";
        const password = "password123";
        const confirmPassword = "password123";
        const motivation = "valid motivation text";

        const wrapper = renderWithStoreAndTheme(
            <CompanyApplicationFormWrapper>
                <CompanyApplicationForm />
            </CompanyApplicationFormWrapper>,
            { initialState, theme });
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

        expect(await wrapper.findByTestId("submission-error")).toHaveTextContent("An error occurred, please try again.");

        const testFieldChangeEffect = async (input, value) => {
            // eslint-disable-next-line no-console
            console.info("Tesiting change of", input.name);
            await act(async () => {
                // Regular fireEvent does not actually trigger the onChange event required for this test
                await Simulate.change(input, { target: { value } });
            });

            expect(wrapper.queryByTestId("submission-error")).not.toBeInTheDocument();

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

    it("should show passwords when clicking the toggle password visibility button", async () => {

        const password = "password123";
        const confirmPassword = "password1234";

        const wrapper = renderWithStoreAndTheme(
            <CompanyApplicationFormWrapper>
                <CompanyApplicationForm />
            </CompanyApplicationFormWrapper>,
            { initialState, theme }
        );
        const passwordInput = wrapper.getByLabelText("Password");
        const confirmPasswordInput = wrapper.getByLabelText("Confirm Password");
        const toggleButton = wrapper.getByLabelText("toggle password visibility");

        await fireEvent.change(passwordInput, { target: { value: password } });
        await fireEvent.change(confirmPasswordInput, { target: { value: confirmPassword } });

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

        const wrapper = renderWithStoreAndTheme(
            <CompanyApplicationFormWrapper>
                <CompanyApplicationForm />
            </CompanyApplicationFormWrapper>,
            { initialState, theme });
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

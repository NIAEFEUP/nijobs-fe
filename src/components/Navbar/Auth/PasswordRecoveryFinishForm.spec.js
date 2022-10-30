import React from "react";

import { submitFinishPasswordRecover, verifyPasswordRecoveryToken } from "../../../services/auth";

import { fireEvent, act, renderWithStoreAndTheme, waitFor } from "../../../test-utils";
import Constants from "../../../utils/Constants";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../../../pages/HomePage";
import Notifier from "../../Notifications/Notifier";
import AppTheme from "../../../AppTheme";
import Navbar from "..";

jest.mock("../../../services/auth");
jest.mock("react-router-dom", () => {
    const original = jest.requireActual("react-router-dom");
    return {
        ...original,
        useParams: jest.fn().mockReturnValue({ token: "test123" }),
    };
});

describe("Navbar - AuthModal", () => {
    describe("interaction", () => {
        const initialState = {};
        it("Should toggle the modal visibility when accessing the recovery link", async () => {

            verifyPasswordRecoveryToken.mockImplementation(() => true);
            const wrapper = renderWithStoreAndTheme(
                <SnackbarProvider maxSnack={3}>
                    <Notifier />
                    <BrowserRouter>
                        <HomePage openPasswordRecoveryModal />
                        <Navbar />
                    </BrowserRouter>
                </SnackbarProvider>,
                { initialState, theme: AppTheme }
            );


            await waitFor(() => {
                const title = wrapper.queryByRole("heading", { level: 2, name: "Recover Password" });
                expect(title).toBeInTheDocument();
            });


            const passwordField = wrapper.getByLabelText("New Password");
            expect(passwordField).toBeInTheDocument();
        });

        it("Should request correctly and change to login page", async () => {

            // Making sure that the login service allows the login
            submitFinishPasswordRecover.mockImplementationOnce(() => true);

            verifyPasswordRecoveryToken.mockImplementation(() => true);
            const wrapper = renderWithStoreAndTheme(
                <SnackbarProvider maxSnack={3}>
                    <Notifier />
                    <BrowserRouter>
                        <HomePage openPasswordRecoveryModal />
                        <Navbar />
                    </BrowserRouter>
                </SnackbarProvider>,
                { initialState, theme: AppTheme }
            );


            await waitFor(() => {
                const title = wrapper.queryByRole("heading", { level: 2, name: "Recover Password" });
                expect(title).toBeInTheDocument();
            });


            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("New Password"), { target: { value: "password123" } });
            });

            await act(async () => {
                await fireEvent.click(wrapper.getByRole("button", { name: "Recover Password" }));
            });

            const dialogTitle = wrapper.queryByRole("heading", { level: 2, name: "Login" });
            expect(dialogTitle).toBeInTheDocument();
        });

        it("should fail validation if invalid password", async () => {
            verifyPasswordRecoveryToken.mockImplementation(() => true);
            const wrapper = renderWithStoreAndTheme(
                <SnackbarProvider maxSnack={3}>
                    <Notifier />
                    <BrowserRouter>
                        <HomePage openPasswordRecoveryModal />
                        <Navbar />
                    </BrowserRouter>
                </SnackbarProvider>,
                { initialState, theme: AppTheme }
            );


            await waitFor(() => {
                const title = wrapper.queryByRole("heading", { level: 2, name: "Recover Password" });
                expect(title).toBeInTheDocument();
            });


            const input = wrapper.getByLabelText("New Password");

            // Invalid value
            fireEvent.change(input, { target: { value: "123" } });
            fireEvent.blur(input);
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("New Password")))
                .toHaveTextContent("Must have at least 8 character(s).");

            // Valid value
            fireEvent.change(input, { target: { value: "password123" } });
            fireEvent.blur(input);
            /*
                I'm leaving this comment here so that you, future developer, know that I've spent 3+ hours trying to understand why
                "" !== "", only to find that there is a nasty character MUI includes instead of a space
                I dove into the FormHelperText source code to find it and I finally found it.
            */
            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("New Password"))).toHaveTextContent("\u200B");
        });

        it("Should show general error on request fail, and clear on input change", async () => {
            submitFinishPasswordRecover.mockImplementationOnce(() => {
                throw new Error();
            });


            verifyPasswordRecoveryToken.mockImplementation(() => true);
            const wrapper = renderWithStoreAndTheme(
                <SnackbarProvider maxSnack={3}>
                    <Notifier />
                    <BrowserRouter>
                        <HomePage openPasswordRecoveryModal />
                        <Navbar />
                    </BrowserRouter>
                </SnackbarProvider>,
                { initialState, theme: AppTheme }
            );


            await waitFor(() => {
                const title = wrapper.queryByRole("heading", { level: 2, name: "Recover Password" });
                expect(title).toBeInTheDocument();
            });


            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("New Password"), { target: { value: "password123" } });
            });

            await act(async () => {
                await fireEvent.click(wrapper.getByRole("button", { name: "Recover Password" }));
            });

            expect(await wrapper.queryByText(Constants.UNEXPECTED_ERROR_MESSAGE)).toBeInTheDocument();


            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("New Password"), { target: { value: "password12" } });
            });

            expect(await wrapper.queryByText(Constants.UNEXPECTED_ERROR_MESSAGE)).not.toBeInTheDocument();
        });

        it("Should show invalid token error on request fail due to invalid token, and clear on input change", async () => {
            verifyPasswordRecoveryToken.mockImplementation(() => {
                throw [{ msg: "invalid-token" }];
            });

            const wrapper = renderWithStoreAndTheme(
                <SnackbarProvider maxSnack={3}>
                    <Notifier />
                    <BrowserRouter>
                        <HomePage openPasswordRecoveryModal />
                        <Navbar />
                    </BrowserRouter>
                </SnackbarProvider>,
                { initialState, theme: AppTheme }
            );


            await waitFor(() => {
                const title = wrapper.queryByRole("heading", { level: 2, name: "Recover Password" });
                expect(title).toBeInTheDocument();
            });


            expect(await wrapper.queryByText("The token provided is invalid or has expired.")).toBeInTheDocument();
        });
    });
});

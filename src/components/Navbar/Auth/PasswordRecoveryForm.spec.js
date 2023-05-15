import React from "react";

import { login, submitPasswordRecoverRequest } from "../../../services/auth";

import AuthModal from "./AuthModal";
import { fireEvent, act, renderWithStoreAndTheme } from "../../../test-utils";
import Constants from "../../../utils/Constants";
import { SnackbarProvider } from "notistack";
import { createTheme } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

jest.mock("../../../services/auth");

describe("Navbar - AuthModal - PasswordRecoveryForm", () => {
    const theme = createTheme({});
    describe("render", () => {
        it("Should not appear as default", () => {
            const wrapper = renderWithStoreAndTheme(
                <SnackbarProvider maxSnack={3}>
                    <AuthModal initialPage={1} />
                </SnackbarProvider>,
                { initialState: {}, theme }
            );
            const dialogTitle = wrapper.queryByRole("heading", { level: 2, name: "Recover Password" });
            expect(dialogTitle).not.toBeInTheDocument();
        });
    });
    describe("interaction", () => {
        it("Should toggle the modal visibility when clicking Cancel button", () => {

            const toggleAuthModal = jest.fn();

            const wrapper = renderWithStoreAndTheme(
                <SnackbarProvider maxSnack={3}>
                    <BrowserRouter>
                        <AuthModal open toggleAuthModal={toggleAuthModal} initialPage={1} />
                    </BrowserRouter>
                </SnackbarProvider>, { initialState: {}, theme }
            );

            fireEvent.click(wrapper.getByText("Recover Password"));

            const dialogTitle = wrapper.queryByRole("heading", { level: 2, name: "Recover Password" });
            expect(dialogTitle).toBeInTheDocument();

            fireEvent.click(wrapper.getByText("Cancel"));

            expect(toggleAuthModal).toHaveBeenCalledTimes(1);
        });

        it("Should change to the login page when clicking Login button", () => {

            const toggleAuthModal = jest.fn();

            const wrapper = renderWithStoreAndTheme(
                <SnackbarProvider maxSnack={3}>
                    <BrowserRouter>
                        <AuthModal open toggleAuthModal={toggleAuthModal} initialPage={1} />
                    </BrowserRouter>
                </SnackbarProvider>, { initialState: {}, theme }
            );

            fireEvent.click(wrapper.getByText("Recover Password"));


            fireEvent.click(wrapper.getByText("Login"));

            const dialogTitle = wrapper.queryByRole("heading", { level: 2, name: "Login" });
            expect(dialogTitle).toBeInTheDocument();
        });

        it("Should request correctly and change to finish recovery page", async () => {

            // Making sure that the login service allows the login
            login.mockImplementationOnce(() => true);

            const toggleAuthModal = jest.fn();

            const wrapper = renderWithStoreAndTheme(
                <SnackbarProvider maxSnack={3}>
                    <BrowserRouter>
                        <AuthModal
                            open
                            toggleAuthModal={toggleAuthModal}
                            updateSessionInfo={() => {}}
                        />
                    </BrowserRouter>
                </SnackbarProvider>, { initialState: {}, theme }
            );

            fireEvent.click(wrapper.getByText("Recover Password"));


            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Email"), { target: { value: "asd@email.com" } });
            });
            await act(async () => {
                await fireEvent.click(wrapper.getByRole("button", { name: "Recover Password" }));
            });

            const dialogTitle = wrapper.queryByRole("heading", { level: 2, name: "Recover Password" });
            expect(dialogTitle).toBeInTheDocument();

            const info = wrapper.getByText("If you account is registered, you will receive an email containing the following steps");
            expect(info).toBeInTheDocument();

        });

        it("Should not allow invalid email", async () => {
            const wrapper = renderWithStoreAndTheme(
                <SnackbarProvider maxSnack={3}>
                    <BrowserRouter>
                        <AuthModal
                            open
                            toggleAuthModal={() => {}}
                            updateSessionInfo={() => {}}
                        />
                    </BrowserRouter>
                </SnackbarProvider>, { initialState: {}, theme }
            );

            fireEvent.click(wrapper.getByText("Recover Password"));


            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Email"), { target: { value: "invalidemail" } });
            });

            await act(async () => {
                await fireEvent.blur(wrapper.getByLabelText("Email"));
            });

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Email"))).toHaveTextContent("This must be a valid email.");

            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Email"), { target: { value: "" } });
            });
            await act(async () => {
                await fireEvent.blur(wrapper.getByLabelText("Email"));
            });

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Email"))).toHaveTextContent("Please fill in your email.");

            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Email"), { target: { value: "valid@email.com" } });
            });
            await act(async () => {
                await fireEvent.blur(wrapper.getByLabelText("Email"));
            });

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Email"))).toHaveTextContent("");
        });

        it("Should show general error on request fail, and clear on input change", async () => {
            // Making sure that the login service denies the login
            submitPasswordRecoverRequest.mockImplementationOnce(() => {
                throw new Error();
            });


            const wrapper = renderWithStoreAndTheme(
                <SnackbarProvider maxSnack={3}>
                    <BrowserRouter>
                        <AuthModal
                            open
                            toggleAuthModal={() => {}}
                            toggleLoginPending={() => {}}
                            updateSessionInfo={() => {}}
                        />
                    </BrowserRouter>
                </SnackbarProvider>, { initialState: {}, theme }
            );

            fireEvent.click(wrapper.getByText("Recover Password"));

            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Email"), { target: { value: "asd@email.com" } });
            });
            await act(async () => {
                await fireEvent.click(wrapper.getByRole("button", { name: "Recover Password" }));
            });
            expect(await wrapper.queryByText(Constants.UNEXPECTED_ERROR_MESSAGE)).toBeInTheDocument();

            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Email"), { target: { value: "acsd@email.com" } });
            });

            expect(await wrapper.queryByText(Constants.UNEXPECTED_ERROR_MESSAGE)).not.toBeInTheDocument();
        });
    });
});

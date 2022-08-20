import React from "react";

import { submitFinishPasswordRecover } from "../../../services/auth";

import AuthModal from "./AuthModal";
import { render, fireEvent, act } from "../../../test-utils";
import Constants from "../../../utils/Constants";

jest.mock("../../../services/auth");

describe("Navbar - AuthModal", () => {
    describe("render", () => {
        it("Should not appear as default", () => {
            const wrapper = render(<AuthModal initialPage={2} />);
            const dialogTitle = wrapper.queryByRole("heading", { level: 2, name: "Recover Password" });
            expect(dialogTitle).not.toBeInTheDocument();
        });
    });
    describe("interaction", () => {
        it("Should toggle the modal visibility when clicking Cancel button", () => {

            const toggleAuthModal = jest.fn();

            const wrapper = render(<AuthModal open toggleAuthModal={toggleAuthModal} initialPage={2} />);
            const dialogTitle = wrapper.queryByRole("heading", { level: 2, name: "Recover Password" });
            expect(dialogTitle).toBeInTheDocument();

            const tokenField = wrapper.getByLabelText("Token");
            expect(tokenField).toBeInTheDocument();

            fireEvent.click(wrapper.getByText("Cancel"));

            expect(toggleAuthModal).toHaveBeenCalledTimes(1);
        });

        it("Should change to the login page when clicking Login button", () => {

            const toggleAuthModal = jest.fn();

            const wrapper = render(<AuthModal open toggleAuthModal={toggleAuthModal} initialPage={2} />);
            fireEvent.click(wrapper.getByText("Login"));

            const dialogTitle = wrapper.queryByRole("heading", { level: 2, name: "Login" });
            expect(dialogTitle).toBeInTheDocument();
        });

        it("Should request correctly and change to login page", async () => {

            // Making sure that the login service allows the login
            submitFinishPasswordRecover.mockImplementationOnce(() => true);

            const toggleAuthModal = jest.fn();
            const addSnackbar = jest.fn();

            const { getByRole, getByLabelText, queryByRole } = render(
                <AuthModal
                    open
                    toggleAuthModal={toggleAuthModal}
                    updateSessionInfo={() => {}}
                    initialPage={2}
                    addSnackbar={addSnackbar}
                />);

            await act(async () => {
                await fireEvent.change(getByLabelText("New Password"), { target: { value: "password123" } });
            });
            await act(async () => {
                await fireEvent.change(getByLabelText("Token"), { target: { value: "some-token" } });
            });
            await act(async () => {
                await fireEvent.click(getByRole("button", { name: "Recover Password" }));
            });

            const dialogTitle = queryByRole("heading", { level: 2, name: "Login" });
            expect(dialogTitle).toBeInTheDocument();

            expect(addSnackbar).toHaveBeenCalledWith(expect.objectContaining({
                message: "The password was updated",
                key: "password-updated",
            }));
        });

        it("should fail validation if invalid password", async () => {
            const wrapper = render(
                <AuthModal
                    open
                    toggleAuthModal={() => {}}
                    initialPage={2}
                    updateSessionInfo={() => {}}
                />);
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

        it("Should not allow empty token", async () => {

            const wrapper = render(
                <AuthModal
                    open
                    toggleAuthModal={() => {}}
                    initialPage={2}
                    updateSessionInfo={() => {}}
                />);

            await act(async () => {
                await fireEvent.focus(wrapper.getByLabelText("Token"));
                await fireEvent.blur(wrapper.getByLabelText("Token"));
            });

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Token"))).toHaveTextContent("Required field.");

            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Token"), { target: { value: "12345" } });
            });
            await act(async () => {
                await fireEvent.blur(wrapper.getByLabelText("Token"));
            });

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Token"))).toHaveTextContent("\u200B");
        });

        it("Should show general error on request fail, and clear on input change", async () => {
            submitFinishPasswordRecover.mockImplementationOnce(() => {
                throw new Error();
            });

            const wrapper = render(
                <AuthModal
                    open
                    toggleAuthModal={() => {}}
                    updateSessionInfo={() => {}}
                    initialPage={2}
                />);

            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("New Password"), { target: { value: "password123" } });
            });
            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Token"), { target: { value: "some-token" } });
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
            submitFinishPasswordRecover.mockImplementationOnce(() => {
                throw [{ msg: "invalid-token" }];
            });

            const wrapper = render(
                <AuthModal
                    open
                    toggleAuthModal={() => {}}
                    updateSessionInfo={() => {}}
                    initialPage={2}
                />);

            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("New Password"), { target: { value: "password123" } });
            });
            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Token"), { target: { value: "some-token" } });
            });
            await act(async () => {
                await fireEvent.click(wrapper.getByRole("button", { name: "Recover Password" }));
            });

            expect(await wrapper.queryByText("The token provided is invalid or has expired.")).toBeInTheDocument();


            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("New Password"), { target: { value: "password12" } });
            });

            expect(await wrapper.queryByText(Constants.UNEXPECTED_ERROR_MESSAGE)).not.toBeInTheDocument();
        });
    });
});

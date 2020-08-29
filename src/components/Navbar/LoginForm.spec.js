import React from "react";

import { login } from "../../services/auth";

jest.mock("../../services/auth", () => ({
    __esModule: true,
    login: jest.fn(() => Promise.resolve()),
}));

import LoginForm from "./LoginForm";
import { render, fireEvent, act, screen } from "../../test-utils";
// import { act } from "@testing-library/react";


describe("Navbar - LoginForm", () => {
    describe("render", () => {
        it("Should not appear as default", () => {
            const wrapper = render(<LoginForm />);
            const dialogTitle = wrapper.queryByRole("heading", { level: 2, name: "Login" });
            expect(dialogTitle).not.toBeInTheDocument();
        });
    });
    describe("interaction", () => {
        it("Should toggle the modal visibility when clicking Cancel button", () => {

            const toggleLoginModal = jest.fn();

            const wrapper = render(<LoginForm open toggleLoginModal={toggleLoginModal} />);
            const dialogTitle = wrapper.queryByRole("heading", { level: 2, name: "Login" });
            expect(dialogTitle).toBeInTheDocument();

            fireEvent.click(wrapper.getByText("Cancel"));

            expect(toggleLoginModal).toHaveBeenCalledTimes(1);
        });

        it("Should login correctly and toggle Modal visibility", async () => {

            // Making sure that the login service allows the login
            login.mockImplementation(() => true);

            const toggleLoginModal = jest.fn();

            const { getByRole, getByLabelText } = render(
                <LoginForm
                    open
                    toggleLoginModal={toggleLoginModal}
                    toggleLoginPending={() => {}}
                    updateSessionInfo={() => {}}
                />);

            await act(async () => {
                await fireEvent.change(getByLabelText("Email"), { target: { value: "asd@email.com" } });
            });
            await act(async () => {
                await fireEvent.change(getByLabelText("Password"), { target: { value: "asdahsdj" } });
            });
            await act(async () => {
                await fireEvent.click(getByRole("button", { name: "Login" }));
            });

            expect(toggleLoginModal).toHaveBeenCalledTimes(1);
        });

        it("Should not allow invalid email", async () => {

            const wrapper = render(
                <LoginForm
                    open
                    toggleLoginModal={() => {}}
                    toggleLoginPending={() => {}}
                    updateSessionInfo={() => {}}
                />);

            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Email"), { target: { value: "invalidemail" } });
                await fireEvent.blur(wrapper.getByLabelText("Email"));
            });

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Email"))).toHaveTextContent("This must be a valid email.");

            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Email"), { target: { value: "" } });
                await fireEvent.blur(wrapper.getByLabelText("Email"));
            });

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Email"))).toHaveTextContent("Please fill in your email.");

            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Email"), { target: { value: "valid@email.com" } });
                await fireEvent.blur(wrapper.getByLabelText("Email"));
            });

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Email"))).toHaveTextContent("");
        });

        it("Should require password", async () => {

            const wrapper = render(
                <LoginForm
                    open
                    toggleLoginModal={() => {}}
                    toggleLoginPending={() => {}}
                    updateSessionInfo={() => {}}
                />);

            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Password"), { target: { value: "" } });
                await fireEvent.blur(wrapper.getByLabelText("Password"));
            });

            expect(await wrapper.findDescriptionOf(wrapper.getByLabelText("Password"))).toHaveTextContent("Please fill in your password.");
        });

        it("Should show general error on login fail, and clear on input change", async () => {
            // Making sure that the login service denies the login
            login.mockImplementation(() => {
                throw new Error();
            });

            // const toggleLoginModal = jest.fn();

            const wrapper = render(
                <LoginForm
                    open
                    toggleLoginModal={() => {}}
                    toggleLoginPending={() => {}}
                    updateSessionInfo={() => {}}
                />);

            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Email"), { target: { value: "asd@email.com" } });
            });
            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Password"), { target: { value: "asdahsdj" } });
            });
            await act(async () => {
                await fireEvent.click(wrapper.getByRole("button", { name: "Login" }));
            });
            expect(await wrapper.queryByText("Unexpected Error. Please try again later.")).toBeInTheDocument();

            await act(async () => {
                await fireEvent.change(wrapper.getByLabelText("Email"), { target: { value: "acsd@email.com" } });

            });

            expect(await wrapper.queryByText("Unexpected Error. Please try again later.")).not.toBeInTheDocument();
        });
    });
});

import React from "react";
import { renderWithStoreAndTheme } from "../../test-utils";

import Navbar from ".";

import useSession from "../../hooks/useSession";
import { act, fireEvent } from "@testing-library/react";
import { createTheme } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import ProductDescription from "../HomePage/ProductPlacementArea/ProductDescription";
import { logout } from "../../services/auth";

jest.mock("../../services/auth");

jest.mock("../../hooks/useSession");

describe("Navbar", () => {
    const theme = createTheme({});
    describe("render", () => {

        it("Should not render anything if logged out", () => {

            useSession.mockImplementation(() => ({ isLoggedIn: false }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>,
                { initialState: {}, theme }
            );

            expect(wrapper.queryByRole("button", { name: "Account" })).not.toBeInTheDocument();
        });

        it("Should render account button if logged in", () => {

            useSession.mockImplementation(() => ({ isLoggedIn: true }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>,
                { initialState: {}, theme }
            );

            expect(wrapper.getByRole("button", { name: "Account" })).toBeInTheDocument();
        });

        it("Should show finish registration badge if the company hasn't done it already", async () => {

            useSession.mockImplementation(() => ({
                isLoggedIn: true,
                data: { email: "email@email.com", company: { hasFinishedRegistration: false } },
            }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>,
                { initialState: {}, theme }
            );

            await act(async () => {
                await fireEvent.click(wrapper.getByTestId("usermenu-button-wrapper"));
            });

            expect(wrapper.queryByTestId("finish-registration-badge")).toBeInTheDocument();
        });

        it("Should not show finish registration badge to an admin", async () => {

            useSession.mockImplementation(() => ({
                isLoggedIn: true,
                data: { email: "email@email.com", isAdmin: true },
            }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>,
                { initialState: {}, theme }
            );

            await act(async () => {
                await fireEvent.click(wrapper.getByTestId("usermenu-button-wrapper"));
            });

            expect(wrapper.queryByTestId("finish-registration-badge")).not.toBeInTheDocument();
        });
    });

    describe("interaction", () => {

        it("Should open user menu on account button click", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>,
                { initialState: {}, theme }
            );

            await act(async () => {
                await fireEvent.click(wrapper.getByTestId("usermenu-button-wrapper"));
            });

            const menu = wrapper.queryByTestId("menu-popover");
            expect(menu).toBeInTheDocument();
        });

        it("Should hide user menu when logged out ", async () => {

            useSession.mockImplementation(() => ({
                isLoggedIn: true,
                reset: () => Promise.resolve(),
                revalidate: () => {},
                data: { email: "email" },
            }));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <Navbar />
                    {/* Using ProductDescription here since it holds the login button, if it ever changes, please fix me */}
                    <ProductDescription />
                </BrowserRouter>,
                { initialState: {}, theme }
            );

            expect(wrapper.queryByText("Account")).toBeInTheDocument();
            await fireEvent.click(wrapper.getByTestId("usermenu-button-wrapper"));

            // Ensure that it does log out, without actually calling API
            logout.mockImplementationOnce(() => Promise.resolve(true));

            useSession.mockImplementation(() => ({ isLoggedIn: false, reset: () => {}, revalidate: () => {}, data: null }));
            await fireEvent.click(wrapper.getByText("Logout"));

            expect(wrapper.queryByText("Account")).not.toBeInTheDocument();
        });
    });
});

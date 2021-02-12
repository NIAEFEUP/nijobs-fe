import React from "react";
import { renderWithStoreAndTheme } from "../../test-utils";

import Navbar from ".";

import useSession from "../../hooks/useSession";
import { createStore, compose, applyMiddleware } from "redux";
import reducer from "../../reducers";
import thunk from "redux-thunk";
import { act, fireEvent } from "@testing-library/react";
import { createMuiTheme } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import ProductDescription from "../HomePage/ProductPlacementArea/ProductDescription";
import { logout } from "../../services/auth";

jest.mock("../../services/auth");

jest.mock("../../hooks/useSession");

describe("Navbar", () => {
    const theme = createMuiTheme({});
    describe("render", () => {

        it("Should not render anything if logged out", () => {

            useSession.mockImplementation(() => ({ isLoggedIn: false }));

            const store = createStore(reducer, {}, compose(applyMiddleware(thunk)));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>, { store, theme });

            expect(wrapper.queryByRole("button", { name: "Account" })).not.toBeInTheDocument();
        });

        it("Should render account button if logged in", () => {

            useSession.mockImplementation(() => ({ isLoggedIn: true }));

            const store = createStore(reducer, {}, compose(applyMiddleware(thunk)));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>, { store, theme });

            expect(wrapper.getByRole("button", { name: "Account" })).toBeInTheDocument();
        });
    });

    describe("interaction", () => {
        it("Should open user menu on account button click", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true }));

            const store = createStore(reducer, {}, compose(applyMiddleware(thunk)));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>,
                { store, theme }
            );

            await act(async () => {
                await fireEvent.click(wrapper.getByTestId("usermenu-button-wrapper"));
            });

            const menu = wrapper.queryByTestId("menu-popover");
            expect(menu).toBeInTheDocument();
        });

        it("Should hide user menu when logged out ", async () => {

            useSession.mockImplementation(() => ({ isLoggedIn: true, reset: () => {}, revalidate: () => {}, data: { email: "email" } }));

            const store = createStore(reducer, {}, compose(applyMiddleware(thunk)));

            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <Navbar />
                    {/* Using ProductDescription here since it holds the login button, if it ever changes, please fix me */}
                    <ProductDescription />
                </BrowserRouter>,
                { store, theme }
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

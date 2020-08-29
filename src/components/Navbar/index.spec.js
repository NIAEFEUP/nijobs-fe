import React from "react";
import { renderWithStore } from "../../test-utils";

import Navbar from ".";

import useSession from "../../hooks/useSession";
import { createStore, compose, applyMiddleware } from "redux";
import reducer from "../../reducers";
import thunk from "redux-thunk";
import { act, fireEvent } from "@testing-library/react";

jest.mock("../../hooks/useSession");

describe("Navbar", () => {
    describe("render", () => {

        it("Should not render anything if logged out", () => {

            useSession.mockImplementation(() => ({ isLoggedIn: false }));

            const store = createStore(reducer, {}, compose(applyMiddleware(thunk)));

            const wrapper = renderWithStore(<Navbar />, { store });

            expect(wrapper.queryByRole("button", { name: "Account" })).not.toBeInTheDocument();
        });

        it("Should render account button if logged in", () => {

            useSession.mockImplementation(() => ({ isLoggedIn: true }));

            const store = createStore(reducer, {}, compose(applyMiddleware(thunk)));

            const wrapper = renderWithStore(<Navbar />, { store });

            expect(wrapper.getByRole("button", { name: "Account" })).toBeInTheDocument();
        });
    });

    describe("interaction", () => {
        it("Should open user menu on account button click", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true }));

            const store = createStore(reducer, {}, compose(applyMiddleware(thunk)));

            const wrapper = renderWithStore(<Navbar />, { store });

            await act(async () => {
                await fireEvent.click(wrapper.getByTestId("usermenu-button-wrapper"));
            });

            const menu = wrapper.queryByTestId("menu-popover");
            expect(menu).toBeInTheDocument();
        });
    });
});

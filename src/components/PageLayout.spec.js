import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers";
import thunk from "redux-thunk";
import { renderWithStoreAndTheme } from "../test-utils";

import AppTheme from "../AppTheme";
import PageLayout from "./PageLayout";
import { BrowserRouter } from "react-router-dom";

describe("PageLayout", () => {
    const store = createStore(reducer, {}, compose(applyMiddleware(thunk)));
    const theme = AppTheme;
    describe("render", () => {
        it("Should render ContactSection", () => {
            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <PageLayout />
                </BrowserRouter>, { store, theme });
            expect(wrapper.getByTestId("contactSection")).not.toBeNull();
        });
        it("Should render Navbar", () => {
            const wrapper = renderWithStoreAndTheme(
                <BrowserRouter>
                    <PageLayout />
                </BrowserRouter>, { store, theme });
            expect(wrapper.getByTestId("navbar")).not.toBeNull();
        });

    });
});

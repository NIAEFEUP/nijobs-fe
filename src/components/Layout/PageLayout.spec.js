import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import reducer from "../../reducers";

import { renderWithStoreAndTheme, screen } from "../../test-utils";
import AppTheme from "../../AppTheme";
import PageLayout from "./PageLayout";
import { createMatchMedia } from "../../utils/media-queries";


describe("PageLayout", () => {
    const store = createStore(reducer, {}, compose(applyMiddleware(thunk)));
    const theme = AppTheme;
    describe("render", () => {
        it("Should render ContactSection", () => {
            renderWithStoreAndTheme(
                <BrowserRouter>
                    <PageLayout />
                </BrowserRouter>, { store, theme });
            expect(screen.getByTestId("contactSection")).not.toBeNull();
        });
        it("Should render Navbar", () => {
            renderWithStoreAndTheme(
                <BrowserRouter>
                    <PageLayout />
                </BrowserRouter>, { store, theme });
            expect(screen.getByTestId("navbar")).not.toBeNull();
        });

        it("Should render pageTitle in mobile", () => {
            const MOBILE_WIDTH = 360;
            window.matchMedia = createMatchMedia(MOBILE_WIDTH);
            renderWithStoreAndTheme(
                <BrowserRouter>
                    <PageLayout pageTitle="test123" />
                </BrowserRouter>, { store, theme });
            expect(screen.getByText("test123")).toBeInTheDocument();
        });
    });
});

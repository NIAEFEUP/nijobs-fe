import React from "react";

import { renderWithStoreAndTheme, fireEvent, act, screen } from "../../../../test-utils";
import AppTheme from "../../../../AppTheme";
import { addSnackbar } from "../../../../actions/notificationActions";

import SearchUrlWidget from "./SearchURLWidget";

jest.mock("../../../../actions/notificationActions");

const writeText = jest.fn();

Object.defineProperty(navigator, "clipboard", {
    value: {
        writeText,
    },
});

describe("Search URL Widget", () => {

    describe("render", () => {
        it("Should render the current URL", () => {

            const testString = "test-url";

            global.window = Object.create(window);
            Object.defineProperty(window, "location", {
                value: {
                    href: testString,
                },
                writable: true,
            });

            renderWithStoreAndTheme(<SearchUrlWidget />, { initialState: {}, theme: AppTheme });

            expect(screen.getByText(testString)).toBeInTheDocument();
        });
    });

    describe("interaction", () => {

        beforeEach(() => {
            addSnackbar.mockClear();
        });

        it("Should copy URL to clipboard", () => {

            addSnackbar.mockImplementationOnce(() => ({ type: "" }));

            const testString = "test-string";

            global.window = Object.create(window);
            Object.defineProperty(window, "location", {
                value: {
                    href: testString,
                },
                writable: true,
            });

            renderWithStoreAndTheme(<SearchUrlWidget />, { initialState: {}, theme: AppTheme });

            act(() => {
                fireEvent.click(screen.getByRole("button"));
            });

            expect(writeText).toHaveBeenCalledTimes(1);
            expect(writeText).toHaveBeenCalledWith(testString);
        });

        it("Should create a snackbar once URL is copied", () => {

            addSnackbar.mockImplementation(jest.requireActual("../../../../actions/notificationActions").addSnackbar);

            renderWithStoreAndTheme(<SearchUrlWidget />, { initialState: {}, theme: AppTheme });

            act(() => {
                fireEvent.click(screen.getByRole("button"));
            });

            expect(addSnackbar).toHaveBeenCalledTimes(1);
        });
    });

});

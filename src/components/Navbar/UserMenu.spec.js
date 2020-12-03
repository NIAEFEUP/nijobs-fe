import React from "react";

import { logout } from "../../services/auth";

jest.mock("../../services/auth");

import UserMenu from "./UserMenu";
import { renderWithTheme } from "../../test-utils";
import { act, fireEvent } from "@testing-library/react";
import { createMuiTheme } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";

describe("Navbar - LoginForm", () => {
    const theme = createMuiTheme({});
    describe("render", () => {
        it("Should not appear as default", () => {
            const mockAnchor = { current: <div /> };
            const wrapper = renderWithTheme(<UserMenu anchorRef={mockAnchor}/>, { theme });
            const menu = wrapper.queryByTestId("menu-popover");
            expect(menu).not.toBeInTheDocument();
        });

        it("Should show the email from current session", () => {
            const mockAnchor = { current: <div /> };
            const wrapper = renderWithTheme(
                <BrowserRouter>
                    <UserMenu
                        open
                        anchorRef={mockAnchor}
                        sessionData={{ email: "test-email" }}
                    />
                </BrowserRouter>,
                { theme });
            expect(wrapper.queryByText("test-email")).toBeInTheDocument();
        });
    });
    describe("interaction", () => {
        it("Should log out, re-setting the session and call close callback", async () => {
            // Ensure that it does log out, without calling API
            logout.mockImplementationOnce(() => Promise.resolve(true));

            const resetSession = jest.fn();
            const handleClose = jest.fn();
            const mockAnchor = { current: <div /> };
            const wrapper = renderWithTheme(
                <BrowserRouter>
                    <UserMenu
                        open
                        anchorRef={mockAnchor}
                        sessionData={{ email: "test-email" }}
                        resetSession={resetSession}
                        handleClose={handleClose}
                    />
                </BrowserRouter>,
                { theme }
            );

            await act(async () => {
                await fireEvent.click(wrapper.getByText("Logout"));
            });

            expect(logout).toHaveBeenCalledTimes(1);
            expect(resetSession).toHaveBeenCalledTimes(1);
            expect(handleClose).toHaveBeenCalledTimes(1);
        });
    });
});

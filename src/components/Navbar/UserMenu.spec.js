import React from "react";

import { logout } from "../../services/auth";

jest.mock("../../services/auth");

import UserMenu from "./UserMenu";
import { render } from "../../test-utils";
import { act, fireEvent } from "@testing-library/react";

describe("Navbar - LoginForm", () => {
    describe("render", () => {
        it("Should not appear as default", () => {
            const mockAnchor = { current: <div /> };
            const wrapper = render(<UserMenu anchorRef={mockAnchor}/>);
            const menu = wrapper.queryByTestId("menu-popover");
            expect(menu).not.toBeInTheDocument();
        });

        it("Should show the email from current session", () => {
            const mockAnchor = { current: <div /> };
            const wrapper = render(<UserMenu open anchorRef={mockAnchor} sessionData={{ email: "test-email" }}/>);
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
            const wrapper = render(
                <UserMenu
                    open
                    anchorRef={mockAnchor}
                    sessionData={{ email: "test-email" }}
                    resetSession={resetSession}
                    handleClose={handleClose}
                />
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

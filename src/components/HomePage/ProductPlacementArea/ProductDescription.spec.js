import React from "react";
import { ProductDescription } from "./ProductDescription";
import { createMuiTheme } from "@material-ui/core";
import { act, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import useSession from "../../../hooks/useSession";
import { renderWithTheme, screen } from "../../../test-utils";

jest.mock("../../../hooks/useSession");

const theme = createMuiTheme({});

describe("ProductDescription", () => {

    const toggleLoginModalMock = jest.fn();

    describe("render", () => {
        it("should render login and join us buttons when nobody is logged in", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: false }));

            renderWithTheme(
                <Router>
                    <ProductDescription toggleLoginModal={toggleLoginModalMock} />
                </Router>,
                { theme }
            );

            expect(screen.getByText("Login")).toBeInTheDocument();
            expect(screen.getByText("Join Us")).toBeInTheDocument();
        });

        it("should only render join us button when an admin is logged in", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { email: "admin@admin.com", isAdmin: true } }));

            renderWithTheme(
                <Router>
                    <ProductDescription toggleLoginModal={toggleLoginModalMock} />
                </Router>,
                { theme }
            );

            expect(screen.queryByText("Login")).not.toBeInTheDocument();
            expect(screen.getByText("Join Us")).toBeInTheDocument();
        });

        it("should render create offer button when a company is logged in", () => {
            useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));

            renderWithTheme(
                <Router>
                    <ProductDescription toggleLoginModal={toggleLoginModalMock} />
                </Router>,
                { theme }
            );

            expect(screen.queryByText("Login")).not.toBeInTheDocument();
            expect(screen.queryByText("Join Us")).not.toBeInTheDocument();
            expect(screen.getByText("Create Offer")).toBeInTheDocument();
        });
    });

    describe("interaction", () => {
        it("should open login modal", async () => {
            useSession.mockImplementation(() => ({ isLoggedIn: false }));

            renderWithTheme(
                <Router>
                    <ProductDescription toggleLoginModal={toggleLoginModalMock} />
                </Router>,
                { theme }
            );

            expect(screen.getByText("Login")).toBeInTheDocument();

            await act(async () => {
                await fireEvent.click(screen.getByText("Login"));
            });

            expect(toggleLoginModalMock).toHaveBeenCalledTimes(1);
        });
    });
});

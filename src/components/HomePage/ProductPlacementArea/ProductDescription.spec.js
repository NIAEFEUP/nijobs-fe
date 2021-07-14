import React from "react";
import { ProductDescription } from "./ProductDescription";
import { createMuiTheme } from "@material-ui/core";
import { act, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import useSession from "../../../hooks/useSession";
import { renderWithTheme } from "../../../test-utils";

jest.mock("../../../hooks/useSession");

const theme = createMuiTheme({});

describe("<ProductDescription /> interaction", () => {

    it("should open login modal", async () => {
        const toggleLoginModalMock = jest.fn();
        useSession.mockImplementation(() => ({ isLoggedIn: false }));

        const wrapper = renderWithTheme(
            <Router>
                <ProductDescription toggleLoginModal={toggleLoginModalMock} />
            </Router>,
            { theme }
        );

        expect(wrapper.getByText("Login")).toBeInTheDocument();

        await act(async () => {
            await fireEvent.click(wrapper.getByText("Login"));
        });

        expect(toggleLoginModalMock).toHaveBeenCalledTimes(1);

    });

});

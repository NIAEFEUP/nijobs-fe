import React from "react";
import { createMuiTheme } from "@material-ui/core";

import { renderWithTheme } from "../test-utils";
import ErrorPage from "./ErrorPage";

const theme = createMuiTheme({});

describe("NotFound page", () => {
    it("should render successfully", () => {
        const wrapper = renderWithTheme(
            <ErrorPage />,
            { theme }
        );
        expect(wrapper.queryByText("Unexpected error")).toBeInTheDocument();
        expect(wrapper.queryByText("Something unexpected prevented us from fulfilling your request.")).toBeInTheDocument();
        expect(wrapper.queryByText("Please try again later, and if the problem persists, contact us at ni@aefeup.pt")).toBeInTheDocument();
    });
});

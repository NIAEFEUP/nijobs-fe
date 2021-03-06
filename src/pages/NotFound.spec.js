import React from "react";
import { createMuiTheme } from "@material-ui/core";

import ErrorComponent from "../components/Errors/ErrorComponent";
import { renderWithTheme } from "../test-utils";

const theme = createMuiTheme({});

describe("NotFound page", () => {
    it("should render successfully", () => {
        const errorMessage = "Sorry, no page could be found at this address (404)";
        const wrapper = renderWithTheme(
            <ErrorComponent message={errorMessage} />,
            { theme }
        );
        expect(wrapper.queryByText(errorMessage)).toBeInTheDocument();
    });
});

import React from "react";
import { createMuiTheme } from "@material-ui/core";

import { renderWithTheme } from "../test-utils";
import NotFound from "./NotFound";

const theme = createMuiTheme({});

describe("NotFound page", () => {
    it("should render successfully", () => {
        const wrapper = renderWithTheme(
            <NotFound />,
            { theme }
        );
        expect(wrapper.queryByText("Page not found")).toBeInTheDocument();
        expect(wrapper.queryByText("Sorry, no page could be found at this address (404)")).toBeInTheDocument();
    });
});

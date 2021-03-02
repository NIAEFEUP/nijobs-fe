import React from "react";
import { createMuiTheme } from "@material-ui/core";

import ErrorComponent from "../components/Errors/ErrorComponent";
import { mountWithTheme } from "../test-utils";

const theme = createMuiTheme({});

describe("NotFound page", () => {
    it("should render successfully", () => {
        const notFoundPage = mountWithTheme(
            <ErrorComponent Message={"Sorry, no page could be found at this address (404)"}/>,
            theme
        ).find(ErrorComponent).first();
        expect(notFoundPage.exists()).toBe(true);
    });
});

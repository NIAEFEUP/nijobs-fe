import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppTheme from "../AppTheme";
import { render } from "../test-utils";
import { ThemeProvider } from "@material-ui/core";
import TermsAndConditionsPage from "./TermsAndConditionsPage";

describe("Terms and Conditions Page", () => {
    it("Should show Terms and Conditions text", () => {
        const wrapper = render(
            <BrowserRouter>
                <ThemeProvider theme={AppTheme}>
                    <TermsAndConditionsPage />
                </ThemeProvider>
            </BrowserRouter>
        );
        expect(wrapper.getByText("Links to Other Websites")).toBeInTheDocument();
    });
});

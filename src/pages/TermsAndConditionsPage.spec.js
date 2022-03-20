import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppTheme from "../AppTheme";
import { render } from "../test-utils";
import { ThemeProvider } from "@material-ui/core";
import TermsAndConditionsPage from "./TermsAndConditionsPage";
import { createMatchMedia } from "../utils/media-queries";

describe("Terms and Conditions Page", () => {
    it("should show Terms and Conditions text", () => {
        const wrapper = render(
            <BrowserRouter>
                <ThemeProvider theme={AppTheme}>
                    <TermsAndConditionsPage />
                </ThemeProvider>
            </BrowserRouter>
        );
        expect(wrapper.queryByText("Links to Other Websites")).toBeInTheDocument();
    });
});

describe("Terms and Conditions Page", () => {
    it("should show Terms and Conditions page text in mobile", () => {
        const MOBILE_WIDTH_PX = 360;
        window.matchMedia = createMatchMedia(MOBILE_WIDTH_PX);
        const wrapper = render(
            <BrowserRouter>
                <ThemeProvider theme={AppTheme}>
                    <TermsAndConditionsPage />
                </ThemeProvider>
            </BrowserRouter>
        );
        expect(wrapper.queryByText("Links to Other Websites")).toBeInTheDocument();
    });
});

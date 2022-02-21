import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppTheme from "../AppTheme";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import { render } from "../test-utils";
import { ThemeProvider } from "@material-ui/core";

describe("Privacy Policy Page", () => {
    it("Should show Privacy Policy text", () => {
        const wrapper = render(
            <BrowserRouter>
                <ThemeProvider theme={AppTheme}>
                    <PrivacyPolicyPage />
                </ThemeProvider>
            </BrowserRouter>
        );
        expect(wrapper.getByText("Privacy Policy")).toBeInTheDocument();
    });
});

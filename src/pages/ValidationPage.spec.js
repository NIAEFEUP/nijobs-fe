import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppTheme from "../AppTheme";
import { render } from "../test-utils";
import { ThemeProvider } from "@material-ui/core";
import { validateApplication } from "../services/companyApplicationService";
import ValidationPage from "./ValidationPage";
import { getValidationMessage } from "../components/Apply/Company/CompanyApplicationUtils.js";


jest.mock("../services/companyApplicationService.js");
jest.mock("react-router-dom", () => {
    const original = jest.requireActual("react-router-dom");
    return {
        ...original,
        useParams: jest.fn().mockReturnValue({ token: "test123" }),
    };
});


describe("Validation Page", () => {
    it("Should show success message if succeeded to validate", async () => {
        validateApplication.mockImplementation(() => true);

        const page = await render(
            <BrowserRouter>
                <ThemeProvider theme={AppTheme}>
                    <ValidationPage></ValidationPage>
                </ThemeProvider>
            </BrowserRouter>,
        );

        const {title, text} = getValidationMessage("success");

        expect(page.queryByText(title)).toBeInTheDocument();
    });

    it("Should show error message if token does not exist", async () => {
        validateApplication.mockImplementation(() =>{ throw [{ msg: "invalid-token" }]});
        const page = await render(
            <BrowserRouter>
                <ThemeProvider theme={AppTheme}>
                    <ValidationPage></ValidationPage>
                </ThemeProvider>
            </BrowserRouter>,
        );
        const {title, text} = getValidationMessage("invalid-token");
        expect(page.queryByText(title)).toBeInTheDocument();
    });

    it("Should show error message if token has expired", async () => {
        validateApplication.mockImplementation(() =>{ throw [{ msg: "expired-token" }]});
        const page = await render(
            <BrowserRouter>
                <ThemeProvider theme={AppTheme}>
                    <ValidationPage></ValidationPage>
                </ThemeProvider>
            </BrowserRouter>,
        );
        const {title, text} = getValidationMessage("expired-token");
        expect(page.queryByText(title)).toBeInTheDocument();
    });

    it("Should show error message if application is already validated", async () => {
        validateApplication.mockImplementation(() =>{ throw [{ msg: "application-already-validated" }]});
        const page = await render(
            <BrowserRouter>
                <ThemeProvider theme={AppTheme}>
                    <ValidationPage></ValidationPage>
                </ThemeProvider>
            </BrowserRouter>,
        );
        const {title, text} = getValidationMessage("application-already-validated");
        expect(page.queryByText(title)).toBeInTheDocument();
    });
});


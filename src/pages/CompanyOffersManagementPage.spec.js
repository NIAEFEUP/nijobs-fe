import React from "react";
import { createTheme } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { renderWithStoreAndTheme, screen } from "../test-utils";
import useSession from "../hooks/useSession";
import { fetchCompanyApplication } from "../services/companyService";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CompanyOffersManagementPage from "./CompanyOffersManagementPage";

jest.mock("../hooks/useSession");
jest.mock("../services/offerService");
jest.mock("../services/companyService");
const theme = createTheme({});

// eslint-disable-next-line react/prop-types

describe("Company Offers Management Page", () => {

    it("Should render alert if company is not approved", async () => {
        useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));
        // eslint-disable-next-line require-await
        fetchCompanyApplication.mockImplementation(async () => ({ state: "PENDING" }));

        await renderWithStoreAndTheme(
            <BrowserRouter>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <CompanyOffersManagementPage />
                </MuiPickersUtilsProvider>
            </BrowserRouter>,
            { initialState: {}, theme }
        );
        expect(screen.queryByTestId("Alert")).toBeInTheDocument();

    });

    it("Should not render alert if company is approved", async () => {
        useSession.mockImplementation(() => ({ isLoggedIn: true, data: { company: { name: "Company Name" } } }));
        // eslint-disable-next-line require-await
        fetchCompanyApplication.mockImplementation(async () => ({ state: "APPROVED" }));

        await renderWithStoreAndTheme(
            <BrowserRouter>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <CompanyOffersManagementPage />
                </MuiPickersUtilsProvider>
            </BrowserRouter>,
            { initialState: {}, theme }
        );
        expect(screen.queryByTestId("Alert")).not.toBeInTheDocument();
    });
});

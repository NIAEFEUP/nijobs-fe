import React from "react";
import { screen, waitFor } from "@testing-library/react";

import CompanyOffersManagementWidget from "./CompanyOffersManagementWidget";
import { renderWithStoreAndTheme } from "../../../../test-utils";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import * as companyOffersService from "../../../../services/companyOffersService";
import useSession from "../../../../hooks/useSession";
import { BrowserRouter } from "react-router-dom";
import { addSnackbar } from "../../../../actions/notificationActions";
import { createMatchMedia } from "../../../../utils/media-queries";
import { columns } from "./CompanyOffersManagementSchema";
import { createTheme } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Notifier from "../../../Notifications/Notifier";

jest.mock("../../../../hooks/useSession");
jest.mock("../../../../services/companyOffersService");
jest.mock("../../../../actions/notificationActions");

describe("App", () => {
    const theme = createTheme({});

    const MOCK_OFFERS = [
        {
            _id: "random uuid4",
            owner: "company_id",
            title: "Guy in the background",
            ownerName: "Reddit",
            ownerLogo: "logo.com",
            location: "Porto",
            publishDate: "2019-06",
            publishEndDate: "2020-09",
            description: "kek",
        },
        {
            _id: "random uuid5",
            owner: "company_id",
            title: "Guy in the background",
            ownerName: "Reddit",
            ownerLogo: "logo.com",
            location: "Porto",
            publishDate: "2019-06",
            publishEndDate: "2020-09",
            description: "kek",
        },
    ];

    beforeEach(() => {
        useSession.mockReturnValue({ data: { company: { name: "company1", _id: "company_id" } }, isLoggedIn: true });
    });

    it("Renders Loading", () => {
        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() => new Promise(() => {}));

        renderWithStoreAndTheme(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CompanyOffersManagementWidget />
            </MuiPickersUtilsProvider>, { initialState: {}, theme }
        );

        // Use getBy by default when element should be available
        for (let i = 0; i < 5; i++) {
            expect(screen.getByTestId(`tableCellSkeleton-${i}`)).toBeInTheDocument();
        }

        // Use queryBy When asserting for missing element
        expect(screen.getByText("Offers Management")).toBeInTheDocument();
    });

    it("Loads Valid Offers", async () => {
        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() =>  new Promise((resolve) =>
            resolve(MOCK_OFFERS)
        ));

        // By waiting for act it executes all the async code at once
        // Need to wrap with BrowserRouter since there is a Link inside
        renderWithStoreAndTheme(
            <BrowserRouter>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <CompanyOffersManagementWidget />
                </MuiPickersUtilsProvider>
            </BrowserRouter>, { initialState: {}, theme }
        );

        // wait for the wrapped assertions to pass within a certain timeout window (wait for all updates to complete)
        await waitFor(() => {
            expect(screen.getByText("Offers Management")).toBeInTheDocument();
            expect(screen.getAllByText("Guy in the background")).toHaveLength(2);
        }, {
            timeout: 1000,
        });
    });

    it("Loads Empty Offers", async () => {
        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() =>  new Promise((resolve) =>
            resolve([])
        ));
        // By waiting for act it executes all the async code at once
        renderWithStoreAndTheme(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CompanyOffersManagementWidget />
            </MuiPickersUtilsProvider>, { initialState: {}, theme }
        );

        await waitFor(() => {
            expect(screen.getByText("Offers Management")).toBeInTheDocument();

            expect(screen.getByText("No offers here.")).toBeInTheDocument();
        }, {
            timeout: 1000,
        });
    });

    it("Error fetching offers", async () => {
        addSnackbar.mockImplementationOnce(() => ({ type: "" }));

        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() => new Promise((resolve, reject) =>
            reject([{ msg: "Error fetching offers" }])
        ));

        // By waiting for act it executes all the async code at once
        renderWithStoreAndTheme(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CompanyOffersManagementWidget />
            </MuiPickersUtilsProvider>, { initialState: {}, theme }
        );

        await waitFor(() => {
            expect(screen.getByText("Offers Management")).toBeInTheDocument();

            expect(screen.getByText("No offers here.")).toBeInTheDocument();

            expect(addSnackbar).toHaveBeenCalledTimes(1);
        }, {
            timeout: 1000,
        });
    });

    it("Should only render mobile columns on mobile device", async () => {
        addSnackbar.mockImplementationOnce(() => ({ type: "" }));

        const MOBILE_WIDTH_PX = 360;
        window.matchMedia = createMatchMedia(MOBILE_WIDTH_PX);

        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() =>  new Promise((resolve) =>
            resolve(MOCK_OFFERS)
        ));

        renderWithStoreAndTheme(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <SnackbarProvider maxSnack={3}>
                    <Notifier />
                    <CompanyOffersManagementWidget isMobile={true} />
                </SnackbarProvider>
            </MuiPickersUtilsProvider>, { initialState: {}, theme }
        );

        const mobileCols = ["title", "publishStartDate", "actions"];
        await waitFor(() => {
            for (const [col, val] of Object.entries(columns)) {
                if (mobileCols.includes(col)) {
                    expect(screen.getByRole("button", { name: val.label })).toBeInTheDocument();
                } else {
                    expect(screen.queryByRole("button", { name: val.label })).not.toBeInTheDocument();
                }
            }
        }, {
            timeout: 1000,
        });
    });
});

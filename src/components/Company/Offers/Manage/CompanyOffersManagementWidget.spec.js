import React from "react";
import { screen, waitFor } from "@testing-library/react";

import CompanyOffersManagementWidget from "./CompanyOffersManagementWidget";
import { renderWithStore } from "../../../../test-utils";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import * as companyOffersService from "../../../../services/companyOffersService";
import useSession from "../../../../hooks/useSession";
import { BrowserRouter } from "react-router-dom";
import { addSnackbar } from "../../../../actions/notificationActions";

jest.mock("../../../../hooks/useSession");
jest.mock("../../../../services/companyOffersService");
jest.mock("../../../../actions/notificationActions");

describe("App", () => {
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

    test("Renders Loading", () => {
        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() => new Promise(() => {}));

        renderWithStore(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CompanyOffersManagementWidget />
            </MuiPickersUtilsProvider>
        );

        // Use getBy by default when element should be available
        for (let i = 0; i < 5; i++) {
            expect(screen.getByTestId(`tableCellSkeleton-${i}`)).toBeInTheDocument();
        }

        // Use queryBy When asserting for missing element
        expect(screen.getByText("Offers Management")).toBeInTheDocument();
    });

    test("Loads Valid Offers", async () => {
        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() =>  new Promise((resolve) =>
            resolve(MOCK_OFFERS)
        ));

        // By waiting for act it executes all the async code at once
        // Need to wrap with BrowserRouter since I have a Link inside
        renderWithStore(
            <BrowserRouter>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <CompanyOffersManagementWidget />
                </MuiPickersUtilsProvider>
            </BrowserRouter>
        );

        // wait for the wrapped assertions to pass within a certain timeout window (wait for all updates to complete)
        await waitFor(() => {
            expect(screen.getByText("Offers Management")).toBeInTheDocument();
            expect(screen.getAllByText("Guy in the background")).toHaveLength(2);
        }, {
            timeout: 1000,
        });
    });

    test("Loads Empty Offers", async () => {
        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() =>  new Promise((resolve) =>
            resolve([])
        ));
        // By waiting for act it executes all the async code at once
        renderWithStore(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CompanyOffersManagementWidget />
            </MuiPickersUtilsProvider>
        );

        await waitFor(() => {
            expect(screen.getByText("Offers Management")).toBeInTheDocument();

            expect(screen.getByText("No offers here.")).toBeInTheDocument();
        }, {
            timeout: 1000,
        });
    });

    test("Error fetching offers", async () => {
        addSnackbar.mockImplementationOnce(() => ({ type: "" }));

        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() => new Promise((resolve, reject) =>
            reject([{ msg: "Error fetching offers" }])
        ));

        // By waiting for act it executes all the async code at once
        renderWithStore(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CompanyOffersManagementWidget />
            </MuiPickersUtilsProvider>
        );

        await waitFor(() => {
            expect(screen.getByText("Offers Management")).toBeInTheDocument();

            expect(screen.getByText("No offers here.")).toBeInTheDocument();

            expect(addSnackbar).toHaveBeenCalledTimes(1);

            // expect(screen.getByText("An unexpected error occurred, please try refreshing the browser window.")).toBeInTheDocument();
        }, {
            timeout: 1000,
        });
    });
});

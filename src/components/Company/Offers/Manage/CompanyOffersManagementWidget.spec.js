import React from "react";
import { screen, waitFor } from "@testing-library/react";

import CompanyOffersManagementWidget from "./CompanyOffersManagementWidget";
import { renderWithStore } from "../../../../test-utils";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import * as companyOffersService from "../../../../services/companyOffersService";
// import { fetchCompanyOffers } from "../../../../services/companyOffersService";

describe("App", () => {
    const MOCK_OFFERS = [
        {
            id: "random uuid4",
            title: "Guy in the background",
            company: {
                name: "Reddit",
                logo: "logo.com",
            },
            location: "Porto",
            date: "2019-06",
            description: "kek",
        },
        {
            id: "random uuid5",
            title: "Guy in the background",
            company: {
                name: "Reddit",
                logo: "logo.com",
            },
            location: "Porto",
            date: "2019-06",
            description: "kek",
        },
    ];

    test("Renders Loading", () => {
        renderWithStore(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CompanyOffersManagementWidget />
            </MuiPickersUtilsProvider>
        );

        // Use getBy by default when element should be available
        expect(screen.getByText("Loading...")).toBeInTheDocument();

        // Use queryBy When asserting for missing element
        expect(screen.queryByText("Offers Management")).not.toBeInTheDocument();
    });

    test("Loads Valid Offers", async () => {
        companyOffersService.fetchCompanyOffers = jest.fn(() =>  Promise.resolve(MOCK_OFFERS));

        // By waiting for act it executes all the async code at once
        renderWithStore(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CompanyOffersManagementWidget />
            </MuiPickersUtilsProvider>
        );

        // wait for the wrapped assertions to pass within a certain timeout window (wait for all updates to complete)
        await waitFor(() => {
            expect(screen.getByText("Offers Management")).toBeInTheDocument();
            expect(screen.getAllByText("Guy in the background")).toHaveLength(2);
        });
    });

    test("Loads Empty Offers", async () => {
        companyOffersService.fetchCompanyOffers = jest.fn(() =>  Promise.resolve([]));

        // By waiting for act it executes all the async code at once
        renderWithStore(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CompanyOffersManagementWidget />
            </MuiPickersUtilsProvider>
        );

        await waitFor(() => {
            expect(screen.getByText("Offers Management")).toBeInTheDocument();
        });
    });

    test("Error fetching offers", async () => {
        companyOffersService.fetchCompanyOffers = jest.fn(() => new Promise(() => {
            throw "Error fetching offers";
        }));

        // By waiting for act it executes all the async code at once
        renderWithStore(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CompanyOffersManagementWidget />
            </MuiPickersUtilsProvider>
        );

        await waitFor(() => {
            expect(screen.queryByText("Offers Management")).not.toBeInTheDocument();

            expect(screen.getByText("Error fetching offers")).toBeInTheDocument();
        });
    });
});

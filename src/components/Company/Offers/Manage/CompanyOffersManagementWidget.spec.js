import React from "react";
import { act, screen } from "@testing-library/react";

import CompanyOffersManagementWidget from "./CompanyOffersManagementWidget";
import { renderWithStore } from "../../../../test-utils";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

describe("App", () => {
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

    test("Loads Offers", async () => {
        /*
        Use this after the companyOffersService stops using a MOCK
        fetch.mockResponse(() => (
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
            }
        )); */

        // Makes sure all updates like rendering, user events or data fetching are done before making the assertions
        // Since render() is a synchronous function, it only flushes synchronous state updates.
        act(() => {
            renderWithStore(
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <CompanyOffersManagementWidget />
                </MuiPickersUtilsProvider>
            );
        });

        expect(await screen.findByText("Offers Management")).toBeInTheDocument();
    });
});

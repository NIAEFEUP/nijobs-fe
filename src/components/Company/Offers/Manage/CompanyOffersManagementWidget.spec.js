import React from "react";
import { screen } from "@testing-library/react";

import CompanyOffersManagementWidget from "./CompanyOffersManagementWidget";
import { renderWithStore } from "../../../../test-utils";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


describe("App", () => {
    test("Renders Component", async () => {
        renderWithStore(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CompanyOffersManagementWidget />
            </MuiPickersUtilsProvider>
        );

        // Use getBy by default when element should be available
        expect(screen.getByText("Loading...")).toBeInTheDocument();

        expect(screen.getByRole("heading")).toBeInTheDocument();

        // Use queryBy When asserting for missing element
        expect(screen.queryByText("Offers Management")).toBeNull();

        screen.debug();

        // Use find by for elements that aren't there initially, but will be eventually
        expect(await screen.findByText("Offers Management")).toBeInTheDocument();

        screen.debug();
    });
});

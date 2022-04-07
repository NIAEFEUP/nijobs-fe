import React from "react";
import {
    screen, waitFor, queryByText, getByLabelText,
    fireEvent, act, getByTestId, queryByTestId,
} from "@testing-library/react";

import CompanyOffersManagementWidget from "./CompanyOffersManagementWidget";
import { renderWithStoreAndTheme } from "../../../../test-utils";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import * as companyOffersService from "../../../../services/companyOffersService";
import {
    hideOffer as hideOfferService,
    enableOffer as enableOfferService,
} from "../../../../services/offerService";
import useSession from "../../../../hooks/useSession";
import { BrowserRouter } from "react-router-dom";
import { addSnackbar } from "../../../../actions/notificationActions";
import { createMatchMedia } from "../../../../utils/media-queries";
import { columns } from "./CompanyOffersManagementSchema";
import { createTheme } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import Notifier from "../../../Notifications/Notifier";
import { format, parseISO } from "date-fns";

jest.mock("../../../../hooks/useSession");
jest.mock("../../../../services/companyOffersService");
jest.mock("../../../../services/offerService");
jest.mock("../../../../actions/notificationActions");

describe("App", () => {
    const theme = createTheme({});

    const MOCK_OFFERS = [
        {
            _id: "random uuid4",
            owner: "company_id",
            title: "Offer title 1",
            ownerName: "Reddit",
            ownerLogo: "logo.com",
            location: "Porto",
            publishDate: "2019-06",
            publishEndDate: "2020-09",
            description: "Offer description 1",
            isHidden: false,
        },
        {
            _id: "random uuid5",
            owner: "company_id",
            title: "Offer title 2",
            ownerName: "Reddit",
            ownerLogo: "logo.com2",
            location: "Lisbon",
            publishDate: "2021-06",
            publishEndDate: "2021-09",
            description: "Offer description 2",
            isHidden: true,
        },
        {
            _id: "random uuid6",
            owner: "company_id",
            title: "Offer title 3",
            ownerName: "Reddit",
            ownerLogo: "logo.com2",
            location: "Lisbon",
            publishDate: "2021-06",
            publishEndDate: "2021-09",
            description: "Offer description 3",
            isHidden: true,
            hiddenReason: "ADMIN_REQUEST",
        },
    ];

    beforeEach(() => {
        useSession.mockReturnValue({ data: { company: { name: "company1", _id: "company_id" } }, isLoggedIn: true });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Renders Loading", () => {
        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() => new Promise(() => { }));

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
        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() => new Promise((resolve) =>
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

            for (const offer of MOCK_OFFERS) {
                try {
                    const offerRow = screen.queryByText(offer.title).closest("tr");

                    expect(queryByText(offerRow, format(parseISO(offer.publishDate), "yyyy-MM-dd"))).toBeInTheDocument();
                    expect(queryByText(offerRow, format(parseISO(offer.publishEndDate), "yyyy-MM-dd"))).toBeInTheDocument();
                    expect(queryByText(offerRow, offer.location)).toBeInTheDocument();

                    expect(getByLabelText(offerRow, "Edit Offer")).toBeInTheDocument();
                } catch (e) {
                    throw new Error(`Failed checking Offer ${offer.title}\n\n${e}`);
                }
            }
        }, {
            timeout: 1000,
        });
    });

    it("Loads Empty Offers", async () => {
        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() => new Promise((resolve) =>
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

        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() => new Promise((resolve) =>
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

    it("Should render mobile collapsable content on mobile device", async () => {
        addSnackbar.mockImplementationOnce(() => ({ type: "" }));

        const MOBILE_WIDTH_PX = 360;
        window.matchMedia = createMatchMedia(MOBILE_WIDTH_PX);

        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() => new Promise((resolve) =>
            resolve(MOCK_OFFERS)
        ));


        await act(() =>
            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <SnackbarProvider maxSnack={3}>
                            <Notifier />
                            <CompanyOffersManagementWidget isMobile={true} />
                        </SnackbarProvider>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>, { initialState: {}, theme })
        );

        for (const offer of MOCK_OFFERS) {
            try {
                const offerRow = screen.queryByText(offer.title)?.closest("tr");

                expect(queryByText(offerRow, format(parseISO(offer.publishDate), "yyyy-MM-dd"))).toBeInTheDocument();

                fireEvent.click(getByLabelText(offerRow, "More Actions"));

                expect(getByLabelText(offerRow.nextElementSibling, "Edit Offer")).toBeInTheDocument();
                expect(queryByText(offerRow.nextElementSibling, offer.location)).toBeInTheDocument();
                expect(queryByText(offerRow.nextElementSibling, format(parseISO(offer.publishEndDate), "yyyy-MM-dd"))).toBeInTheDocument();
            } catch (e) {
                throw new Error(`Failed checking Offer ${offer.title}\n\n${e}`);
            }
        }

    });

    it("Should hide/enable offer when clicking the hide/enable offer button", async () => {
        const offer = MOCK_OFFERS[0];
        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() => new Promise((resolve) =>
            resolve([offer])
        ));
        hideOfferService.mockImplementation(() => new Promise((resolve) => resolve()));
        enableOfferService.mockImplementation(() => new Promise((resolve) => resolve()));

        await act(() =>
            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CompanyOffersManagementWidget />
                    </MuiPickersUtilsProvider>
                </BrowserRouter>, { initialState: {}, theme }
            )
        );

        const offerRow = screen.queryByText(offer.title).closest("tr");

        let visibilityButton = getByTestId(offerRow, "HideOffer");
        expect(visibilityButton).toBeInTheDocument();

        await act(async () => {
            await fireEvent.click(visibilityButton);
        });

        expect(queryByTestId(offerRow, "HideOffer")).not.toBeInTheDocument();
        expect(getByTestId(offerRow, "EnableOffer")).toBeInTheDocument();

        visibilityButton = getByTestId(offerRow, "EnableOffer");

        await act(async () => {
            await fireEvent.click(visibilityButton);
        });

        expect(getByTestId(offerRow, "HideOffer")).toBeInTheDocument();
        expect(queryByTestId(offerRow, "EnableOffer")).not.toBeInTheDocument();
    });

    it("Should disable hide/enable offer button when the offer is disabled by an admin", async () => {
        const offer = MOCK_OFFERS[2];
        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() => new Promise((resolve) =>
            resolve([offer])
        ));
        hideOfferService.mockImplementation(() => new Promise((resolve) => resolve()));
        enableOfferService.mockImplementation(() => new Promise((resolve) => resolve()));

        await act(() =>
            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CompanyOffersManagementWidget />
                    </MuiPickersUtilsProvider>
                </BrowserRouter>, { initialState: {}, theme }
            )
        );

        const offerRow = screen.queryByText(offer.title).closest("tr");

        const visibilityButton = getByTestId(offerRow, "EnableOffer");
        expect(visibilityButton.closest("button")).toBeDisabled();

        await act(async () => {
            await fireEvent.click(visibilityButton);
        });

        expect(getByTestId(offerRow, "EnableOffer")).toBeInTheDocument();
        expect(queryByTestId(offerRow, "HideOffer")).not.toBeInTheDocument();
    });

    it("Should show snackbar when hide/enable offer service fails when clicking the respective button", async () => {
        addSnackbar.mockImplementationOnce(() => ({ type: "" }));

        const offer = MOCK_OFFERS[0];
        companyOffersService.fetchCompanyOffers.mockImplementationOnce(() => new Promise((resolve) =>
            resolve([offer])
        ));

        hideOfferService.mockImplementationOnce(() => new Promise((resolve, reject) =>
            reject([{ msg: "Error fetching offers" }])
        ));
        enableOfferService.mockImplementation(() => new Promise((resolve) => resolve()));

        await act(() =>
            renderWithStoreAndTheme(
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CompanyOffersManagementWidget />
                    </MuiPickersUtilsProvider>
                </BrowserRouter>, { initialState: {}, theme }
            )
        );

        const offerRow = screen.queryByText(offer.title).closest("tr");

        await act(async () => {
            await fireEvent.click(getByTestId(offerRow, "HideOffer"));
        });

        expect(addSnackbar).toHaveBeenCalledTimes(1);
    });
});

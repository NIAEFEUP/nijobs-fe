import React from "react";
import { createTheme } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";

import { renderWithStoreAndTheme, act, screen, fireEvent } from "../test-utils";
import useComponentController from "../hooks/useComponentController";
import OfferPage, { OfferPageController, OfferPageControllerContext } from "./OfferPage";
import {
    hideOffer as hideOfferService,
    enableOffer as enableOfferService,
    disableOffer as disableOfferService,
} from "../services/offerService";
import useOffer from "../hooks/useOffer";
import useSession from "../hooks/useSession";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";

jest.mock("../hooks/useOffer");
jest.mock("../hooks/useSession");
jest.mock("../services/offerService");

const theme = createTheme({});

// eslint-disable-next-line react/prop-types
const OfferPageWrapper = ({ children }) => {
    const {
        ContextProvider,
        contextProviderProps,
    } = useComponentController(
        OfferPageController,
        null,
        OfferPageControllerContext
    );

    return (
        <ContextProvider {...contextProviderProps}>
            {children}
        </ContextProvider>
    );
};

describe("Offer Page", () => {

    const offer = new Offer({
        _id: "id1",
        title: "position1",
        owner: "company_id",
        ownerName: "company1",
        ownerLogo: "",
        location: "location1",
        jobStartDate: (new Date()).toISOString(),
        publishDate: "2021-04-22T22:35:57.177Z",
        publishEndDate: "2021-09-19T23:00:00.000Z",
        description: "description1",
    });

    it("should render successfully", async () => {

        useSession.mockImplementation(() => ({
            isLoggedIn: true, data: { company: { name: "company1", _id: "company_id" } },
        }));

        useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: () => {} }));

        await act(async () => {
            await renderWithStoreAndTheme(
                <BrowserRouter>
                    <OfferPageWrapper>
                        <OfferPage />
                    </OfferPageWrapper>
                </BrowserRouter>,
                { theme }
            );
        });

        expect(screen.queryByText("position1")).toBeInTheDocument();
        expect(screen.queryByText("company1")).toBeInTheDocument();
        expect(screen.getByRole("hideEnableOfferButton")).toBeInTheDocument();
    });

    it("should hide offer when the company owner clicks the hide button", async () => {

        hideOfferService.mockImplementation(() => new Promise((resolve) => resolve()));

        useSession.mockImplementation(() => ({
            isLoggedIn: true, data: { company: { name: "company1", _id: "company_id" } },
        }));

        useOffer.mockImplementation(() => ({ offer, loading: false, error: null, mutate: jest.fn() }));

        await act(async () => {
            await renderWithStoreAndTheme(
                <BrowserRouter>
                    <OfferPageWrapper>
                        <OfferPage />
                    </OfferPageWrapper>
                </BrowserRouter>,
                { theme }
            );
        });

        const visibilityButton = screen.getByRole("hideEnableOfferButton");

        await act(async () => {
            await fireEvent.click(visibilityButton);
        });

        expect(hideOfferService).toHaveBeenCalled();
    });

    it("should enable offer when the company owner clicks the enable button", async () => {

        enableOfferService.mockImplementation(() => new Promise((resolve) => resolve()));

        useSession.mockImplementation(() => ({
            isLoggedIn: true, data: { company: { name: "company1", _id: "company_id" } },
        }));

        useOffer.mockImplementation(() => ({
            offer: new Offer({ ...offer, isHidden: true }),
            loading: false,
            error: null,
            mutate: jest.fn() }));

        await act(async () => {
            await renderWithStoreAndTheme(
                <BrowserRouter>
                    <OfferPageWrapper>
                        <OfferPage />
                    </OfferPageWrapper>
                </BrowserRouter>,
                { theme }
            );
        });

        const visibilityButton = screen.getByRole("hideEnableOfferButton");

        await act(async () => {
            await fireEvent.click(visibilityButton);
        });

        expect(enableOfferService).toHaveBeenCalled();
    });

    it("should disable offer when the admin clicks the disable offer button and enters a reason", async () => {

        disableOfferService.mockImplementation(() => new Promise((resolve) => resolve()));

        useSession.mockImplementation(() => ({ isLoggedIn: true, data: { email: "admin@admin.com", isAdmin: true } }));

        useOffer.mockImplementation(() => ({
            offer,
            loading: false,
            error: null,
            mutate: jest.fn() }));

        await act(async () => {
            await renderWithStoreAndTheme(
                <BrowserRouter>
                    <OfferPageWrapper>
                        <OfferPage />
                    </OfferPageWrapper>
                </BrowserRouter>,
                { theme }
            );
        });

        const visibilityButton = screen.getByRole("disableEnableOfferButton");

        await act(async () => {
            await fireEvent.click(visibilityButton);
        });

        const reason = screen.getByLabelText("Reason");
        const submitButton = screen.getByRole("disableOffer");

        await act(async () => {
            await fireEvent.change(reason, { target: { value: "This offer is offensive." } });
        });
        await act(async () => {
            await fireEvent.click(submitButton);
        });

        expect(disableOfferService).toHaveBeenCalled();
    });

    it("should enable a disabled offer when the admin clicks the enable offer button", async () => {

        enableOfferService.mockImplementation(() => new Promise((resolve) => resolve()));

        useSession.mockImplementation(() => ({ isLoggedIn: true, data: { email: "admin@admin.com", isAdmin: true } }));

        useOffer.mockImplementation(() => ({
            offer,
            loading: false,
            error: null,
            mutate: jest.fn() }));

        await act(async () => {
            await renderWithStoreAndTheme(
                <BrowserRouter>
                    <OfferPageWrapper>
                        <OfferPage />
                    </OfferPageWrapper>
                </BrowserRouter>,
                { theme }
            );
        });

        const visibilityButton = screen.getByRole("disableEnableOfferButton");

        await act(async () => {
            await fireEvent.click(visibilityButton);
        });

        expect(enableOfferService).toHaveBeenCalled();
    });
});

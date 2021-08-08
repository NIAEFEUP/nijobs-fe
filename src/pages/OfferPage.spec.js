import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";

import { renderWithStoreAndTheme, act, screen } from "../test-utils";
import useComponentController from "../hooks/useComponentController";
import OfferPage, { OfferPageController, OfferPageControllerContext } from "./OfferPage";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import { getOffer } from "../services/getOfferService";

jest.mock("../services/getOfferService");

const theme = createMuiTheme({});

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

    beforeEach(() => {
        fetch.resetMocks();
    });

    it("should render successfully", async () => {

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

        getOffer.mockImplementation(() => Promise.resolve(offer));

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
    });
});

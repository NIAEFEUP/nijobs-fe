import React from "react";
import SearchResultsMobile from "./SearchResultsMobile";
import Offer from "../Offer/Offer";
import { createMuiTheme } from "@material-ui/core";
import { render, renderWithStoreAndTheme, renderWithTheme, screen } from "../../../../test-utils";
import { createMatchMedia } from "../../../../utils/media-queries";
import { waitForElementToBeRemoved } from "@testing-library/dom";
import { Simulate } from "react-dom/test-utils";
import { SearchResultsControllerContext } from "./SearchResultsWidget";

describe("SearchResultsMobile", () => {

    const theme = createMuiTheme();

    const MOBILE_WIDTH_PX = 500;
    window.matchMedia = createMatchMedia(MOBILE_WIDTH_PX);

    const offers = [
        new Offer({
            id: "id1",
            title: "position1",
            company: {
                name: "company1",
                logo: "companyLogo",
            },
            location: "location1",
            date: "date1",
            description: "description1",
        }),
        new Offer({
            id: "id2",
            title: "position2",
            company: {
                name: "company2",
                logo: "companyLogo",
            },
            location: "location2",
            date: "date2",
            description: "description2",
        }),
    ];

    describe("render", () => {
        it("Should render offers if present", () => {

            const context = { offers };
            render(
                <SearchResultsControllerContext.Provider value={context}>
                    <SearchResultsMobile offers={offers} />
                </SearchResultsControllerContext.Provider>
            );
            expect(screen.getByRole("button", { name: "Show Filters" })).toBeInTheDocument();
            expect(screen.getByText("position1")).toBeInTheDocument();
            expect(screen.getByText("position2")).toBeInTheDocument();
            expect(screen.getByText("location1")).toBeInTheDocument();
            expect(screen.getByText("location2")).toBeInTheDocument();
        });

        it("Should render 'error' message if no offers or error occurred", () => {

            const initialState = {
                offerSearch: {
                    offers: [],
                    searchValue: "searchValue",
                    jobDuration: [1, 2],
                    fields: [],
                    technologies: [],
                },
            };
            const context = { noOffers: true };

            renderWithStoreAndTheme(
                <SearchResultsControllerContext.Provider value={context}>
                    <SearchResultsMobile />
                </SearchResultsControllerContext.Provider>
                , { initialState, theme });
            expect(screen.getByText("No offers available.")).toBeInTheDocument();
            expect(screen.getByText("Try a different criteria.")).toBeInTheDocument();
            expect(screen.getByLabelText("Search", { selector: "input" })).toBeInTheDocument();

        });
    });

    describe("interaction", () => {
        it("should open offer details on offer item click", async () => {
            const setSelectedOfferMock = jest.fn();

            const context = {
                offers,
                setSelectedOffer: setSelectedOfferMock,
                selectedOffer: offers[0],
                toggleShowSearchFilters: () => {},
            };

            renderWithTheme(
                <SearchResultsControllerContext.Provider value={context}>
                    <SearchResultsMobile />
                </SearchResultsControllerContext.Provider>,
                { theme }
            );

            expect(screen.queryByText(offers[0].description)).not.toBeInTheDocument();
            Simulate.click(screen.getByText(offers[0].title));
            expect(setSelectedOfferMock).toHaveBeenCalledWith(offers[0]);
            expect(screen.getByText(offers[0].description)).toBeInTheDocument();
            Simulate.click(screen.getByLabelText("back", { selector: "button" }));
            await waitForElementToBeRemoved(() => screen.getByText(offers[0].description));
        });
    });
});

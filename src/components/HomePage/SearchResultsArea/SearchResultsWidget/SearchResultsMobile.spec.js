import React from "react";
import SearchResultsMobile from "./SearchResultsMobile";
import Offer from "../Offer/Offer";
import { createTheme } from "@material-ui/core/styles";
import { render, renderWithStoreAndTheme, screen } from "../../../../test-utils";
import { createMatchMedia } from "../../../../utils/media-queries";
import { waitForElementToBeRemoved } from "@testing-library/dom";
import { Simulate } from "react-dom/test-utils";
import { SearchResultsControllerContext } from "./SearchResultsWidget";
import { BrowserRouter } from "react-router-dom";

describe("SearchResultsMobile", () => {

    const theme = createTheme();

    const MOBILE_WIDTH_PX = 500;
    window.matchMedia = createMatchMedia(MOBILE_WIDTH_PX);

    const offers = [
        new Offer({
            _id: "id1",
            title: "position1",
            ownerName: "company1",
            location: "location1",
            jobStartDate: (new Date()).toISOString(),
            publishDate: "2021-04-22T22:35:57.177Z",
            publishEndDate: "2021-09-19T23:00:00.000Z",
            description: "description1",
        }),
        new Offer({
            _id: "id2",
            title: "position2",
            ownerName: "company1",
            location: "location2",
            jobStartDate: (new Date()).toISOString(),
            publishDate: "2021-04-22T22:35:57.177Z",
            publishEndDate: "2021-09-19T23:00:00.000Z",
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
            expect(screen.getByRole("button", { name: "Adjust Filters" })).toBeInTheDocument();
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
            const setSelectedOfferIdxMock = jest.fn();

            const context = {
                offers,
                setSelectedOfferIdx: setSelectedOfferIdxMock,
                selectedOfferIdx: 0,
                toggleShowSearchFilters: () => {},
            };

            renderWithStoreAndTheme(
                <BrowserRouter>
                    <SearchResultsControllerContext.Provider value={context}>
                        <SearchResultsMobile />
                    </SearchResultsControllerContext.Provider>
                </BrowserRouter>,
                { theme }
            );

            expect(screen.queryByText(offers[0].description)).not.toBeInTheDocument();
            Simulate.click(screen.getByText(offers[0].title));
            expect(setSelectedOfferIdxMock).toHaveBeenCalledWith(0);
            expect(screen.getByText(offers[0].description)).toBeInTheDocument();
            Simulate.click(screen.getByLabelText("back", { selector: "button" }));
            await waitForElementToBeRemoved(() => screen.getByText(offers[0].description));
        });
    });
});

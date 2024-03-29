import React from "react";
import SearchResultsWidget, { SearchResultsControllerContext } from "./SearchResultsWidget";
import { renderWithStoreAndTheme, screen, fireEvent, act } from "../../../../test-utils";
import { createTheme } from "@material-ui/core/styles";
import Offer from "../Offer/Offer";
import { searchOffers } from "../../../../services/offerService";

import { MemoryRouter } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RouteWrappedContent = ({ children }) => (
    <MemoryRouter>
        {children}
    </MemoryRouter>
);

jest.mock("../../../../services/offerService");

describe("SearchResults", () => {
    const theme = createTheme();
    const initialState = {
        offerSearch: {
            searchValue: "searchValue",
            jobDuration: [1, 2],
            fields: [],
            technologies: [],
            offers: [
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
            ],
        },
    };

    afterEach(() => jest.clearAllMocks());

    it("should display OfferItemsContainer", () => {

        renderWithStoreAndTheme(
            <RouteWrappedContent>
                <SearchResultsControllerContext.Provider>
                    <SearchResultsWidget />
                </SearchResultsControllerContext.Provider>
            </RouteWrappedContent>,
            { initialState, theme }
        );

        expect(screen.getByRole("button", { name: "Adjust Filters" })).toBeInTheDocument();
        expect(screen.getByText("position1")).toBeInTheDocument();
        expect(screen.getByText("position2")).toBeInTheDocument();
    });

    it("should not display offers on error", () => {

        const initialStateWithError = {
            offerSearch: {
                ...initialState.offerSearch,
                error: "something",
            },
        };

        renderWithStoreAndTheme(
            <RouteWrappedContent>
                <SearchResultsControllerContext.Provider>
                    <SearchResultsWidget />
                </SearchResultsControllerContext.Provider>
            </RouteWrappedContent>,
            { initialState: initialStateWithError, theme }
        );

        expect(screen.getByText("No offers available.")).toBeInTheDocument();
        expect(screen.queryByText("position1")).not.toBeInTheDocument();
        expect(screen.queryByText("position2")).not.toBeInTheDocument();
    });

    it("should display searchArea on error", () => {

        const initialStateWithError = {
            offerSearch: {
                ...initialState.offerSearch,
                error: "something2",
            },
        };

        renderWithStoreAndTheme(
            <RouteWrappedContent>
                <SearchResultsControllerContext.Provider>
                    <SearchResultsWidget />
                </SearchResultsControllerContext.Provider>
            </RouteWrappedContent>,
            { initialState: initialStateWithError, theme }
        );

        expect(screen.getByText("We could not fetch the offers you were looking for, please revise your search criteria."))
            .toBeInTheDocument();

        expect(screen.getByLabelText("Search", { selector: "input" })).toBeInTheDocument();

    });

    it("should display searchArea on error/when there are no results", () => {

        const initialStateWithoutOffers = {
            offerSearch: {
                ...initialState.offerSearch,
                offers: [],
            },
        };

        renderWithStoreAndTheme(
            <RouteWrappedContent>
                <SearchResultsControllerContext.Provider>
                    <SearchResultsWidget />
                </SearchResultsControllerContext.Provider>
            </RouteWrappedContent>,
            { initialState: initialStateWithoutOffers, theme }
        );

        expect(screen.getByText("We could not fetch the offers you were looking for, please revise your search criteria."))
            .toBeInTheDocument();

        expect(screen.getByLabelText("Search", { selector: "input" })).toBeInTheDocument();

    });

    it("should toggle searchArea when 'adjust filters' is toggled", () => {
        renderWithStoreAndTheme(
            <RouteWrappedContent>
                <SearchResultsControllerContext.Provider>
                    <SearchResultsWidget />
                </SearchResultsControllerContext.Provider>
            </RouteWrappedContent>,
            { initialState, theme }
        );

        expect(screen.getByRole("button", { name: "Adjust Filters" })).toBeInTheDocument();
        expect(screen.queryByLabelText("Search", { selector: "input" })).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Adjust Filters" }));
        expect(screen.getByLabelText("Search", { selector: "input" })).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Hide Filters" }));
        expect(screen.queryByLabelText("Search", { selector: "input" })).not.toBeInTheDocument();
    });

    it("should search with updated filters and hide filters on fetch", async () => {

        searchOffers.mockImplementation(({ queryToken }) => {
            let offers = [];
            if (queryToken === null)
                offers = initialState.offerSearch.offers;
            return {
                updatedQueryToken: "123",
                results: offers,
            };
        });

        renderWithStoreAndTheme(
            <RouteWrappedContent>
                <SearchResultsControllerContext.Provider>
                    <SearchResultsWidget />
                </SearchResultsControllerContext.Provider>
            </RouteWrappedContent>,
            {
                initialState: {
                    ...initialState,
                    offerSearch: {
                        ...initialState.offerSearch,
                        offers: [initialState.offerSearch.offers[0]],
                    },
                },
                theme,
            }
        );

        await act(async () => {
            await fireEvent.click(screen.getByRole("button", { name: "Adjust Filters" }));
        });

        expect(screen.getAllByTestId("offer-item")).toHaveLength(1);

        await act(async () => {
            await fireEvent.submit(screen.getByLabelText("Search Area"));
        });

        // must wait response from server, otherwise it will be 'loading', hence the await + find
        expect(await screen.findAllByTestId("offer-item")).toHaveLength(2);

        expect(screen.getByRole("button", { name: "Adjust Filters" })).toBeInTheDocument();
        expect(screen.queryByLabelText("Search", { selector: "input" })).not.toBeInTheDocument();
    });

    it("should fetch initial offers and load more until there are no more", async () => {

        // TODO: discover why the last loadMoreOffers was called with the first mock implementation

        searchOffers
            .mockImplementationOnce(() => ({
                updatedQueryToken: "123",
                results: [],
            }))
            .mockImplementationOnce(() => ({
                updatedQueryToken: "456",
                results: [initialState.offerSearch.offers[0]],
            }))
            .mockImplementationOnce(() => ({
                updatedQueryToken: "90",
                results: [initialState.offerSearch.offers[1]],
            }));

        renderWithStoreAndTheme(
            <RouteWrappedContent>
                <SearchResultsControllerContext.Provider>
                    <SearchResultsWidget />
                </SearchResultsControllerContext.Provider>
            </RouteWrappedContent>,
            {
                initialState: {
                    ...initialState,
                    offerSearch: {
                        ...initialState.offerSearch,
                        offers: [initialState.offerSearch.offers[0]],
                    },
                },
                theme,
            }
        );

        await act(async () => {
            await fireEvent.click(screen.getByRole("button", { name: "Adjust Filters" }));
        });

        await act(async () => {
            await fireEvent.submit(screen.getByLabelText("Search Area"));
        });

        await new Promise((r) => setTimeout(r, 2000));

        // must wait response from server, otherwise it will be 'loading', hence the await + find
        expect(await screen.findAllByTestId("offer-item")).toHaveLength(2);
    });
});

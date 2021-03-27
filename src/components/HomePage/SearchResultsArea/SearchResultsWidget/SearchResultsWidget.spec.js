import React from "react";
import SearchResultsWidget from "./SearchResultsWidget";
import { renderWithStoreAndTheme, screen } from "../../../../test-utils";
import { createMuiTheme } from "@material-ui/core";
import Offer from "../Offer/Offer";
import { fireEvent } from "@testing-library/dom";

describe("SearchResults", () => {
    const setRef = () => {};
    const theme = createMuiTheme();
    const initialState = {
        offerSearch: {
            searchValue: "searchValue",
            jobDuration: [1, 2],
            fields: [],
            technologies: [],
            offers: [
                new Offer({
                    id: "id1",
                    title: "position1",
                    company: {
                        name: "company1",
                        logo: "companyLogo",
                    },
                    location: "location1",
                    date: (new Date()).toISOString(),
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
                    date: (new Date()).toISOString(),
                    description: "description2",
                }),
            ],
        },
    };

    it("should display OfferItemsContainer", () => {

        renderWithStoreAndTheme(
            <SearchResultsWidget
                setRef={setRef}
            />,
            { initialState, theme }
        );

        expect(screen.getByRole("button", { name: "Show Filters" })).toBeInTheDocument();
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
            <SearchResultsWidget
                setRef={setRef}
            />,
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
            <SearchResultsWidget
                setRef={setRef}
            />,
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
            <SearchResultsWidget
                setRef={setRef}
            />,
            { initialState: initialStateWithoutOffers, theme }
        );

        expect(screen.getByText("We could not fetch the offers you were looking for, please revise your search criteria."))
            .toBeInTheDocument();

        expect(screen.getByLabelText("Search", { selector: "input" })).toBeInTheDocument();

    });

    it("should toggle searchArea when 'show filters' is toggled", () => {
        renderWithStoreAndTheme(
            <SearchResultsWidget
                setRef={setRef}
            />,
            { initialState, theme }
        );

        expect(screen.getByRole("button", { name: "Show Filters" })).toBeInTheDocument();
        expect(screen.queryByLabelText("Search", { selector: "input" })).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Show Filters" }));
        expect(screen.getByLabelText("Search", { selector: "input" })).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Hide Filters" }));
        expect(screen.queryByLabelText("Search", { selector: "input" })).not.toBeInTheDocument();
    });

    it("should search with updated filters and hide filters on fetch", async () => {

        fetch.mockResponse(JSON.stringify(initialState.offerSearch.offers));

        renderWithStoreAndTheme(
            <SearchResultsWidget
                setRef={setRef}
            />,
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

        fireEvent.click(screen.getByRole("button", { name: "Show Filters" }));

        expect(screen.getAllByTestId("offer-item")).toHaveLength(1);
        fireEvent.submit(screen.getByRole("form"));

        // must wait response from server, otherwise it will be 'loading', hence the await + find
        expect(await screen.findAllByTestId("offer-item")).toHaveLength(2);

        expect(screen.getByRole("button", { name: "Show Filters" })).toBeInTheDocument();
        expect(screen.queryByLabelText("Search", { selector: "input" })).not.toBeInTheDocument();

    });
});

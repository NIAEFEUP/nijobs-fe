import React from "react";
import SearchResultsWidget from "./SearchResultsWidget";
import OfferItemsContainer from "./OfferItemsContainer";
import SearchArea from "../../SearchArea/SearchArea";
import { mountWithStore } from "../../../../test-utils";
import { createMuiTheme } from "@material-ui/core";
import Offer from "../Offer/Offer";

describe("SearchResults", () => {
    const setRef = () => {};
    const theme = createMuiTheme();
    const initialState = {
        offerSearch: {
            searchValue: "searchValue",
            jobDuration: [1, 2],
            fields: [],
            technologies: [],
            offers: [new Offer({
                id: "id1",
                position: "position1",
                company: {
                    name: "company1",
                    logo: "companyLogo",
                },
                location: "location1",
                date: "date1",
                description: "description1",
            })],
        },
    };

    it("should display OfferItemsContainer", () => {

        const wrapper = mountWithStore(
            <SearchResultsWidget
                setRef={setRef}
            />,
            initialState,
            theme
        );

        expect(wrapper.find(OfferItemsContainer).exists()).toBe(true);
    });

    it("should not display offers on error", () => {

        const initialStateWithError = {
            offerSearch: {
                ...initialState.offerSearch,
                error: "something",
            },
        };

        const wrapper = mountWithStore(
            <SearchResultsWidget
                setRef={setRef}
            />,
            initialStateWithError,
            theme
        );

        expect(wrapper.find(OfferItemsContainer).exists()).toBe(false);
    });

    it("should display searchArea on error/when there are no results", () => {

        const initialStateWithError = {
            offerSearch: {
                ...initialState.offerSearch,
                error: "something2",
            },
        };

        const initialStateWithoutOffers = {
            offerSearch: {
                ...initialState.offerSearch,
                offers: [],
            },
        };
        const wrapperError = mountWithStore(
            <SearchResultsWidget
                setRef={setRef}
            />,
            initialStateWithError,
            theme
        );
        const wrapperNoOffers = mountWithStore(
            <SearchResultsWidget
                setRef={setRef}
            />,
            initialStateWithoutOffers,
            theme
        );

        expect(wrapperError.find("#offer_content").contains(<SearchArea />)).toBe(true);
        expect(wrapperNoOffers.find("#offer_content").contains(<SearchArea />)).toBe(true);
    });
});

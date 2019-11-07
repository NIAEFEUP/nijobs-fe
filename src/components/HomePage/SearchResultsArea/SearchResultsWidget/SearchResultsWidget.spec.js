import React from "react";
import { SearchResultsWidget } from "./SearchResultsWidget";
import OfferItemsContainer from "./OfferItemsContainer";
import SearchArea from "../../SearchArea/SearchArea";

describe("SearchResults", () => {
    const setRef = () => {};
    it("should display OfferItemsContainer", () => {


        const wrapper = shallow(
            <SearchResultsWidget
                setRef={setRef}
            />
        );

        expect(wrapper.find(OfferItemsContainer).exists()).toBe(true);
    });

    it("should not display offers on error", () => {
        const wrapper = shallow(
            <SearchResultsWidget
                setRef={setRef}
                offersSearchError={{ error: "something" }}
            />
        );

        expect(wrapper.find(OfferItemsContainer).exists()).toBe(false);
    });

    it("should display searchArea on error/when there are no results", () => {
        const wrapperError = shallow(
            <SearchResultsWidget
                setRef={setRef}
                offersSearchError={{ error: "something" }}
            />
        );
        const wrapperNoOffers = shallow(
            <SearchResultsWidget
                setRef={setRef}
                offers={[]}
            />
        );

        expect(wrapperError.find("#offer_content").contains(<SearchArea/>)).toBe(true);
        expect(wrapperNoOffers.find("#offer_content").contains(<SearchArea/>)).toBe(true);
    });
});

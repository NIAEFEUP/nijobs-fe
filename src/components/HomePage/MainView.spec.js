import React from "react";

import MainView from "./MainView";
import InfoBox from "./QuickInfoArea/InfoBox";
import SearchArea from "./SearchArea/SearchArea";
import ShowMoreButton from "./ShowMoreButton";
import { createMuiTheme } from "@material-ui/core";
import mediaQuery from "css-mediaquery";
import { mountWithStore } from "../../test-utils";

describe("Main View", () => {
    let scrollToProductDescription, showSearchResults, wrapper;
    const theme = createMuiTheme({});
    const initialState = {
        offerSearch: {
            searchValue: "searchValue",
            jobDuration: [1, 2],
            fields: [],
            techs: [],
        },
    };

    beforeEach(() => {
        scrollToProductDescription = jest.fn();
        showSearchResults = jest.fn();

        wrapper = mountWithStore(
            <MainView
                scrollToProductDescription={scrollToProductDescription}
                showSearchResults={showSearchResults}
            />,
            initialState,
            theme
        );
    });

    const createMatchMedia = (width) => (query) => ({
        matches: mediaQuery.match(query, { width }),
        addListener: () => {},
        removeListener: () => {},
    });

    describe("render", () => {
        beforeAll(() => {
            window.matchMedia = createMatchMedia(1200); // render desktop
        });

        it("should contain an InfoBox", () => {
            expect(wrapper.find(InfoBox).exists()).toBe(true);
        });

        it("should contain a SearchArea", () => {
            expect(wrapper.find(SearchArea).exists()).toBe(true);
        });

        it("should contain a ShowMoreButton", () => {
            expect(wrapper.find(ShowMoreButton).exists()).toBe(true);
        });
    });

    describe("interaction", () => {
        it("should call scroll to product description when ShowMoreButton is clicked", () => {
            wrapper.find(ShowMoreButton).first().simulate("click");
            expect(scrollToProductDescription).toHaveBeenCalledTimes(1);
        });

        it("should call showSearchResults when search is submitted", () => {
            wrapper.find("form#search_form").first().simulate("submit", {
                preventDefault: () => {},
            });
            expect(showSearchResults).toHaveBeenCalledTimes(1);
        });
    });
});

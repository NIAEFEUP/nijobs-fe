import React from "react";

import MainView from "./MainView";
import InfoBox from "./QuickInfoArea/InfoBox";
import SearchArea from "./SearchArea/SearchArea";
import ShowMoreButton from "./ShowMoreButton";
import { createTheme } from "@material-ui/core/styles";
import { mountWithStore } from "../../test-utils";

import { MemoryRouter } from "react-router-dom";

describe("Main View", () => {
    let scrollToProductDescription, showSearchResults, wrapper;
    const theme = createTheme({});
    const initialState = {
        offerSearch: {
            searchValue: "searchValue",
            jobDuration: [1, 2],
            fields: [],
            technologies: [],
        },
    };

    beforeEach(() => {
        scrollToProductDescription = jest.fn();
        showSearchResults = jest.fn();

        wrapper = mountWithStore(
            <MemoryRouter initialEntries={["/"]}>
                <MainView
                    scrollToProductDescription={scrollToProductDescription}
                    showSearchResults={showSearchResults}
                />
            </MemoryRouter>,
            initialState,
            theme
        );
    });

    describe("render", () => {

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
            // Simulate request success
            fetch.mockResponse(JSON.stringify({ mockData: true }));

            wrapper.find("form#search_form").first().simulate("submit", {
                preventDefault: () => { },
            });
            expect(showSearchResults).toHaveBeenCalledTimes(1);
        });
    });
});

import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MainView from "./MainView";
import InfoBox from "./QuickInfoArea/InfoBox";
import SearchArea from "./SearchArea/SearchArea";
import ShowMoreButton from "./ShowMoreButton";

describe("Main View", () => {
    let scrollToProductDescription, showSearchResults;

    beforeEach(() => {
        scrollToProductDescription = jest.fn();
        showSearchResults = jest.fn();
    });

    describe("render", () => {
        it("should contain an InfoBox", () => {
            expect(shallow(
                <MainView
                    scrollToProductDescription={scrollToProductDescription}
                    showSearchResults={showSearchResults}
                />).find(InfoBox).exists()).toBe(true);
        });

        it("should contain a SearchArea", () => {
            expect(shallow(
                <MainView
                    scrollToProductDescription={scrollToProductDescription}
                    showSearchResults={showSearchResults}
                />).find(SearchArea).exists()).toBe(true);
        });

        it("should contain a ShowMoreButton", () => {
            expect(shallow(
                <MainView
                    scrollToProductDescription={scrollToProductDescription}
                    showSearchResults={showSearchResults}
                />).find(ShowMoreButton).exists()).toBe(true);
        });
    });


    describe("interaction", () => {
        it("should call scroll to product description when ShowMoreButton is clicked", () => {
            shallow(
                <MainView
                    scrollToProductDescription={scrollToProductDescription}
                    showSearchResults={showSearchResults}
                />).find(ShowMoreButton).first().simulate("click");
            expect(scrollToProductDescription).toHaveBeenCalledTimes(1);
        });

        it("should call showSearchResults when search is submitted", () => {
            const initialState = {
                offerSearch: {
                    searchValue: "searchValue",
                    jobDuration: [1, 2],
                },
            };
            const mockStore = configureMockStore([thunk]);
            const store = mockStore(initialState);
            mount(
                <Provider store={store}>
                    <MainView
                        scrollToProductDescription={scrollToProductDescription}
                        showSearchResults={showSearchResults}
                    />
                </Provider>).find("form#search_form").first().simulate("submit", {
                preventDefault: () => {},
            });
            expect(showSearchResults).toHaveBeenCalledTimes(1);
        });
    });
});

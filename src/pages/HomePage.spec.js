import React from "react";
import HomePage, { scrollToProductDescription, scrollToSearchResults } from "./HomePage";
import MainView from "../components/HomePage/MainView";
import ProductDescription from "../components/HomePage/ProductPlacementArea/ProductDescription";
import SearchResults from "../components/HomePage/SearchResultsArea/SearchResults";

describe("HomePage", () => {
    describe("render", () => {
        const wrapper = shallow(<HomePage/>);

        it("should render MainView", () => {
            expect(wrapper.find(MainView).exists()).toBe(true);
        });

        it("should render ProductDescription", () => {
            expect(wrapper.find(ProductDescription).exists()).toBe(true);
        });

        it("should render SearchResults", () => {
            expect(wrapper.find(SearchResults).exists()).toBe(true);
        });
    });

    describe("interaction", () => {
        it("should scroll to Product Description when scrollToProductDescription is called", () => {
            const scrollIntoView = jest.fn();
            const mockProductDescriptionRef = {
                current: {
                    scrollIntoView,
                },
            };

            scrollToProductDescription(mockProductDescriptionRef);
            expect(scrollIntoView).toHaveBeenCalledWith({
                behavior: "smooth",
                block: "start",
            });
        });

        it("should scroll to SearchResults when scrollToSearchResults is called", () => {
            const scrollIntoView = jest.fn();
            const mockSearchResultsRef = {
                current: {
                    scrollIntoView,
                },
            };
            scrollToSearchResults(mockSearchResultsRef);
            expect(scrollIntoView).toHaveBeenCalledWith({
                behavior: "smooth",
                block: "start",
            });
        });
    });
});

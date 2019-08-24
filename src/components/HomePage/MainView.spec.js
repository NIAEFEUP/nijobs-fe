import React from "react";
import MainView from "./MainView";
import InfoBox from "./QuickInfoArea/InfoBox";
import SearchArea from "./SearchArea/SearchArea";
import ShowMoreButton from "./ShowMoreButton";
import homePageStyles from "./HomePage.module.css";

describe("Main View", () => {
    let scrollToProductDescription, scrollToSearchResults;

    beforeEach(() => {
        scrollToProductDescription = jest.fn();
        scrollToSearchResults = jest.fn();
    });

    describe("render", () => {
        it("should contain an InfoBox", () => {
            expect(shallow(
                <MainView
                    scrollToProductDescription={scrollToProductDescription}
                    scrollToSearchResults={scrollToSearchResults}
                />).find(InfoBox).exists()).toBe(true);
        });

        it("should contain a SearchArea", () => {
            expect(shallow(
                <MainView
                    scrollToProductDescription={scrollToProductDescription}
                    scrollToSearchResults={scrollToSearchResults}
                />).find(SearchArea).exists()).toBe(true);
        });

        it("should contain a ShowMoreButton", () => {
            expect(shallow(
                <MainView
                    scrollToProductDescription={scrollToProductDescription}
                    scrollToSearchResults={scrollToSearchResults}
                />).find(ShowMoreButton).exists()).toBe(true);
        });

        it("should render correctly styled divs", () => {
            expect(shallow(
                <MainView
                    scrollToProductDescription={scrollToProductDescription}
                    scrollToSearchResults={scrollToSearchResults}
                />)
                .find(
                    `div.${homePageStyles.mainView} > div.${homePageStyles.mainMask} > div.${homePageStyles.mainLogo}`
                ).exists())
                .toBe(true);
        });
    });


    describe("interaction", () => {
        it("should call scroll to product description when ShowMoreButton is clicked", () => {
            shallow(
                <MainView
                    scrollToProductDescription={scrollToProductDescription}
                    scrollToSearchResults={scrollToSearchResults}
                />).find(ShowMoreButton).first().simulate("click");
            expect(scrollToProductDescription).toHaveBeenCalledTimes(1);
        });
    });
});

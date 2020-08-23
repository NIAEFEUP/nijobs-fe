import React from "react";
import AbstractSearchResults from "./AbstractSearchResults";
import SearchResultsMobile from "./SearchResultsMobile";
import SearchResultsDesktop from "./SearchResultsDesktop";

describe("AbstractSearchResults", () => {
    describe("render", () => {
        const otherProps = {
            prop1: "prop1",
            prop2: "prop2",
        };
        it("should render SearchResultsDesktop on desktop", () => {
            const wrapper = shallow(<AbstractSearchResults mobile={false} offers={[]} {...otherProps}/>);
            expect(wrapper.find(SearchResultsDesktop).prop("prop1")).toEqual(otherProps.prop1);
            expect(wrapper.find(SearchResultsDesktop).prop("prop2")).toEqual(otherProps.prop2);
        });
        it("should render SearchResultsMobile on mobile", () => {
            const wrapper = shallow(<AbstractSearchResults mobile offers={[]} {...otherProps}/>);
            expect(wrapper.find(SearchResultsMobile).prop("prop1")).toEqual(otherProps.prop1);
            expect(wrapper.find(SearchResultsMobile).prop("prop2")).toEqual(otherProps.prop2);
        });
    });
});

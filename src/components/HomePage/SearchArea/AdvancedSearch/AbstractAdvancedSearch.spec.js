import React from "react";
import AbstractAdvancedSearch from "./AbstractAdvancedSearch";
import AdvancedSearchMobile from "./AdvancedSearchMobile";
import AdvancedSearchDesktop from "./AdvancedSearchDesktop";

describe("AbstractAdvancedSearch", () => {
    describe("render", () => {
        const otherProps = {
            prop1: "prop1",
            prop2: "prop2",
        };
        it("should render AdvancedSearchDesktop on desktop", () => {
            const wrapper = shallow(<AbstractAdvancedSearch mobile={false} {...otherProps}/>);
            expect(wrapper.find(AdvancedSearchDesktop).prop("prop1")).toEqual(otherProps.prop1);
            expect(wrapper.find(AdvancedSearchDesktop).prop("prop2")).toEqual(otherProps.prop2);
        });
        it("should render AdvancedSearchMobile on mobile", () => {
            const wrapper = shallow(<AbstractAdvancedSearch mobile {...otherProps}/>);
            expect(wrapper.find(AdvancedSearchMobile).prop("prop1")).toEqual(otherProps.prop1);
            expect(wrapper.find(AdvancedSearchMobile).prop("prop2")).toEqual(otherProps.prop2);
        });
    });
});

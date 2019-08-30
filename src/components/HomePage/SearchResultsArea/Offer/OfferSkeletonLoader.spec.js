import React from "react";

import OfferSkeletonLoader from "./OfferSkeletonLoader";
import SubheaderSkeleton from "./OfferSkeleton/SubheaderSkeleton";
import ContentSkeleton from "./OfferSkeleton/ContentSkeleton";
import LogoSkeleton from "./OfferSkeleton/LogoSkeleton";

describe("OfferSkeletonLoader", () => {
    it("should have all components", () => {
        const wrapper = mount(<OfferSkeletonLoader/>);
        expect(wrapper.find(LogoSkeleton).exists()).toBe(true);
        expect(wrapper.find(ContentSkeleton).exists()).toBe(true);
        expect(wrapper.find(SubheaderSkeleton).exists()).toBe(true);
    });
});

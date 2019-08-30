import React from "react";
import OfferCard from "./OfferCard";
import OfferSkeletonLoader from "./OfferSkeletonLoader";
import { CardHeader, Card, CardMedia, CardContent } from "@material-ui/core";

describe("OfferCard", () => {
    it("should contain the correct offer elements when not loading", () => {
        const wrapper = shallow(
            <OfferCard
                loading={false}
                position={"Full-Stack Developer"}
                location={"Porto"}
                company={"Reddit"}
                date={"2019-06"}
                description={"This is a description"}
            />);
        expect(wrapper.find(Card).exists()).toBe(true);
        expect(wrapper.find(CardMedia).exists()).toBe(true);
        expect(wrapper.find(CardHeader).exists()).toBe(true);
        expect(wrapper.find(CardContent).exists()).toBe(true);
    });

    it("should display the offer skeleton when loading", () => {
        const wrapper = shallow(<OfferCard loading/>);
        expect(wrapper.find(OfferSkeletonLoader).exists());
    });
});

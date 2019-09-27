import React from "react";
import OfferCard from "./OfferCard";
import OfferSkeletonLoader from "./OfferSkeletonLoader";
import { CardHeader, Card, CardMedia, CardContent } from "@material-ui/core";
import Offer from "./Offer";

describe("OfferCard", () => {
    it("should contain the correct offer elements when not loading", () => {
        const wrapper = shallow(
            <OfferCard
                loading={false}
                offer={new Offer(
                    "id1",
                    "position1",
                    "company1",
                    "location1",
                    "date1",
                    "description1"
                )}
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

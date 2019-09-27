import React from "react";
import SearchResultsWidget, { SkeletonResults } from "./SearchResultsWidget";
import OfferCard from "../Offer/OfferCard";
import Offer from "../Offer/Offer";

describe("SearchResults", () => {
    it("should display offers", () => {
        const setRef = () => {};
        const offers = [
            new Offer(
                "id1",
                "position1",
                "company1",
                "location1",
                "date1",
                "description1"
            ),
            new Offer(
                "id2",
                "position2",
                "company2",
                "location2",
                "date2",
                "description2"
            ),
        ];
        const wrapper = shallow(
            <SearchResultsWidget
                setRef={setRef}
                offers={offers}
            />
        );

        expect(wrapper.find(OfferCard).length).toBe(2);
        expect(wrapper.find(OfferCard).at(0).prop("offer").position).toBe("position1");
        expect(wrapper.find(OfferCard).at(0).prop("offer").company).toBe("company1");
        expect(wrapper.find(OfferCard).at(0).prop("offer").date).toBe("date1");
        expect(wrapper.find(OfferCard).at(0).prop("offer").description).toBe("description1");

        expect(wrapper.find(OfferCard).at(1).prop("offer").position).toBe("position2");
        expect(wrapper.find(OfferCard).at(1).prop("offer").company).toBe("company2");
        expect(wrapper.find(OfferCard).at(1).prop("offer").date).toBe("date2");
        expect(wrapper.find(OfferCard).at(1).prop("offer").description).toBe("description2");

    });
    it("should display skeleton when no offers exist", () => {
        const setRef = () => {};
        expect(shallow(
            <SearchResultsWidget
                offers={[]}
                setRef={setRef}
            />).find(SkeletonResults).exists()
        ).toBe(true);
    });
});

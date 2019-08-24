import React from "react";
import SearchResults from "./SearchResults";
import OfferCard from "./Offer/OfferCard";

describe("SearchResults", () => {
    it("should display offers", () => {
        const setRef = () => {};
        const offers = [
            {
                loading: false,
                position: "position1",
                company: "company1",
                date: "date1",
                description: "description1",
            },
            {
                loading: false,
                position: "position2",
                company: "company2",
                date: "date2",
                description: "description2",
            },
        ];
        const wrapper = shallow(
            <SearchResults
                setRef={setRef}
                offers={offers}
            />
        );

        expect(wrapper.find(OfferCard).length).toBe(2);
        expect(wrapper.find(OfferCard).at(0).prop("loading")).toBe(false);
        expect(wrapper.find(OfferCard).at(0).prop("position")).toBe("position1");
        expect(wrapper.find(OfferCard).at(0).prop("company")).toBe("company1");
        expect(wrapper.find(OfferCard).at(0).prop("date")).toBe("date1");
        expect(wrapper.find(OfferCard).at(0).prop("description")).toBe("description1");

        expect(wrapper.find(OfferCard).at(1).prop("loading")).toBe(false);
        expect(wrapper.find(OfferCard).at(1).prop("position")).toBe("position2");
        expect(wrapper.find(OfferCard).at(1).prop("company")).toBe("company2");
        expect(wrapper.find(OfferCard).at(1).prop("date")).toBe("date2");
        expect(wrapper.find(OfferCard).at(1).prop("description")).toBe("description2");

    });
});

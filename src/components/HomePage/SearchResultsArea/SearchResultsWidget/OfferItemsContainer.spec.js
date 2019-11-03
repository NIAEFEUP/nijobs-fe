import React from "react";
import Offer from "../Offer/Offer";
import OfferItem from "../Offer/OfferItem";
import OfferItemsContainer from "./OfferItemsContainer";

describe("OfferItemsContainer", () => {

    describe("render", () => {
        it("should show loading state when loading", () => {
            expect(shallow(<OfferItemsContainer loading />).text()).toEqual("loading...");
        });

        it("should show offer items", () => {
            const offers = [
                new Offer({
                    id: "id1",
                    position: "position1",
                    company: {
                        name: "company1",
                        logo: "companyLogo",
                    },
                    location: "location1",
                    date: "date1",
                    description: "description1",
                }),
                new Offer({
                    id: "id2",
                    position: "position2",
                    company: {
                        name: "company2",
                        logo: "companyLogo",
                    },
                    location: "location2",
                    date: "date2",
                    description: "description2",
                }),
            ];

            const wrapper = shallow(
                <OfferItemsContainer
                    offers={offers}
                    loading={false}
                    setSelectedOffer={() => {}}
                />);
            expect(wrapper.find(OfferItem).at(0).prop("offer").position).toBe("position1");
            expect(wrapper.find(OfferItem).at(0).prop("offer").company).toEqual({
                name: "company1",
                logo: "companyLogo",
            });
            expect(wrapper.find(OfferItem).at(0).prop("offer").date).toBe("date1");
            expect(wrapper.find(OfferItem).at(0).prop("offer").description).toBe("description1");

            expect(wrapper.find(OfferItem).at(1).prop("offer").position).toBe("position2");
            expect(wrapper.find(OfferItem).at(1).prop("offer").company).toEqual({
                name: "company2",
                logo: "companyLogo",
            },);
            expect(wrapper.find(OfferItem).at(1).prop("offer").date).toBe("date2");
            expect(wrapper.find(OfferItem).at(1).prop("offer").description).toBe("description2");
        });
    });
});

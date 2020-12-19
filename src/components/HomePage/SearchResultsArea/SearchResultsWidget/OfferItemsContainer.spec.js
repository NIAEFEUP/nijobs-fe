import React from "react";
import Offer from "../Offer/Offer";
import OfferItem from "../Offer/OfferItem";
import OfferItemsContainer from "./OfferItemsContainer";

describe("OfferItemsContainer", () => {

    describe("render", () => {
        it("should show loading state when loading", () => {
            expect(shallow(<OfferItemsContainer loading />).find({ loading: true }).find(OfferItem)).toHaveLength(3);
        });

        it("should show offer items", () => {
            const offers = [
                new Offer({
                    _id: "id1",
                    title: "title1",
                    company: {
                        name: "company1",
                        logo: "companyLogo",
                    },
                    location: "location1",
                    jobStartDate: "jobStartDate1",
                    description: "description1",
                }),
                new Offer({
                    _id: "id2",
                    title: "title2",
                    company: {
                        name: "company2",
                        logo: "companyLogo",
                    },
                    location: "location2",
                    jobStartDate: "jobStartDate2",
                    description: "description2",
                }),
            ];

            const wrapper = shallow(
                <OfferItemsContainer
                    offers={offers}
                    loading={false}
                    setSelectedOffer={() => {}}
                />);
            expect(wrapper.find(OfferItem).at(0).prop("offer").title).toBe("title1");
            expect(wrapper.find(OfferItem).at(0).prop("offer").company).toEqual({
                name: "company1",
                logo: "companyLogo",
            });
            expect(wrapper.find(OfferItem).at(0).prop("offer").jobStartDate).toBe("jobStartDate1");
            expect(wrapper.find(OfferItem).at(0).prop("offer").description).toBe("description1");

            expect(wrapper.find(OfferItem).at(1).prop("offer").title).toBe("title2");
            expect(wrapper.find(OfferItem).at(1).prop("offer").company).toEqual({
                name: "company2",
                logo: "companyLogo",
            },);
            expect(wrapper.find(OfferItem).at(1).prop("offer").jobStartDate).toBe("jobStartDate2");
            expect(wrapper.find(OfferItem).at(1).prop("offer").description).toBe("description2");
        });
    });
});

import React from "react";
import OfferContent from "./OfferContent";
import Offer from "./Offer";
import { Typography } from "@material-ui/core";

describe("OfferContent", () => {
    describe("render", () => {
        it("should render placeholder content when no offer selected", () => {
            expect(shallow(<OfferContent offer={null}/>).find("div").text()).toEqual("Please select an offer to view the details");
        });

        describe("offer selected", () => {
            const offer = new Offer({
                id: "id1",
                position: "position1",
                company: {
                    name: "company1",
                    logo: "companyLogo",
                },
                location: "location1",
                date: "date1",
                description: "description1",
            });

            const wrapper = shallow(<OfferContent offer={offer}/>);

            it("should render offer title", () => {
                expect(wrapper.find(Typography).at(0).prop("variant")).toBe("h2");
                expect(wrapper.find(Typography).at(0).prop("children")).toEqual(offer.position);

                expect(wrapper.find(Typography).at(1).prop("variant")).toBe("h4");
                expect(wrapper.find(Typography).at(1).prop("children")).toEqual(offer.company.name);

                expect(wrapper.find("p").first().text()).toEqual(offer.description);
            });

        });
    });
});

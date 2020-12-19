import React from "react";
import OfferContent from "./OfferContent";
import Offer from "./Offer";
import { mountWithTheme } from "../../../../test-utils";
import { Typography, createMuiTheme } from "@material-ui/core";
import LOADING_MESSAGES from "./offerLoadingMessages";

describe("OfferContent", () => {
    describe("render", () => {
        const theme = createMuiTheme();
        it("should render placeholder content when no offer selected", () => {

            const wrapper = mountWithTheme(
                <OfferContent offer={null} />,
                theme
            );

            expect(wrapper.find("div#no_selected_offer_text").find(Typography).text())
                .toEqual("Please select an offer to view the details");
        });

        it("should render a valid loading message", () => {
            const wrapper = mountWithTheme(
                <OfferContent loading />,
                theme
            );

            expect(LOADING_MESSAGES.includes(wrapper.find(Typography).text()))
                .toBe(true);
        });

        describe("offer selected", () => {
            const offer = new Offer({
                id: "id1",
                title: "position1",
                company: {
                    name: "company1",
                    logo: "companyLogo",
                },
                location: "location1",
                date: "date1",
                description: "description1",
            });

            const wrapper = mountWithTheme(
                <OfferContent offer={offer} />,
                theme
            );

            it("should render offer title", () => {
                expect(wrapper.find(Typography).at(0).prop("variant")).toBe("h4");
                expect(wrapper.find(Typography).at(0).prop("children")).toEqual(offer.title);

                expect(wrapper.find(Typography).at(1).prop("variant")).toBe("h6");
                expect(wrapper.find(Typography).at(1).prop("children")).toEqual(offer.company.name);

                expect(wrapper.find("p").first().text()).toEqual(offer.location);
            });

        });
    });
});

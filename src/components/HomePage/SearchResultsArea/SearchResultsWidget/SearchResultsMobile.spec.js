import React from "react";
import SearchResultsMobile from "./SearchResultsMobile";
import Offer from "../Offer/Offer";
import OfferItemsContainer from "./OfferItemsContainer";
import { Dialog, ListItem, createMuiTheme } from "@material-ui/core";
import { mountWithTheme, mountWithStore } from "../../../../test-utils";
import SearchArea from "../../SearchArea/SearchArea";

describe("SearchResultsMobile", () => {

    const theme = createMuiTheme();


    describe("render", () => {
        it("Should render offers if present", () => {
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

            const wrapper = mount(<SearchResultsMobile offers={offers} />);
            expect(wrapper.find(OfferItemsContainer).prop("offers")).toStrictEqual(offers);
        });

        it("Should render 'error' message if no offers or error occurred", () => {

            const initialState = {
                offers: [],
                offerSearch: {
                    searchValue: "searchValue",
                    jobDuration: [1, 2],
                    fields: [],
                    techs: [],
                },
            };

            const wrapper = mountWithStore(<SearchResultsMobile noOffers />, initialState, theme);
            expect(wrapper.find("div#no_offers_container").exists()).toBe(true);
            expect(wrapper.find("div#no_offers_container").find(SearchArea).exists()).toBe(true);
        });
    });

    describe("interaction", () => {
        it("should open offer details on offer item click", () => {
            const setSelectedOfferMock = jest.fn();

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

            const wrapper = mountWithTheme(
                <SearchResultsMobile
                    offers={offers}
                    setSelectedOffer={setSelectedOfferMock}
                    selectedOffer={offers[0]}
                />,
                theme
            );
            expect(wrapper.find(Dialog).prop("open")).toBe(false);
            wrapper.find(ListItem).first().simulate("click");
            expect(setSelectedOfferMock).toHaveBeenCalledWith(offers[0]);
            expect(wrapper.find(Dialog).prop("open")).toBe(true);

        });
    });
});

import React from "react";
import OfferItem from "./OfferItem";
import Offer from "./Offer";
import { ListItemText, Avatar, ListItemAvatar, ListItem } from "@material-ui/core";
import Skeleton from "react-loading-skeleton";

describe("OfferItem", () => {

    const offer = new Offer({
        id: "id1",
        position: "position1",
        company: "company1",
        location: "location1",
        date: "date1",
        description: "description1",
    });

    describe("render", () => {

        it("should render a loading version when loading=true", () => {
            const wrapper = shallow(<OfferItem loading/>);

            expect(wrapper.find(Avatar).find(Skeleton).prop("circle")).toBe(true);
            expect(wrapper.find(ListItemText).prop("primary")).toStrictEqual(<Skeleton/>);
            expect(wrapper.find(ListItemText).prop("secondary")).toStrictEqual(<Skeleton/>);

        });

        const wrapper = shallow(<OfferItem offer={offer}/>);

        it("should render the offer position", () => {
            expect(wrapper.find(ListItemText).first().prop("primary")).toEqual(offer.position);
        });
        it("should render the comapny's logo", () => {
            expect(wrapper.find(ListItemAvatar).first().find(Avatar).exists()).toBe(true);
        });
        it("should render the company's name", () => {
            expect(shallow(wrapper.find(ListItemText).first().prop("secondary")).prop("children")).toEqual(offer.company.name);
        });
    });

    describe("interaction", () => {
        it("should call setSelectedOffer onClick", () => {
            const setSelectedOfferMock = jest.fn();
            const wrapper = shallow(<OfferItem offer={offer} setSelectedOffer={setSelectedOfferMock}/>);
            wrapper.find(ListItem).first().simulate("click");

            expect(setSelectedOfferMock).toHaveBeenCalledWith(offer);
        });
    });
});

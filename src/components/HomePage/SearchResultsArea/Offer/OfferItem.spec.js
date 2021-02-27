import React from "react";
import { render, screen, fireEvent } from "../../../../test-utils";
import OfferItem from "./OfferItem";
import Offer from "./Offer";
// import { ListItemText, Avatar, ListItemAvatar, ListItem } from "@material-ui/core";
// import Skeleton from "react-loading-skeleton";

describe("OfferItem", () => {

    const offer = new Offer({
        id: "id1",
        title: "position1",
        company: { name: "company1" },
        location: "location1",
        date: "date1",
        description: "description1",
    });

    describe("render", () => {

        it("should render a loading version when loading=true", () => {
            render(<OfferItem loading />);

            expect(screen.getByTestId("avatar-skeleton")).toBeInTheDocument();
            expect(screen.getByTestId("title-skeleton")).toBeInTheDocument();
            expect(screen.getByTestId("subtitle-skeleton")).toBeInTheDocument();

        });

        it("should render offer information", () => {
            render(<OfferItem offer={offer} />);

            expect(screen.getByText(offer.title)).toBeInTheDocument();
            expect(screen.getByText(offer.company.name)).toBeInTheDocument();
            expect(screen.getByText(offer.location)).toBeInTheDocument();
        });

        // const wrapper = shallow(<OfferItem offer={offer}/>);

        // it("should render the offer position", () => {
        //     expect(wrapper.find(ListItemText).first().prop("primary")).toEqual(offer.title);
        // });
        // it("should render the comapny's logo", () => {
        //     expect(wrapper.find(ListItemAvatar).first().find(Avatar).exists()).toBe(true);
        // });
        // it("should render the company's name", () => {
        //     expect(shallow(wrapper.find(ListItemText).first().prop("secondary")).prop("children")).toEqual(offer.company.name);
        // });
    });

    describe("interaction", () => {
        it("should call setSelectedOffer onClick", () => {
            const setSelectedOfferMock = jest.fn();
            render(<OfferItem offer={offer} setSelectedOffer={setSelectedOfferMock} />);
            fireEvent.click(screen.getByText(offer.title));

            expect(setSelectedOfferMock).toHaveBeenCalledWith(offer);
        });
    });
});

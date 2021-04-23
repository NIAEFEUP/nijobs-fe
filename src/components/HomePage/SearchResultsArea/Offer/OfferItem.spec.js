import React from "react";
import { render, screen, fireEvent } from "../../../../test-utils";
import OfferItem from "./OfferItem";
import Offer from "./Offer";

describe("OfferItem", () => {

    const offer = new Offer({
        id: "id1",
        title: "position1",
        ownerName: "company1",
        location: "location1",
        jobStartDate: (new Date()).toISOString(),
        publishDate: "2021-04-22T22:35:57.177Z",
        publishEndDate: "2021-09-19T23:00:00.000Z",
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
            expect(screen.getByText(offer.ownerName)).toBeInTheDocument();
            expect(screen.getByText(offer.location)).toBeInTheDocument();
        });

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

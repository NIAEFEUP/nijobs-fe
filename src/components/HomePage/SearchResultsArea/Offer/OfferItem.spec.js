import React from "react";
import { render, screen, fireEvent } from "../../../../test-utils";
import OfferItem from "./OfferItem";
import Offer from "./Offer";

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

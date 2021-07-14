import { getByText, render, screen } from "@testing-library/react";
import React from "react";
import Offer from "../Offer/Offer";
import OfferItemsContainer from "./OfferItemsContainer";

describe("OfferItemsContainer", () => {

    describe("render", () => {
        it("should show loading state when loading", () => {
            render(<OfferItemsContainer loading />);
            expect(screen.getAllByTestId("offer-item-loading")).toHaveLength(3);
        });

        it("should show offer items", async () => {
            const offers = [
                new Offer({
                    id: "id1",
                    title: "title1",
                    ownerName: "company1",
                    location: "location1",
                    jobStartDate: (new Date()).toISOString(),
                    publishDate: "2021-04-22T22:35:57.177Z",
                    publishEndDate: "2021-09-19T23:00:00.000Z",
                    description: "description1",
                }),
                new Offer({
                    id: "id2",
                    title: "title2",
                    ownerName: "company1",
                    location: "location2",
                    jobStartDate: (new Date()).toISOString(),
                    publishDate: "2021-04-22T22:35:57.177Z",
                    publishEndDate: "2021-09-19T23:00:00.000Z",
                    description: "description2",
                }),
            ];

            render(
                <OfferItemsContainer
                    offers={offers}
                    loading={false}
                    setSelectedOffer={() => {}}
                />);
            const items = await screen.findAllByTestId("offer-item");
            expect(items).toHaveLength(2);
            expect(getByText(items[0], offers[0].title)).toBeInTheDocument();
            expect(getByText(items[0], offers[0].location)).toBeInTheDocument();
            // Removed while we do dot have the logo in the frontend
            // expect(getByRole(items[0], "img", { name: "company_logo" }).getAttribute("src")).toBe(offers[0].ownerLogo);


            expect(getByText(items[1], offers[1].title)).toBeInTheDocument();
            expect(getByText(items[1], offers[1].location)).toBeInTheDocument();
            // Removed while we do dot have the logo in the frontend
            // expect(getByRole(items[1], "img", { name: "company_logo" }).getAttribute("src")).toBe(offers[1].ownerLogo);
        });
    });
});

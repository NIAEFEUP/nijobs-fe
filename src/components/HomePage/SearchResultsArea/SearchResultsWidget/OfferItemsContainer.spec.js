import { getByRole, getByText, screen } from "@testing-library/react";
import React from "react";
import { render } from "../../../../test-utils";
import Offer from "../Offer/Offer";
import OfferItemsContainer from "./OfferItemsContainer";

describe("OfferItemsContainer", () => {

    describe("render", () => {
        it("should show loading state when loading", () => {
            render(
                <OfferItemsContainer
                    loading
                    setSelectedOfferIdx={() => {}}
                    toggleShowSearchFilters={() => {}}
                    setShouldFetchMoreOffers={() => {}}
                />
            );
            expect(screen.getAllByTestId("offer-item-loading")).toHaveLength(3);
        });

        it("should show offer items", async () => {
            const offers = [
                new Offer({
                    _id: "id1",
                    title: "title1",
                    ownerName: "company1",
                    ownerLogo: "http://res.cloudinary.com/oz/image/upload/f3540_pv.jpg",
                    location: "location1",
                    jobStartDate: (new Date()).toISOString(),
                    publishDate: "2021-04-22T22:35:57.177Z",
                    publishEndDate: "2021-09-19T23:00:00.000Z",
                    description: "description1",
                }),
                new Offer({
                    _id: "id2",
                    title: "title2",
                    ownerName: "company1",
                    ownerLogo: "https://localhost:8000/test1.test2/test3.png",
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
                    setSelectedOfferIdx={() => {}}
                    toggleShowSearchFilters={() => {}}
                />
            );
            const items = await screen.findAllByTestId("offer-item");
            expect(items).toHaveLength(2);
            expect(getByText(items[0], offers[0].title)).toBeInTheDocument();
            expect(getByText(items[0], offers[0].location)).toBeInTheDocument();
            expect(getByRole(items[0], "img", { name: "company_logo" }).getAttribute("src")).toBe(offers[0].ownerLogo);

            expect(getByText(items[1], offers[1].title)).toBeInTheDocument();
            expect(getByText(items[1], offers[1].location)).toBeInTheDocument();
            expect(getByRole(items[1], "img", { name: "company_logo" }).getAttribute("src")).toBe(offers[1].ownerLogo);
        });
    });
});

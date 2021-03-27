import { getByRole, getByText, render, screen } from "@testing-library/react";
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
            expect(getByRole(items[0], "img", { name: "company_logo" }).getAttribute("src")).toBe(offers[0].company.logo);


            expect(getByText(items[1], offers[1].title)).toBeInTheDocument();
            expect(getByText(items[1], offers[1].location)).toBeInTheDocument();
            expect(getByRole(items[1], "img", { name: "company_logo" }).getAttribute("src")).toBe(offers[1].company.logo);
        });
    });
});

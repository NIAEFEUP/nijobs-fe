import React from "react";
import OfferContent from "./OfferContent";
import Offer from "./Offer";
import { renderWithTheme, screen } from "../../../../test-utils";
import { createMuiTheme } from "@material-ui/core";
import LOADING_MESSAGES from "./offerLoadingMessages";
import { format, parseISO } from "date-fns";

describe("OfferContent", () => {
    describe("render", () => {
        const theme = createMuiTheme();
        it("should render placeholder content when no offer selected", () => {

            renderWithTheme(
                <OfferContent offer={null} />,
                { theme }
            );

            expect(screen.getByText("Please select an offer to view the details")).toBeInTheDocument();
        });

        it("should render a valid loading message", () => {
            renderWithTheme(
                <OfferContent loading />,
                { theme }
            );

            expect(LOADING_MESSAGES.includes(screen.getByTestId("random-loading-message").textContent))
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
                jobStartDate: (new Date()).toISOString(),
                description: "description1",
            });

            it("should render offer details", () => {
                renderWithTheme(
                    <OfferContent offer={offer} />,
                    { theme }
                );

                expect(screen.getByRole("heading", { name: offer.title, level: 4 })).toBeInTheDocument();
                expect(screen.getByRole("heading", { name: offer.company.name, level: 6 })).toBeInTheDocument();
                expect(screen.getByText(offer.location)).toBeInTheDocument();
                expect(screen.getByText(format(parseISO(offer.jobStartDate), "yyyy-MM-dd"))).toBeInTheDocument();
                expect(screen.getByText(offer.description)).toBeInTheDocument();

            });

        });
    });
});

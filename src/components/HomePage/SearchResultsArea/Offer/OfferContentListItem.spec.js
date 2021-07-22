import React from "react";
import { render, screen } from "../../../../test-utils";
import OfferContentListItem from "./OfferContentListItem";

describe("OfferContentListItem", () => {

    describe("render", () => {

        it("should render an OfferContentListItem if it has a content array", () => {
            render(
                <OfferContentListItem
                    title="Requirements"
                    content={["Good english communication", "Good problem solving skills"]}
                />
            );

            expect(screen.queryByText("Requirements")).toBeInTheDocument();
            expect(screen.queryByText("Good english communication")).toBeInTheDocument();
            expect(screen.queryByText("Good problem solving skills")).toBeInTheDocument();
        });

        it("should not render a OfferContentListItem if does not have content", () => {
            render(
                <OfferContentListItem
                    title="Requirements"
                />
            );

            expect(screen.queryByText("Requirements")).not.toBeInTheDocument();
        });
    });
});

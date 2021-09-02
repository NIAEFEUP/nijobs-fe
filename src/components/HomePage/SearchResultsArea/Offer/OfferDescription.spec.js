import React from "react";
import { render, screen } from "../../../../test-utils";
import OfferDescription from "./OfferDescription";

describe("OfferDescription", () => {

    describe("render", () => {

        it("should render an OfferDescription", () => {
            const description = "This is a nice offer description.";
            render(
                <OfferDescription content={description} />
            );

            expect(screen.queryByText(description)).toBeInTheDocument();
        });
    });
});

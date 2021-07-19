import React from "react";
import { render, screen } from "../../../../test-utils";
import ChipList from "./ChipList";

describe("ChipList", () => {

    describe("render", () => {

        it("should render a ChipList with capitalized content", () => {
            render(
                <ChipList
                    type="Technologies"
                    content={["CSS", "DART", "FLUTTER"]}
                />
            );

            expect(screen.queryByText("Css")).toBeInTheDocument();
            expect(screen.queryByText("Dart")).toBeInTheDocument();
            expect(screen.queryByText("Flutter")).toBeInTheDocument();
            expect(screen.queryByText("Technologies")).not.toBeInTheDocument();

            render(
                <ChipList
                    type="Fields"
                    content={["MACHINE LEARNING", "FRONTEND", "DEVOPS"]}
                />
            );

            expect(screen.queryByText("Machine Learning")).toBeInTheDocument();
            expect(screen.queryByText("Frontend")).toBeInTheDocument();
            expect(screen.queryByText("Devops")).toBeInTheDocument();
            expect(screen.queryByText("Fields")).not.toBeInTheDocument();
        });

        it("should not render a ChipList if does not have content", () => {
            const { container } =  render(
                <ChipList
                    type="Technologies"
                />
            );

            expect(container.firstChild).toBeNull();
        });
    });
});

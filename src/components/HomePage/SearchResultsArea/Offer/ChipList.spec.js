import React from "react";
import { render, screen } from "../../../../test-utils";
import ChipList from "./ChipList";

describe("ChipList", () => {

    describe("render", () => {

        it("should render a ChipList if it has content", () => {
            render(
                <ChipList
                    type="Technologies"
                    values={["CSS", "Dart", "Flutter"]}
                />
            );

            expect(screen.queryByText("CSS")).toBeInTheDocument();
            expect(screen.queryByText("Dart")).toBeInTheDocument();
            expect(screen.queryByText("Flutter")).toBeInTheDocument();
            expect(screen.queryByText("Technologies")).not.toBeInTheDocument();

            render(
                <ChipList
                    type="Fields"
                    values={["ARTIFICIAL INTELLIGENCE", "FRONTEND", "DEVOPS"]}
                />
            );

            expect(screen.queryByText("Artificial Intelligence")).toBeInTheDocument();
            expect(screen.queryByText("Front-End")).toBeInTheDocument();
            expect(screen.queryByText("Dev-Ops")).toBeInTheDocument();
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

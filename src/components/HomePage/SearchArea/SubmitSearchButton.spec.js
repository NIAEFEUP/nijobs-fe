import React from "react";
import { Fab } from "@material-ui/core";
import SubmitSearchButton from "./SubmitSearchButton";

describe("SubmitSearchButton", () => {
    describe("render", () => {
        it("should render FAB component", () => {
            expect(
                shallow(<SubmitSearchButton />)
                    .find(Fab).exists()
            ).toBe(true);
        });
    });

    describe("interaction", () => {
        it("should call onClick when clicked", () => {
            const onClick = jest.fn();
            const button = shallow(
                <SubmitSearchButton

                    onClick={onClick}
                />);
            button.find(Fab).first().simulate("click");
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });

});

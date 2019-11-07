import React from "react";
import ShowMoreButton from "./ShowMoreButton";
import { IconButton } from "@material-ui/core";

describe("ShowMoreButton", () => {
    describe("render", () => {
        it("should render an IconButton", () => {
            const onClick = () => {};
            expect(shallow(<ShowMoreButton onClick={onClick}/>).find(IconButton).exists()).toBe(true);
        });
    });

    describe("interaction", () => {
        it("should call props.onClick when clicking the IconButton", () => {
            const onClick = jest.fn();
            shallow(<ShowMoreButton onClick={onClick}/>).find(IconButton).first().simulate("click");

            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });

});

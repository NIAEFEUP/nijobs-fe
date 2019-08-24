import React from "react";
import SliderValueTooltip from "./SliderValueTooltip";
import { Tooltip } from "@material-ui/core";

describe("SliderValueTooltip", () => {
    it("should contain a Tooltip with the correct value", () => {
        expect(shallow(
            <SliderValueTooltip
                value={"test"}
                open={false}
            />).find(Tooltip).first().prop("title")
        ).toBe("test");
    });
});

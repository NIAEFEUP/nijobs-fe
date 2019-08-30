import React from "react";
import SliderValueTooltip, { updateRef } from "./SliderValueTooltip";
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

    it("should update the popper ref", () => {
        const updateMock = jest.fn();
        const popperRefMock = {
            current: {
                update: updateMock,
            },
        };

        const popperRefMock2 = {};

        updateRef(popperRefMock);
        updateRef(popperRefMock2);
        expect(updateMock).toHaveBeenCalledTimes(1);
    });
});

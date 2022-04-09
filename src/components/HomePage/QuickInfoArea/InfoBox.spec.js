import React from "react";
import InfoBox from "./InfoBox";
import { Typography } from "@material-ui/core";

describe("InfoBox", () => {
    it("should render info correctly", () => {
        const info = "info";
        expect(shallow(
            <InfoBox>
                {info}
            </InfoBox>).find(Typography).first().prop("children"))
            .toEqual(info);
    });

    it("should render a small variant when size small", () => {
        expect(shallow(<InfoBox size="small">test</InfoBox>).find(Typography).first().prop("variant"))
            .toEqual("body2");

        expect(shallow(<InfoBox size="normal">test</InfoBox>).find(Typography).first().prop("variant"))
            .toEqual("body1");
    });
});

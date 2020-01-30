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
});

import React from "react";
import InfoBox from "./InfoBox";
import { Typography } from "@material-ui/core";

describe("InfoBox", () => {
    it("should render info correctly", () => {
        const info = "info";
        expect(shallow(<InfoBox info={info}/>).find(Typography).first().prop("children"))
            .toEqual(info);
    });
});

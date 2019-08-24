import React from "react";
import InfoBox from "./InfoBox";
import { Typography } from "@material-ui/core";

import homePageStyles from "../HomePage.module.css";

describe("InfoBox", () => {
    it("should render correctly styled div", () => {
        expect(shallow(
            <InfoBox
                info={"info"}
            />).find(`div.${homePageStyles.infoBox}`).exists())
            .toBe(true);
    });

    it("should render info correctly", () => {
        const info = "info";
        expect(mount(<InfoBox info={info}/>).find(Typography).first().prop("children"))
            .toEqual(info);
    });
});

import React, { Component } from "react";
import TopButtonBar from "./TopButtonBar";
import { Grid } from "@material-ui/core";
import BottomButtonBar from "./BottomButtonBar";

class ButtonBar extends Component {
    render() {
        return (
            <Grid
                container
                spacing={40}
            >
                <TopButtonBar />
                <BottomButtonBar />
            </Grid>
        );
    }
}

export default ButtonBar;

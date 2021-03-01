import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";

import { MainMask } from "../components/HomePage/MainMask";
import CenteredComponent from "../components/HomePage/CenteredComponent";

class NotFound extends Component {

    render() {

        return (
            <React.Fragment>
                <MainMask/>
                    <CenteredComponent>

                        <Paper elevation={8} style={{ padding: "24px"}}>
                            <Typography align="center">Sorry, no page could be found at this address (404)</Typography>
                        </Paper>

                    </CenteredComponent>
            </React.Fragment>
        );
    }
}

export default NotFound;


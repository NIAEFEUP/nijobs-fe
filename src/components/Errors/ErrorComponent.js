import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography } from "@material-ui/core";

import { MainMask } from "../HomePage/MainMask";
import CenteredComponent from "../HomePage/CenteredComponent";

const ErrorComponent = ({ Message }) => (
      
    <React.Fragment>
        <MainMask/>
            <CenteredComponent>

                <Paper elevation={8} style={{ padding: "24px"}}>
                    <Typography align="center">{Message}</Typography>
                </Paper>

            </CenteredComponent>
    </React.Fragment>
);

ErrorComponent.propTypes = {
    Message: PropTypes.string
};

export default ErrorComponent;

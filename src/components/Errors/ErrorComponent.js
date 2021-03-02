import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography } from "@material-ui/core";

import { MainMask } from "../HomePage/MainMask";
import CenteredComponent from "../HomePage/CenteredComponent";

const ErrorComponent = ({ message }) => (
    <React.Fragment>
        <MainMask />
        <CenteredComponent>
            <Paper elevation={8} style={{ padding: "24px" }}>
                <Typography align="center">
                    {message}
                </Typography>
            </Paper>
        </CenteredComponent>
    </React.Fragment>
);

ErrorComponent.propTypes = {
    message: PropTypes.string,
};

export default ErrorComponent;

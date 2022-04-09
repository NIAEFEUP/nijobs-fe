import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";

const InfoBox = ({ children, size }) => (
    <Typography
        align="center"
        variant={size === "small" ? "body2" : "body1"}
        gutterBottom
        color="secondary"
    >
        {children}
    </Typography>
);

InfoBox.propTypes = {
    children: PropTypes.string,
    size: PropTypes.string,
};

export default InfoBox;

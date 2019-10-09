import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";

const InfoBox = ({ info }) => (

    <Typography
        align="center"
        variant="body1"
        gutterBottom
        color="secondary"
    >
        {info}
    </Typography>

);

InfoBox.propTypes = {
    info: PropTypes.string,
};

export default InfoBox;

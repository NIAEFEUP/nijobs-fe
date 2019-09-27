import React from "react";
import PropTypes from "prop-types";

import { IconButton } from "@material-ui/core";
import { KeyboardArrowDownRounded } from "@material-ui/icons";

const ShowMoreButton = ({ onClick }) => (

    <IconButton
        onClick={onClick}
    >
        <KeyboardArrowDownRounded
            fontSize="large"
        />
    </IconButton>

);

ShowMoreButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ShowMoreButton;

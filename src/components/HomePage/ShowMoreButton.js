import React from "react";
import PropTypes from "prop-types";

import { IconButton } from "@material-ui/core";
import { KeyboardArrowDownRounded } from "@material-ui/icons";
import scrollButtonAnimation from "../../utils/styles/ScrollButtonAnimations";

const ShowMoreButton = ({ onClick }) => {

    const classes = scrollButtonAnimation();

    return (
        <IconButton
            onClick={onClick}
            className={classes.button}
        >
            <KeyboardArrowDownRounded
                fontSize="large"
            />
        </IconButton>
    );
};

ShowMoreButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ShowMoreButton;

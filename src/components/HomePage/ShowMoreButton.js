import React from "react";
import PropTypes from "prop-types";

import { IconButton } from "@material-ui/core";
import { KeyboardArrowDownRounded } from "@material-ui/icons";
import useScrollButtonAnimation from "../../hooks/useScrollButtonAnimation";

const ShowMoreButton = ({ onClick }) => {

    const classes = useScrollButtonAnimation();

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

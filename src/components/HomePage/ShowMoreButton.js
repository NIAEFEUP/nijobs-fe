import React from "react";
import PropTypes from "prop-types";

import { IconButton, makeStyles } from "@material-ui/core";
import { KeyboardArrowDownRounded } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
    "@keyframes bounce": {
        "80%": {
            transform: "translateY(0)",
        },
        "40%": {
            transform: "translateY(-12px)",
        },
        "60%": {
            transform: "translateY(-5px)",
        },
    },
    button: {
        animation: "$bounce infinite 1.5s",
        "&:hover": {
            animation: "none",
        },
    },
}));

const ShowMoreButton = ({ onClick }) => {

    const classes = useStyles();

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

import React from "react"
import PropTypes from "prop-types";

import { Fab, makeStyles } from "@material-ui/core"
import { PriorityHigh } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "#C33",
        position: "fixed",
        bottom: "6em",
        left: "2em",
        zIndex: 1,
        "&:hover": {
            backgroundColor: "#D88"
        }
    },
    icon: {
        color: "white"
    },
}));

const ShowErrorButton = ({ onClick }) => {
    const classes = useStyles();

    return <Fab
        onClick={onClick}
        className={classes.button}
    >
        <PriorityHigh 
            fontSize="large"
            className={classes.icon}
        />
    </Fab>
};

ShowErrorButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default ShowErrorButton;
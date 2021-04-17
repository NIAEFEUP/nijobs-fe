import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    centered: {
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        height: "auto",
        padding: theme.spacing(16, 0),
        "& > *": {
            minWidth: "60%",
            maxHeight: "none",
        },
    },
}));
const CenteredComponent = ({ children, Component = "div" }) => {
    const classes = useStyles();

    return (
        <Component
            className={classes.centered}
        >
            {children}
        </Component>
    );
};

CenteredComponent.propTypes = {
    children: PropTypes.element.isRequired,
    Component: PropTypes.string,
};

export default CenteredComponent;

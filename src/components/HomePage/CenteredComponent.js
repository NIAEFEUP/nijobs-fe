import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    centered: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& > *": {
            minWidth: "60%",
        },
    },
}));
const CenteredComponent = ({ children, Component = "div" }) => {
    const classes = useStyles();

    return (
        <Component className={classes.centered}>
            {children}
        </Component>
    );
};

CenteredComponent.propTypes = {
    children: PropTypes.element.isRequired,
    Component: PropTypes.string,
};

export default CenteredComponent;

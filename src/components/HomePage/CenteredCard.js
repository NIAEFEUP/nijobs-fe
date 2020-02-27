import React from "react";
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
const CenteredCard = ({ children, Component = "div" }) => {
    const classes = useStyles();

    return (
        <Component className={classes.centered}>
            {children}
        </Component>
    );
};

export default CenteredCard;

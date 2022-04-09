import React from "react";
import PropTypes from "prop-types";
import { Dialog, makeStyles } from "@material-ui/core";
import Navbar from "../Navbar";
import ContactSection from "./ContactSection";

const useStyles = makeStyles(() => ({
    dialog: {
        display: "flex",
        flexDirection: "column",
    },
    dialogContent: {
        display: "flex",
        flexDirection: "column",
        flex: "1 0 100vh",
    },
}));

const MobileLayout = ({ children, pageTitle }) => {
    const classes = useStyles();
    return (
        <Dialog
            fullScreen
            open
        >
            <div className={classes.dialogContent}>
                <Navbar title={pageTitle} position="relative" />
                {children}
            </div>
            <ContactSection />
        </Dialog>
    );
};

MobileLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    pageTitle: PropTypes.string,
};

export default MobileLayout;

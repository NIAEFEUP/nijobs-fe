import React from "react";
import { Dialog, makeStyles } from "@material-ui/core";
import Navbar from "../Navbar";
import ContactSection from "./ContactSection";

const useStyles = makeStyles(() => ({
    dialogContent: {
        minHeight: "100vh",
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

export default MobileLayout;

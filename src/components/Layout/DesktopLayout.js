import React from "react";
import PropTypes from "prop-types";
import { Card, makeStyles } from "@material-ui/core";
import CenteredComponent from "../HomePage/CenteredComponent";
import { MainMask } from "../HomePage/MainMask";
import Navbar from "../Navbar";
import ContactSection from "./ContactSection";

const useStyles = makeStyles((theme) => ({
    content: {
        maxWidth: theme.breakpoints.values.lg,
    },
}));

const DesktopLayout = ({ children, showHomePageLink }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Navbar showHomePageLink={showHomePageLink} desktopLayout />
            <MainMask />
            <CenteredComponent>
                <Card className={classes.content}>
                    {children}
                </Card>
            </CenteredComponent>
            <ContactSection />
        </React.Fragment>
    );
};

DesktopLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    showHomePageLink: PropTypes.bool,
};

export default DesktopLayout;

import React from "react";
import PropTypes from "prop-types";
import { Card } from "@material-ui/core";
import CenteredComponent from "../HomePage/CenteredComponent";
import { MainMask } from "../HomePage/MainMask";
import Navbar from "../Navbar";
import ContactSection from "./ContactSection";

const DesktopLayout = ({ children, showHomePageLink }) => (
    <React.Fragment>
        <Navbar showHomePageLink={showHomePageLink} desktopLayout />
        <MainMask />
        <CenteredComponent>
            <Card>
                {children}
            </Card>
        </CenteredComponent>
        <ContactSection />

    </React.Fragment>
);

DesktopLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    showHomePageLink: PropTypes.bool,
};

export default DesktopLayout;

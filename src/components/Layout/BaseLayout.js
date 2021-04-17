import React from "react";
import PropTypes from "prop-types";
import { MainMask } from "../HomePage/MainMask";
import Navbar from "../Navbar";
import ContactSection from "./ContactSection";

const BaseLayout = ({ children, showHomePageLink }) => (
    <React.Fragment>
        <Navbar showHomePageLink={showHomePageLink} desktopLayout />
        <MainMask />
        {children}
        <ContactSection />

    </React.Fragment>
);

BaseLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    showHomePageLink: PropTypes.bool,
};

export default BaseLayout;

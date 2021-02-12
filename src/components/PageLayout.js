import React from "react";
import ContactSection from "./HomePage/ContactSection";
import propTypes from "prop-types";
import Navbar from "./Navbar/index";

const PageLayout = (props) => (
    <div>
        <Navbar showHomePageLink={props.showHomePageLink} />
        {props.children}
        <ContactSection />
    </div>
);

PageLayout.propTypes = {
    children: propTypes.any,
    showHomePageLink: propTypes.bool,
};

export default PageLayout;

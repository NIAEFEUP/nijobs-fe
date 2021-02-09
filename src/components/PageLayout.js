import React from "react";
import ContactSection from "./HomePage/ContactSection";
import propTypes from "prop-types";
import Navbar from "./Navbar/index";

const PageLayout = (props) => (
    <div>
        <Navbar />
        {props.children}
        <ContactSection />
    </div>
);

PageLayout.propTypes = {
    children: propTypes.any,
};

export default PageLayout;

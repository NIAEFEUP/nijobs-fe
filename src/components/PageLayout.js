import React from "react";
import ContactSection from "./HomePage/ContactSection";
import propTypes from "prop-types";

const PageLayout = (props) => (
    <div>
        {props.children}
        <ContactSection />
    </div>
);

PageLayout.propTypes = {
    children: propTypes.any,
};

export default PageLayout;

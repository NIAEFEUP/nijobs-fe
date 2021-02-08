import React, { Component } from "react";
import ContactSection from "./HomePage/ContactSection";
import propTypes from "prop-types";

class PageLayout extends Component {

    render() {
        return (
            <div>
                {this.props.children}
                <ContactSection />
            </div>
        );
    }
}

PageLayout.propTypes = {
    children: propTypes.isRequired,
};

export default PageLayout;

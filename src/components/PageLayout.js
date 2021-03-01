import React from "react";
import ContactSection from "./HomePage/ContactSection";
import PropTypes from "prop-types";
import Navbar from "./Navbar/index";
import { useMobile } from "../utils/media-queries";
import { Dialog } from "@material-ui/core";

const PageLayout = ({ children, showHomePageLink = true, pageTitle, forceDesktopLayout = false }) => {

    if ((!useMobile()) || forceDesktopLayout) {
        return (
            <div>
                <Navbar showHomePageLink={showHomePageLink} />
                {children}
                <ContactSection />
            </div>
        );
    } else {
        return (
            <Dialog
                fullScreen
                open
                // onClose={handleDialogClose}
                // TransitionComponent={Transition}
            >
                <Navbar title={pageTitle} position="relative" />
                {children}
                <ContactSection />
            </Dialog>
        );
    }
};

PageLayout.propTypes = {
    children: PropTypes.element.isRequired,
    showHomePageLink: PropTypes.bool,
    forceDesktopLayout: PropTypes.bool,
    pageTitle: PropTypes.string,
};

export default PageLayout;
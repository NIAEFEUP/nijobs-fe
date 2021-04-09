import React, { useEffect } from "react";
import ContactSection from "./HomePage/ContactSection";
import PropTypes from "prop-types";
import Navbar from "./Navbar/index";
import { useMobile } from "../utils/media-queries";
import { Dialog } from "@material-ui/core";
import useComponentController from "../hooks/useComponentController";

const PageLayout = ({
    children,
    showHomePageLink = true,
    pageTitle,
    forceDesktopLayout = false,
    controller,
    controllerProps,
    // eslint-disable-next-line react/prop-types
    context,
}) => {

    const { ContextProvider, contextProviderProps } = useComponentController(controller, controllerProps, context);

    useEffect(() => {
        document.title = pageTitle ? `${pageTitle} - NIJobs` : "NIJobs";
    }, [pageTitle]);

    return (
        <ContextProvider {...contextProviderProps}>
            {(!useMobile()) || forceDesktopLayout ?
                <div>
                    <Navbar showHomePageLink={showHomePageLink} forceDesktopLayout={forceDesktopLayout} />
                    {children}
                    <ContactSection />
                </div>
                :
                <Dialog
                    fullScreen
                    open
                >
                    <Navbar title={pageTitle} position="relative" />
                    {children}
                    <ContactSection />
                </Dialog>
            }
        </ContextProvider>
    );
};

PageLayout.propTypes = {
    children: PropTypes.element.isRequired,
    showHomePageLink: PropTypes.bool,
    forceDesktopLayout: PropTypes.bool,
    pageTitle: PropTypes.string,
    controller: PropTypes.func,
    controllerProps: PropTypes.object,
};

export default PageLayout;

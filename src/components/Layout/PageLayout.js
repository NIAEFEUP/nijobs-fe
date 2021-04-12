import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useMobile } from "../../utils/media-queries";
import useComponentController from "../../hooks/useComponentController";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

export const LayoutType = Object.freeze({
    NONE: "NONE",
    DESKTOP: "DESKTOP",
    MOBILE: "MOBILE",
});

const LayoutWrappers = Object.freeze({
    NONE: React.Fragment, // TODO -> Should be a component with navbar, mask and footer
    DESKTOP: DesktopLayout,
    MOBILE: MobileLayout,
});

const PageLayout = ({
    children,
    showHomePageLink = true,
    pageTitle,
    forceDesktopLayout = false,
    controller,
    controllerProps,
    layout = LayoutType.NONE,
    shouldShowMobile,
    // eslint-disable-next-line react/prop-types
    context,
}) => {

    const { ContextProvider, contextProviderProps, ...contextValues } = useComponentController(controller, controllerProps, context);

    useEffect(() => {
        document.title = pageTitle ? `${pageTitle} - NIJobs` : "NIJobs";
    }, [pageTitle]);

    const isMobileSize = useMobile();
    const shouldUseMobileLayout = (shouldShowMobile === undefined) ? isMobileSize : shouldShowMobile({ ...contextValues, isMobileSize });

    const LayoutWrapper = LayoutWrappers[(!shouldUseMobileLayout || forceDesktopLayout) ? layout : LayoutType.MOBILE];

    return (
        <ContextProvider {...contextProviderProps}>
            <LayoutWrapper showHomePageLink={showHomePageLink} pageTitle={pageTitle}>
                {children}
            </LayoutWrapper>
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
    layout: PropTypes.oneOf(Object.values(LayoutType)),
    shouldShowMobile: PropTypes.func,
};

export default PageLayout;

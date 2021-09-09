import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useMobile } from "../../utils/media-queries";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
import BaseLayout from "./BaseLayout";

export const DefaultContext = React.createContext();

export const LayoutType = Object.freeze({
    NONE: "NONE",
    DESKTOP: "DESKTOP",
    MOBILE: "MOBILE",
});

const LayoutWrappers = Object.freeze({
    NONE: BaseLayout,
    DESKTOP: DesktopLayout,
    MOBILE: MobileLayout,
});

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}

const PageLayout = ({
    children,
    showHomePageLink = true,
    pageTitle,
    forceDesktopLayout = false,
    layout = LayoutType.NONE,
    shouldShowMobile,
    // eslint-disable-next-line react/prop-types
    context,
}) => {

    useEffect(() => {
        document.title = pageTitle ? `${pageTitle} - NIJobs` : "NIJobs";
    }, [pageTitle]);

    const usedContext = context ? context : DefaultContext;
    const contextValues = useContext(usedContext);

    const isMobileSize = useMobile();
    const shouldUseMobileLayout = (shouldShowMobile === undefined) ? isMobileSize : shouldShowMobile({ ...contextValues, isMobileSize });

    const LayoutWrapper = LayoutWrappers[(!shouldUseMobileLayout || forceDesktopLayout) ? layout : LayoutType.MOBILE];

    return (
        <>
            <ScrollToTopOnMount />
            <LayoutWrapper showHomePageLink={showHomePageLink} pageTitle={pageTitle}>
                {children}
            </LayoutWrapper>
        </>
    );
};

PageLayout.propTypes = {
    children: PropTypes.element.isRequired,
    showHomePageLink: PropTypes.bool,
    forceDesktopLayout: PropTypes.bool,
    pageTitle: PropTypes.string,
    layout: PropTypes.oneOf(Object.values(LayoutType)),
    shouldShowMobile: PropTypes.func,
};

export default PageLayout;

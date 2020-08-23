import React from "react";
import {
    createMatchMedia,
    useDesktop,
    useTablet,
    useMobile,
    useNotMobile,
    DesktopLayout,
    TabletLayout,
    MobileLayout,
    NonMobileLayout,
} from ".";
import { TestComponent, mountWithTheme } from "../../test-utils";
import { createMuiTheme } from "@material-ui/core";

const renderComponentForWidth = (Component, width, theme) => {
    window.matchMedia = createMatchMedia(width);

    return mountWithTheme(
        <Component>
            <div>test</div>
        </Component>,
        theme
    );
};

const renderMediaQueryHooks = (theme, width) => {
    window.matchMedia = createMatchMedia(width);
    let desktop, tablet, mobile, nonMobile;
    mountWithTheme(
        <TestComponent
            callback={() => {
                desktop = useDesktop();
            }}
        />,
        theme
    );
    mountWithTheme(
        <TestComponent
            callback={() => {
                tablet = useTablet();
            }}
        />,
        theme
    );
    mountWithTheme(
        <TestComponent
            callback={() => {
                mobile = useMobile();
            }}
        />,
        theme
    );
    mountWithTheme(
        <TestComponent
            callback={() => {
                nonMobile = useNotMobile();
            }}
        />,
        theme
    );

    return { desktop, tablet, mobile, nonMobile };
};

const renderMediaQueryComponents = (theme, Component) => {

    const wrapperMobile = renderComponentForWidth(Component, 530, theme);
    const wrapperTablet = renderComponentForWidth(Component, 700, theme);
    const wrapperDesktop = renderComponentForWidth(Component, 1200, theme);

    return { wrapperDesktop, wrapperTablet, wrapperMobile };
};

describe("media-query utils", () => {
    const theme = createMuiTheme();
    it("should return true for useDesktop and nonMobile and false for others", () => {

        const { desktop, tablet, mobile, nonMobile } = renderMediaQueryHooks(theme, 1200);

        expect(desktop).toBe(true);
        expect(tablet).toBe(false);
        expect(mobile).toBe(false);
        expect(nonMobile).toBe(true);
    });
    it("should return true for tablet and nonMobile and false for others", () => {

        const { desktop, tablet, mobile, nonMobile } = renderMediaQueryHooks(theme, 720);

        expect(desktop).toBe(false);
        expect(tablet).toBe(true);
        expect(mobile).toBe(false);
        expect(nonMobile).toBe(true);
    });

    it("should return true for mobile and false for others", () => {

        const { desktop, tablet, mobile, nonMobile } = renderMediaQueryHooks(theme, 530);

        expect(desktop).toBe(false);
        expect(tablet).toBe(false);
        expect(mobile).toBe(true);
        expect(nonMobile).toBe(false);
    });

    it("should render children if on desktop", () => {

        const { wrapperDesktop, wrapperTablet, wrapperMobile } = renderMediaQueryComponents(theme, DesktopLayout);

        expect(wrapperDesktop.find("div").exists()).toBe(true);
        expect(wrapperTablet.find("div").exists()).toBe(false);
        expect(wrapperMobile.find("div").exists()).toBe(false);
    });

    it("should render children if on tablet", () => {

        const { wrapperDesktop, wrapperTablet, wrapperMobile } = renderMediaQueryComponents(theme, TabletLayout);

        expect(wrapperDesktop.find("div").exists()).toBe(false);
        expect(wrapperTablet.find("div").exists()).toBe(true);
        expect(wrapperMobile.find("div").exists()).toBe(false);
    });

    it("should render children if on mobile", () => {

        const { wrapperDesktop, wrapperTablet, wrapperMobile } = renderMediaQueryComponents(theme, MobileLayout);

        expect(wrapperDesktop.find("div").exists()).toBe(false);
        expect(wrapperTablet.find("div").exists()).toBe(false);
        expect(wrapperMobile.find("div").exists()).toBe(true);
    });

    it("should render children if not on mobile", () => {

        const { wrapperDesktop, wrapperTablet, wrapperMobile } = renderMediaQueryComponents(theme, NonMobileLayout);

        expect(wrapperDesktop.find("div").exists()).toBe(true);
        expect(wrapperTablet.find("div").exists()).toBe(true);
        expect(wrapperMobile.find("div").exists()).toBe(false);
    });
});

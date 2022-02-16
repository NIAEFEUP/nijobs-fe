import { createTheme } from "@material-ui/core";
import { act, fireEvent } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CookieConsent, COOKIE_ACCEPT_LIFETIME_MONTHS, COOKIE_REJECT_LIFETIME_DAYS } from "./cookieConsent";
import { renderWithTheme } from "./test-utils";
import { initAnalytics, clearAnalytics } from "./utils/analytics";
import { DAY_IN_MS, MONTH_IN_MS } from "./utils/TimeUtils";

jest.mock("./utils/analytics", () => {
    const original = jest.requireActual("./utils/analytics");
    return {
        ...original,
        initAnalytics: jest.fn(),
        clearAnalytics: jest.fn(),
    };
});

describe("Cookie Consent", () => {
    let dateNow;
    const theme = createTheme();

    const COOKIE_MESSAGE = "This website uses optional cookies to improve user experience";

    beforeAll(() => {
        dateNow = Date.now;
        Date.now = () => 10000;
    });

    afterAll(() => {
        Date.now = dateNow;
    });

    afterEach(() => jest.clearAllMocks());

    it("should open if not present in local storage", () => {
        localStorage.getItem.mockReturnValue(null);

        const wrapper = renderWithTheme(
            <CookieConsent />,
            { theme }
        );

        expect(wrapper.getByText(COOKIE_MESSAGE));
    });

    it("should open if accepted date already past", () => {
        localStorage.getItem.mockReturnValue({
            accepted: true,
            expires: Date.now() - 1000,
        });
        const wrapper = renderWithTheme(
            <CookieConsent />,
            { theme }
        );

        expect(wrapper.getByText(COOKIE_MESSAGE));
    });

    it("should not open if accepted date not past", () => {
        localStorage.getItem.mockReturnValue({
            accepted: true,
            expires: Date.now() + 1000,
        });
        const wrapper = renderWithTheme(
            <CookieConsent />,
            { theme }
        );

        expect(wrapper.queryByText(COOKIE_MESSAGE)).not.toBeInTheDocument();
    });

    it("should not open if rejection date not past", () => {
        localStorage.getItem.mockReturnValue({
            accepted: false,
            expires: Date.now() + 1000,
        });
        const wrapper = renderWithTheme(
            <CookieConsent />,
            { theme }
        );

        expect(wrapper.queryByText(COOKIE_MESSAGE)).not.toBeInTheDocument();
    });

    it("should initialize google analytics if accepted", () => {
        localStorage.getItem.mockReturnValue({
            accepted: true,
            expires: Date.now() + 1000,
        });

        renderWithTheme(
            <CookieConsent />,
            { theme }
        );

        expect(initAnalytics).toHaveBeenCalledTimes(1);
        expect(clearAnalytics).toHaveBeenCalledTimes(0);
    });

    it("should remove cookies if already rejected", () => {
        localStorage.getItem.mockReturnValue({
            accepted: false,
            expires: Date.now() + 1000,
        });

        renderWithTheme(
            <CookieConsent />,
            { theme }
        );

        expect(initAnalytics).toHaveBeenCalledTimes(0);
        expect(clearAnalytics).toHaveBeenCalledTimes(1);
    });

    it("should accept cookies and initialize google analytics", async () => {
        localStorage.getItem.mockReturnValue(null);

        const wrapper = renderWithTheme(
            <CookieConsent />,
            { theme }
        );

        const acceptButton = wrapper.getByText("Accept");

        await act(async () => {
            await fireEvent.click(acceptButton);
        });

        expect(clearAnalytics).toHaveBeenCalledTimes(0);
        expect(initAnalytics).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "non-essential-cookies-enablement",
            {
                accepted: true,
                expires: Date.now() + (COOKIE_ACCEPT_LIFETIME_MONTHS * MONTH_IN_MS),
            }
        );
    });

    it("should open cookies usage", async () => {
        localStorage.getItem.mockReturnValue(null);

        const wrapper = renderWithTheme(
            <BrowserRouter>
                <CookieConsent />
            </BrowserRouter>,
            { theme }
        );

        const cookiesButton = wrapper.getByText("Learn how we use cookies");

        await act(async () => {
            await fireEvent.click(cookiesButton);
        });

        await new Promise((r) => setTimeout(r, 200));


        expect(wrapper.queryByText(COOKIE_MESSAGE)).not.toBeInTheDocument();

        expect(wrapper.getByText("Why do we use cookies?"));
    });

    it("should remove cookies and not initialize google analytics", async () => {
        localStorage.getItem.mockReturnValue(null);

        const wrapper = renderWithTheme(
            <BrowserRouter>
                <CookieConsent />
            </BrowserRouter>,
            { theme }
        );

        const cookiesButton = wrapper.getByText("Learn how we use cookies");

        await act(async () => {
            await fireEvent.click(cookiesButton);
        });

        const rejectButton = wrapper.getByText("Use only essential cookies");

        await act(async () => {
            await fireEvent.click(rejectButton);
        });

        expect(initAnalytics).toHaveBeenCalledTimes(0);
        expect(clearAnalytics).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "non-essential-cookies-enablement",
            {
                accepted: false,
                expires: Date.now() + (COOKIE_REJECT_LIFETIME_DAYS * DAY_IN_MS),
            }
        );
    });

    it("should close snackbar after accepting cookies", async () => {
        localStorage.getItem.mockReturnValue(null);

        const wrapper = renderWithTheme(
            <CookieConsent />,
            { theme }
        );

        const acceptButton = wrapper.getByText("Accept");

        await act(async () => {
            await fireEvent.click(acceptButton);
        });

        // Snackbar takes some time to close after closing because of animation
        await new Promise((r) => setTimeout(r, 200));


        expect(wrapper.queryByText(COOKIE_MESSAGE)).not.toBeInTheDocument();
    });


    it("should close dialog after rejecting cookies", async () => {
        localStorage.getItem.mockReturnValue(null);

        const wrapper = renderWithTheme(
            <BrowserRouter>
                <CookieConsent />
            </BrowserRouter>,
            { theme }
        );

        const cookiesButton = wrapper.getByText("Learn how we use cookies");

        await act(async () => {
            await fireEvent.click(cookiesButton);
        });

        const rejectButton = wrapper.getByText("Use only essential cookies");

        await act(async () => {
            await fireEvent.click(rejectButton);
        });

        await new Promise((r) => setTimeout(r, 200));

        expect(wrapper.queryByText(COOKIE_MESSAGE)).not.toBeInTheDocument();
    });
});

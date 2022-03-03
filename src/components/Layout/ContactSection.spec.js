import React from "react";
import ContactSection from "./ContactSection";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/core";
import AppTheme from "../../AppTheme";
import { BrowserRouter } from "react-router-dom";
import Constants from "../../utils/Constants";

describe("ContactSection", () => {
    describe("render", () => {
        it("check mail button link", () => {
            const { queryByTitle } = render(
                <BrowserRouter>
                    <ThemeProvider theme={AppTheme}>
                        <ContactSection />
                    </ThemeProvider>
                </BrowserRouter>);

            const btn = queryByTitle("email");
            expect(btn.getAttribute("href")).toBe(`mailto:${Constants.CONTACT_US_EMAIL}`);
        });

        it("check website button link", () => {
            const { queryByTitle } = render(
                <BrowserRouter>
                    <ThemeProvider theme={AppTheme}>
                        <ContactSection />
                    </ThemeProvider>
                </BrowserRouter>);

            const btn = queryByTitle("website");
            expect(btn.getAttribute("href")).toBe("https://ni.fe.up.pt");
        });

        it("check facebook button link", () => {
            const { queryByTitle } = render(
                <BrowserRouter>
                    <ThemeProvider theme={AppTheme}>
                        <ContactSection />
                    </ThemeProvider>
                </BrowserRouter>);

            const btn = queryByTitle("facebook");
            expect(btn.getAttribute("href")).toBe("https://facebook.com/NIAEFEUP/");
        });

        it("check github button link", () => {
            const { queryByTitle } = render(
                <BrowserRouter>
                    <ThemeProvider theme={AppTheme}>
                        <ContactSection />
                    </ThemeProvider>
                </BrowserRouter>);

            const btn = queryByTitle("github");
            expect(btn.getAttribute("href")).toBe("https://github.com/NIAEFEUP");
        });

        it("check instagram button link", () => {
            const { queryByTitle } = render(
                <BrowserRouter>
                    <ThemeProvider theme={AppTheme}>
                        <ContactSection />
                    </ThemeProvider>
                </BrowserRouter>);

            const btn = queryByTitle("instagram");
            expect(btn.getAttribute("href")).toBe("https://www.instagram.com/niaefeup/");
        });

        it("check twitter button link", () => {
            const { queryByTitle } = render(
                <BrowserRouter>
                    <ThemeProvider theme={AppTheme}>
                        <ContactSection />
                    </ThemeProvider>
                </BrowserRouter>);

            const btn = queryByTitle("twitter");
            expect(btn.getAttribute("href")).toBe("https://twitter.com/niaefeup");
        });

        it("check linkedin button link", () => {
            const { queryByTitle } = render(
                <BrowserRouter>
                    <ThemeProvider theme={AppTheme}>
                        <ContactSection />
                    </ThemeProvider>
                </BrowserRouter>);

            const btn = queryByTitle("linkedin");
            expect(btn.getAttribute("href")).toBe("https://pt.linkedin.com/company/nifeup");
        });

        it("check rules button link", () => {
            const { queryByTitle } = render(
                <BrowserRouter>
                    <ThemeProvider theme={AppTheme}>
                        <ContactSection />
                    </ThemeProvider>
                </BrowserRouter>);

            const btn = queryByTitle("rules");
            expect(btn.getAttribute("href")).toBe("/rules");
        });

        it("check terms and conditions button link", () => {
            const { queryByTitle } = render(
                <BrowserRouter>
                    <ThemeProvider theme={AppTheme}>
                        <ContactSection />
                    </ThemeProvider>
                </BrowserRouter>);

            const btn = queryByTitle("terms");
            expect(btn.getAttribute("href")).toBe("/terms");
        });

        it("check privacy policy button link", () => {
            const { queryByTitle } = render(
                <BrowserRouter>
                    <ThemeProvider theme={AppTheme}>
                        <ContactSection />
                    </ThemeProvider>
                </BrowserRouter>);

            const btn = queryByTitle("privacy-policy");
            expect(btn.getAttribute("href")).toBe("/privacy-policy");
        });
    });
});

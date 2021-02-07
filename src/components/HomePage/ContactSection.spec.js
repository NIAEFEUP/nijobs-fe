import React from "react";
import ContactSection from "./ContactSection";
<<<<<<< HEAD
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/core";
import AppTheme from "../../AppTheme";

describe("ContactSection", () => {
    describe("render", () => {
        it("check mail button link", () => {
            const { queryByTitle } = render(
                <ThemeProvider theme={AppTheme}>
                    <ContactSection />
                </ThemeProvider>);

            const btn = queryByTitle("email");
            expect(btn.getAttribute("href")).toBe("mailto:ni@aefeup.pt");
        });

        it("check website button link", () => {
            const { queryByTitle } = render(
                <ThemeProvider theme={AppTheme}>
                    <ContactSection />
                </ThemeProvider>);

            const btn = queryByTitle("website");
            expect(btn.getAttribute("href")).toBe("https://ni.fe.up.pt");
        });

        it("check facebook button link", () => {
            const { queryByTitle } = render(
                <ThemeProvider theme={AppTheme}>
                    <ContactSection />
                </ThemeProvider>);

            const btn = queryByTitle("facebook");
            expect(btn.getAttribute("href")).toBe("https://facebook.com/NIAEFEUP/");
        });

        it("check github button link", () => {
            const { queryByTitle } = render(
                <ThemeProvider theme={AppTheme}>
                    <ContactSection />
                </ThemeProvider>);

            const btn = queryByTitle("github");
            expect(btn.getAttribute("href")).toBe("https://github.com/NIAEFEUP");
        });

        it("check instagram button link", () => {
            const { queryByTitle } = render(
                <ThemeProvider theme={AppTheme}>
                    <ContactSection />
                </ThemeProvider>);

            const btn = queryByTitle("instagram");
            expect(btn.getAttribute("href")).toBe("https://www.instagram.com/niaefeup/");
        });

        it("check twitter button link", () => {
            const { queryByTitle } = render(
                <ThemeProvider theme={AppTheme}>
                    <ContactSection />
                </ThemeProvider>);

            const btn = queryByTitle("twitter");
            expect(btn.getAttribute("href")).toBe("https://twitter.com/niaefeup");
        });

        it("check linkedin button link", () => {
            const { queryByTitle } = render(
                <ThemeProvider theme={AppTheme}>
                    <ContactSection />
                </ThemeProvider>);

            const btn = queryByTitle("linkedin");
            expect(btn.getAttribute("href")).toBe("https://pt.linkedin.com/company/nifeup");
=======
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";
// import HomePage from "../../pages/HomePage";

afterEach(cleanup);

describe("ContactSection", () => {
    describe("render", () => {
        it("renders without crashing", () => {
            const div = document.createElement("div");
            ReactDOM.render(<ContactSection />, div);
        });
    });
    describe("Button hrefs", () => {
        it("check mail button link", () => {
            const { queryByTitle } = render(<ContactSection />);
            const btn = queryByTitle("email");
            expect(btn.getAttribute("href").length > 0);
        });

        it("check website button link", () => {
            const { queryByTitle } = render(<ContactSection />);
            const btn = queryByTitle("website");
            expect(btn.getAttribute("href").length > 0);
        });

        it("check facebook button link", () => {
            const { queryByTitle } = render(<ContactSection />);
            const btn = queryByTitle("facebook");
            expect(btn.getAttribute("href").length > 0);
        });

        it("check github button link", () => {
            const { queryByTitle } = render(<ContactSection />);
            const btn = queryByTitle("github");
            expect(btn.getAttribute("href").length > 0);
        });

        it("check instagram button link", () => {
            const { queryByTitle } = render(<ContactSection />);
            const btn = queryByTitle("instagram");
            expect(btn.getAttribute("href").length > 0);
        });

        it("check twitter button link", () => {
            const { queryByTitle } = render(<ContactSection />);
            const btn = queryByTitle("twitter");
            expect(btn.getAttribute("href").length > 0);
        });

        it("check linkedin button link", () => {
            const { queryByTitle } = render(<ContactSection />);
            const btn = queryByTitle("linkedin");
            expect(btn.getAttribute("href").length > 0);
>>>>>>> Added unit tests, changed the contactPage to contactSection and made it a functional component
        });
    });
});

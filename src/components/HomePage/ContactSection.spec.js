import React from "react";
import ContactSection from "./ContactSection";
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
        });
    });
});

import { render } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import AppTheme from "../../AppTheme";
import RulesPage from "../../pages/RulesPage";

jest.mock("./rules.json", () => ({
    "rules": [
        { "title": "Rule 1", "description": "Description 1", "link": "/", "linkName": "Main Page" },
        { "title": "Rule 2", "description": "Description 2" },
        { "title": "Rule 3", "description": "Description 3" },
    ],
}), { virtual: true });

describe("Rules Page", () => {
    it("should show multiple rules on file", () => {

        const wrapper = render(
            <BrowserRouter>
                <ThemeProvider theme={AppTheme}>
                    <RulesPage />
                </ThemeProvider>
            </BrowserRouter>);

        expect(wrapper.getByText("Rule 1"));
        expect(wrapper.getByText("Description 1"));
        expect(wrapper.getByText("Rule 2"));
        expect(wrapper.getByText("Description 2"));
        expect(wrapper.getByText("Rule 3"));
        expect(wrapper.getByText("Description 3"));

        expect(wrapper.getByText("Main Page").getAttribute("href")).toBe("/");
    });
});

describe("Rules Page test", () => {
    it("Should show Rules Page text", () => {
        const wrapper = render(
            <BrowserRouter>
                <ThemeProvider theme={AppTheme}>
                    <RulesPage />
                </ThemeProvider>
            </BrowserRouter>
        );
        expect(wrapper.queryByText("For further clarification contact us via:")).toBeInTheDocument();
    });
});

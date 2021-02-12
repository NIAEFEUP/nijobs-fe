import React from "react";
import AppRouter from "./AppRouter";
import HomePage from "./pages/HomePage";
import { Route } from "./utils";
import PageLayout from "./components/PageLayout";

describe("AppRouter", () => {
    it("should have a landing route", () => {
        const firstRoute = shallow(<AppRouter />).find(Route).first();
        expect(firstRoute.prop("path")).toEqual("/");
        expect(firstRoute.prop("exact")).toBe(true);
        expect(firstRoute.prop("children")).toEqual(
            <PageLayout showHomePageLink={false}>
                <HomePage/>
            </PageLayout>);
    });
});

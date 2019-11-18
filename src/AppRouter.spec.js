import React from "react";
import AppRouter from "./AppRouter";
import { Route } from "react-router-dom";

describe("AppRouter", () => {
    it("should have a landing route", () => {
        const firstRoute = shallow(<AppRouter />).find(Route).first();
        expect(firstRoute.prop("path")).toEqual("/");
        expect(firstRoute.prop("exact")).toBe(true);
        // expect(firstRoute.find(HomePage).exists()).toBe(true);
    });
});

import React from "react";
import App from "./App";
import Notifier from "./components/Notifications/Notifier";
import AppRouter from "./AppRouter";

describe("App", () => {
    it("should contain a Notifier", () => {
        expect(shallow(<App />).find(Notifier).exists()).toBe(true);
    });

    it("should contain a Router", () => {
        expect(shallow(<App />).find(AppRouter).exists()).toBe(true);
    });
});

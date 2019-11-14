import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

const AppRouter = () => (
    <BrowserRouter basename={`${process.env.REACT_APP_BASE_ROUTE || "/"}`}>
        <Switch>
            <Route
                exact
                path="/"
                component={HomePage}
            />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;

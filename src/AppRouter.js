import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompanyApplicationPage from "./pages/CompanyApplicationPage";
import NotFound from "./pages/NotFound";

const AppRouter = () => (
    <BrowserRouter basename={`${process.env.REACT_APP_BASE_ROUTE || "/"}`}>
        <Switch>
            <Route
                exact
                path="/"
                component={HomePage}
            />
            <Route
                exact
                path="/apply/company"
                component={CompanyApplicationPage}
            />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;

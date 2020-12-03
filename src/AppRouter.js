import React from "react";

import { BrowserRouter, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompanyApplicationPage from "./pages/CompanyApplicationPage";
import ApplicationsReviewPage from "./pages/ApplicationsReviewPage";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import { ProtectedRoute, Route } from "./utils";

const AppRouter = () => (
    <BrowserRouter basename={`${process.env.REACT_APP_BASE_ROUTE || "/"}`}>
        <Switch>
            <Route
                exact
                path="/"
            >
                <HomePage/>
            </Route>
            <Route
                exact
                path="/apply/company"
            >
                <CompanyApplicationPage/>
            </Route>
            <ProtectedRoute
                exact
                path="/review/applications"
                unauthorizedRedirectPath="/"
                unauthorizedRedirectMessage="You are not allowed to access the applications review page."
                authorize={(user) => (user.isAdmin)}
            >
                <ApplicationsReviewPage/>
            </ProtectedRoute>
            <Route
                path="/error"
            >
                <ErrorPage/>
            </Route>
            <Route>
                <NotFound/>
            </Route>
        </Switch>
    </BrowserRouter>
);

export default AppRouter;

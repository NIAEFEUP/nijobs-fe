import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompanyApplicationPage from "./pages/CompanyApplicationPage";
import ApplicationsReviewPage from "./pages/ApplicationsReviewPage";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./utils";

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
            <ProtectedRoute
                exact
                path="/review/applications"
                unauthorizedRedirectPath="/"
                authorize={(user) => user.isAdmin}
            >
                <ApplicationsReviewPage/>
            </ProtectedRoute>
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;

import React from "react";

import { BrowserRouter, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompanyApplicationPage from "./pages/CompanyApplicationPage";
import ApplicationsReviewPage from "./pages/ApplicationsReviewPage";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import { ProtectedRoute, Route } from "./utils";
import PageLayout from "./components/PageLayout";

const AppRouter = () => (
    <BrowserRouter basename={`${process.env.REACT_APP_BASE_ROUTE || "/"}`}>
        <Switch>
            <Route
                exact
                path="/"
            >
                <PageLayout showHomePageLink={false}>
                    <HomePage/>
                </PageLayout>
            </Route>
            <Route
                exact
                path="/apply/company"
            >
                <PageLayout>
                    <CompanyApplicationPage/>
                </PageLayout>
            </Route>
            <ProtectedRoute
                exact
                path="/review/applications"
                unauthorizedRedirectPath="/"
                unauthorizedRedirectMessage="You are not allowed to access the applications review page."
                authorize={(user) => (user.isAdmin)}
            >
                <PageLayout>
                    <ApplicationsReviewPage/>
                </PageLayout>
            </ProtectedRoute>
            <Route
                path="/error"
            >
                <PageLayout>
                    <ErrorPage/>
                </PageLayout>
            </Route>
            <Route>
                <PageLayout>
                    <NotFound/>
                </PageLayout>
            </Route>
        </Switch>
    </BrowserRouter>
);

export default AppRouter;

/* istanbul ignore file */

import React from "react";

import { BrowserRouter, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompanyApplicationPage, {
    CompanyApplicationPageController,
    CompanyApplicationPageControllerContext,
} from "./pages/CompanyApplicationPage";
import ApplicationsReviewPage from "./pages/ApplicationsReviewPage";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import { ProtectedRoute, Route } from "./utils";
import PageLayout, { LayoutType } from "./components/Layout/PageLayout";

const shoudlShowCompanyApplicationMobile = ({ showConfirmationModal, isMobileSize }) => !showConfirmationModal && isMobileSize;

const AppRouter = () => (
    <BrowserRouter basename={`${process.env.REACT_APP_BASE_ROUTE || "/"}`}>
        <Switch>
            <Route
                exact
                path="/"
            >
                <PageLayout showHomePageLink={false} forceDesktopLayout>
                    <HomePage />
                </PageLayout>
            </Route>
            <Route
                exact
                path="/apply/company"
            >
                <PageLayout
                    pageTitle="Company Application"
                    layout={LayoutType.DESKTOP}
                    shouldShowMobile={shoudlShowCompanyApplicationMobile}
                    context={CompanyApplicationPageControllerContext}
                    controller={CompanyApplicationPageController}
                    controllerProps={{ showConfirmation: false }}
                >
                    <CompanyApplicationPage />
                </PageLayout>
            </Route>
            <ProtectedRoute
                exact
                path="/review/applications"
                unauthorizedRedirectPath="/"
                unauthorizedRedirectMessage="You are not allowed to access the applications review page."
                authorize={(user) => (user.isAdmin)}
            >
                <PageLayout pageTitle="Review Applications">
                    <ApplicationsReviewPage />
                </PageLayout>
            </ProtectedRoute>
            <Route
                path="/error"
            >
                <PageLayout forceDesktopLayout pageTitle="Unexpected error">
                    <ErrorPage />
                </PageLayout>
            </Route>
            <Route>
                <PageLayout forceDesktopLayout pageTitle="Page not found">
                    <NotFound />
                </PageLayout>
            </Route>
        </Switch>
    </BrowserRouter>
);

export default AppRouter;

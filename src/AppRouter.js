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
import MyOffersPage from "./pages/MyOffersPage";
import FinishCompanyRegistrationPage, {
    FinishCompanyRegistrationPageController,
    FinishCompanyRegistrationPageControllerContext,
} from "./pages/FinishCompanyRegistrationPage";

/**
 *
 * IMPORTANT: Each PageLayout must have a unique key, in order for the page changes to work correctly.
 * If it doesn't, when changing pages, it will reuse the same PageLayout (reconciliation phase) and only change its contents
 * and if the controller/context is different (which it probably is among pages),
 * it will cause problems like hooks not being called in the same order
 * Obviously, since the controller are differnt, then the hooks might also be different
 *
 */

const shoudlShowCompanyApplicationMobile = ({ showConfirmationModal, isMobileSize }) => !showConfirmationModal && isMobileSize;

const AppRouter = () => (
    <BrowserRouter basename={`${process.env.REACT_APP_BASE_ROUTE || "/"}`}>
        <Switch>
            <Route
                exact
                path="/"
            >
                <PageLayout
                    key="/"
                    showHomePageLink={false}
                    forceDesktopLayout
                    layout={LayoutType.NONE}
                >
                    <HomePage />
                </PageLayout>
            </Route>
            <Route
                exact
                path="/apply/company"
            >
                <PageLayout
                    key="/apply/company"
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
                <PageLayout
                    key="/review/applications"
                    pageTitle="Review Applications"
                    layout={LayoutType.DESKTOP}
                >
                    <ApplicationsReviewPage />
                </PageLayout>
            </ProtectedRoute>
            <ProtectedRoute
                exact
                path="/company/offers/manage"
                unauthorizedRedirectPath="/"
                unauthorizedRedirectMessage="You are not allowed to access the My Offers page"
                authorize={(user) => !!(user?.company)}
            >
                <PageLayout
                    key="/company/offers/manage"
                    pageTitle="My Offers"
                    layout={LayoutType.DESKTOP}
                >
                    <MyOffersPage />
                </PageLayout>
            </ProtectedRoute>
            <Route // change to ProtectedRoute before merging!!!!
                exact
                path="/company/registration/finish"
                unauthorizedRedirectPath="/"
                unauthorizedRedirectMessage="To access this page you must be logged in and have a pending registration."
                authorize={(user) => (user.company && !user.hasFinishedRegistration)}
            >
                <PageLayout
                    key="/company/registration/finish"
                    layout={LayoutType.DESKTOP}
                    pageTitle="Finish Registration"
                    context={FinishCompanyRegistrationPageControllerContext}
                    controller={FinishCompanyRegistrationPageController}
                    controllerProps={{ showConfirmation: false }}
                >
                    <FinishCompanyRegistrationPage />
                </PageLayout>
            </Route>
            <Route
                path="/error"
            >
                <PageLayout
                    key="/error"
                    forceDesktopLayout
                    layout={LayoutType.DESKTOP}
                    pageTitle="Unexpected error"
                >
                    <ErrorPage />
                </PageLayout>
            </Route>
            <Route>
                <PageLayout
                    key="NOT_FOUND"
                    forceDesktopLayout
                    layout={LayoutType.DESKTOP}
                    pageTitle="Page not found"
                >
                    <NotFound />
                </PageLayout>
            </Route>
        </Switch>
    </BrowserRouter>
);

export default AppRouter;

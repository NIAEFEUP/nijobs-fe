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
import OfferPage, { OfferPageController, OfferPageControllerContext } from "./pages/OfferPage";
import { ProtectedRoute, Route } from "./utils";
import PageLayout, { LayoutType } from "./components/Layout/PageLayout";
import {
    FinishCompanyRegistrationController,
    FinishCompanyRegistrationControllerContext,
} from "./components/Company/Registration/Finish/FinishCompanyRegistrationWidget";
import FinishCompanyRegistrationPage from "./pages/FinishCompanyRegistrationPage";
import CompanyOffersManagementPage from "./pages/CompanyOffersManagementPage";

/**
 *
 * IMPORTANT: Each PageLayout must have a unique key, in order for the page changes to work correctly.
 * If it doesn't, when changing pages, it will reuse the same PageLayout (reconciliation phase) and only change its contents
 * and if the controller/context is different (which it probably is among pages),
 * it will cause problems like hooks not being called in the same order
 * Obviously, since the controller are differnt, then the hooks might also be different
 *
 */

const shouldShowCompanyApplicationMobile = ({ showConfirmationModal, isMobileSize }) => !showConfirmationModal && isMobileSize;

const AppRouter = () => (
    <BrowserRouter basename={`${process.env.REACT_APP_BASE_ROUTE || "/"}`}>
        <Switch>
            <Route
                exact
                path="/"
                key="/"
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
                key="/apply/company"
                path="/apply/company"
                context={CompanyApplicationPageControllerContext}
                controller={CompanyApplicationPageController}
                controllerProps={{ showConfirmation: false }}
            >
                <PageLayout
                    key="/apply/company"
                    pageTitle="Company Application"
                    layout={LayoutType.DESKTOP}
                    shouldShowMobile={shouldShowCompanyApplicationMobile}
                    context={CompanyApplicationPageControllerContext}
                >
                    <CompanyApplicationPage />
                </PageLayout>
            </Route>
            <ProtectedRoute
                exact
                key="/review/applications"
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
                key="/company/offers/manage"
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
                    <CompanyOffersManagementPage />
                </PageLayout>
            </ProtectedRoute>
            <ProtectedRoute
                exact
                key="/company/registration/finish"
                path="/company/registration/finish"
                unauthorizedRedirectPath="/"
                unauthorizedRedirectMessage="To access this page you must be logged in and have a pending registration."
                authorize={(user) => (user.company && !user.company.hasFinishedRegistration)}
                context={FinishCompanyRegistrationControllerContext}
                controller={FinishCompanyRegistrationController}
            >
                <PageLayout
                    key="/company/registration/finish"
                    layout={LayoutType.DESKTOP}
                    pageTitle="Finish Registration"
                    context={FinishCompanyRegistrationControllerContext}
                >
                    <FinishCompanyRegistrationPage />
                </PageLayout>
            </ProtectedRoute>
            <Route
                path="/offer/:id"
                key="/offer/:id"
                context={OfferPageControllerContext}
                controller={OfferPageController}
            >
                <PageLayout
                    key="/offer/:id"
                    layout={LayoutType.DESKTOP}
                    pageTitle="Job Offer"
                    context={OfferPageControllerContext}
                >
                    <OfferPage />
                </PageLayout>
            </Route>
            <Route
                path="/error"
                key="/error"
            >
                <PageLayout
                    key="/error"
                    forceDesktopLayout
                    layout={LayoutType.DESKTOP}
                    pageTitle="Unexpected Error"
                >
                    <ErrorPage />
                </PageLayout>
            </Route>
            <Route key="/not_found">
                <PageLayout
                    key="/not_found"
                    forceDesktopLayout
                    layout={LayoutType.DESKTOP}
                    pageTitle="Page Not Found"
                >
                    <NotFound />
                </PageLayout>
            </Route>
        </Switch>
    </BrowserRouter>
);

export default AppRouter;

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
import OfferPage, {
    OfferPageController,
    OfferPageControllerContext,
} from "./pages/OfferPage";
import RulesPage from "./pages/RulesPage";
import { ProtectedRoute, Route } from "./utils";
import PageLayout, { LayoutType } from "./components/Layout/PageLayout";
import {
    FinishCompanyRegistrationController,
    FinishCompanyRegistrationControllerContext,
} from "./components/Company/Registration/Finish/FinishCompanyRegistrationWidget";
import FinishCompanyRegistrationPage from "./pages/FinishCompanyRegistrationPage";
import CompanyOffersManagementPage from "./pages/CompanyOffersManagementPage";
import CreateOfferPage from "./pages/CreateOfferPage";
import {
    CreateOfferController,
    CreateOfferControllerContext,
} from "./components/Offers/New/CreateOfferForm";
import { CookieConsent } from "./cookieConsent";
import {
    EditOfferController,
    EditOfferControllerContext,
} from "./components/Offers/Edit/EditOfferForm";
import EditOfferPage from "./pages/EditOfferPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import ChangeLogPage from "./pages/ChangeLogPage";

/**
 *
 * IMPORTANT: Each PageLayout and Route must have a unique key, in order for the page changes to work correctly.
 * If it doesn't, when changing pages, it will reuse the same PageLayout (reconciliation phase) and only change its contents
 * and if the controller/context is different (which it probably is among pages),
 * it will cause problems like hooks not being called in the same order
 * Obviously, since the controller is different, then the hooks might also be different
 *
 */

const shouldShowCompanyApplicationMobile = ({
    showConfirmationModal,
    isMobileSize,
}) => !showConfirmationModal && isMobileSize;

const AppRouter = () => (
    <BrowserRouter basename={`${process.env.REACT_APP_BASE_ROUTE || "/"}`}>
        <CookieConsent />
        <Switch>
            <Route exact path="/" key="/">
                <PageLayout
                    key="/"
                    showHomePageLink={false}
                    forceDesktopLayout
                    layout={LayoutType.NONE}
                >
                    <HomePage />
                </PageLayout>
            </Route>
            <Route exact path="/privacy-policy" key="/privacy-policy">
                <PageLayout
                    key="/privacy-policy"
                    pageTitle="Privacy Policy"
                    layout={LayoutType.DESKTOP}
                >
                    <PrivacyPolicyPage />
                </PageLayout>
            </Route>
            <Route
                exact
                path="/terms-and-conditions"
                key="/terms-and-conditions"
            >
                <PageLayout
                    key="/terms-and-conditions"
                    pageTitle="Terms and Conditions"
                    layout={LayoutType.DESKTOP}
                >
                    <TermsAndConditionsPage />
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
            <Route exact path="/rules">
                <PageLayout
                    key="/rules"
                    pageTitle="Rules"
                    layout={LayoutType.DESKTOP}
                >
                    <RulesPage />
                </PageLayout>
            </Route>
            <ProtectedRoute
                exact
                key="/review/applications"
                path="/review/applications"
                unauthorizedRedirectPath="/"
                unauthorizedRedirectMessage="You are not allowed to access the applications review page."
                authorize={(user) => user.isAdmin}
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
                key="/company/registration/finish"
                path="/company/registration/finish"
                unauthorizedRedirectPath="/"
                unauthorizedRedirectMessage="To access this page you must be logged in and have a pending registration."
                authorize={(user) =>
                    user.company && !user.company.hasFinishedRegistration
                }
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
            <ProtectedRoute
                exact
                key="/company/offers/manage"
                path="/company/offers/manage"
                unauthorizedRedirectPath="/"
                unauthorizedRedirectMessage="You are not allowed to access the My Offers page"
                authorize={(user) => !!user?.company}
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
                path="/offer/:id/edit"
                key="/offer/:id/edit"
                unauthorizedRedirectPath="/"
                unauthorizedRedirectMessage="You are not allowed to edit this offer."
                authorize={(user) => !!(user?.company || user?.isAdmin)}
                context={EditOfferControllerContext}
                controller={EditOfferController}
            >
                <PageLayout
                    key="/offer/:id/edit"
                    layout={LayoutType.DESKTOP}
                    pageTitle="Edit Offer"
                    context={EditOfferControllerContext}
                >
                    <EditOfferPage />
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
                path="/offers/new"
                key="/offers/new"
                context={CreateOfferControllerContext}
                controller={CreateOfferController}
            >
                <PageLayout
                    key="/offers/new"
                    layout={LayoutType.DESKTOP}
                    pageTitle="Create Offer"
                    context={CreateOfferControllerContext}
                >
                    <CreateOfferPage />
                </PageLayout>
            </Route>
            <Route exact path="/whatsNew">
                <PageLayout
                    key="/changeLog"
                    pageTitle="Changelog"
                    layout={LayoutType.DESKTOP}
                >
                    <ChangeLogPage />
                </PageLayout>
            </Route>
            <Route path="/error" key="/error">
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

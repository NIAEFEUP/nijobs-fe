import React from "react";
import PropTypes from "prop-types";

import { BrowserRouter, Switch, Route as BaseRoute, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompanyApplicationPage from "./pages/CompanyApplicationPage";
import ApplicationsReviewPage from "./pages/ApplicationsReviewPage";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import { ProtectedRoute } from "./utils";
import { addSnackbar } from "./actions/notificationActions";
import { connect } from "react-redux";

// This allows any component to have redirect info notifications,
// without having to write the same logic on each component
const BaseRedirectInfoProvider = ({ addSnackbar, children }) => {
    const redirectInfo = useLocation();
    if (redirectInfo?.state?.message) {
        addSnackbar({ message: redirectInfo.state.message });
    }

    return (
        <>
            {children}
        </>
    );
};

BaseRedirectInfoProvider.propTypes = {
    addSnackbar: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});
const RedirectInfoProvider = connect(mapStateToProps, mapDispatchToProps)(BaseRedirectInfoProvider);

export const Route = ({ children, ...props }) => (
    <BaseRoute
        {...props}
    >
        <RedirectInfoProvider>
            {children}
        </RedirectInfoProvider>
    </BaseRoute>
);
Route.propTypes = {
    children: PropTypes.element.isRequired,
};


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
                // authorize={(user) => user.isAdmin}
                authorize={() => true}
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

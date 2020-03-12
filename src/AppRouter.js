import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompanyApplicationPage from "./pages/CompanyApplicationPage";
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

            {/* THE FOLLOWING IS A DEMO, REMOVE IT LATER PLEASE */}
            <ProtectedRoute
                exact
                path="/private"
                unauthorizedRedirectPath="/"
                // this is useful for things like user.type === admin or user.type == company
                authorize={(user) => user.email === "angelo@niaefeup.com"}
            >
                <HomePage/>
            </ProtectedRoute>
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;

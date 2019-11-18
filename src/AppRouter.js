/* istanbul ignore file */
// ReactDOMServer does not support Suspense for now, so ignoring coverage

import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const AppRouter = () => (
    <BrowserRouter basename={`${process.env.REACT_APP_BASE_ROUTE || "/"}`}>
        <Suspense fallback={<LinearProgress color="secondary"/>}>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Suspense>
    </BrowserRouter>
);


export default AppRouter;

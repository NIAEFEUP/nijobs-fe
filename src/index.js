/* istanbul ignore file */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppTheme from "./AppTheme.js";

import App from "./App";

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={AppTheme}>
            <SnackbarProvider maxSnack={3}>
                <CssBaseline />
                <App />
            </SnackbarProvider>
        </ThemeProvider>
    </BrowserRouter>, document.getElementById("root"));

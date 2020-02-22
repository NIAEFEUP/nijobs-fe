/* istanbul ignore file */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/styles";
import AppTheme from "./AppTheme.js";

import "./index.css";
import App from "./App";

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={AppTheme}>
            <SnackbarProvider maxSnack={3}>
                <App />
            </SnackbarProvider>
        </ThemeProvider>
    </BrowserRouter>, document.getElementById("root"));

export const API_HOSTNAME = process.env.REACT_APP_API_HOSTNAME;

/* istanbul ignore file */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/styles";
import AppTheme from "./AppTheme.js";

import "./index.css";
import App from "./App";

import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import compose from "jss-plugin-compose";

const jss = create({
    plugins: [...jssPreset().plugins, compose()],
});


ReactDOM.render(
    <BrowserRouter>
        <StylesProvider jss={jss}>
            <ThemeProvider theme={AppTheme} jss>
                <SnackbarProvider maxSnack={3}>
                    <App />
                </SnackbarProvider>
            </ThemeProvider>
        </StylesProvider>
    </BrowserRouter>, document.getElementById("root"));

/* istanbul ignore file */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AppTheme from "./AppTheme.js";

import "./index.css";
import App from "./App";

import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import compose from "jss-plugin-compose";
import { loadDevTools } from "./devTools.js";
import { initAnalytics } from "./utils/analytics";

const jss = create({
    plugins: [...jssPreset().plugins, compose()],
});

loadDevTools().then(() => {
    initAnalytics();
    ReactDOM.render(
        <StylesProvider jss={jss}>
            <ThemeProvider theme={AppTheme}>
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <SnackbarProvider maxSnack={3}>
                            <App />
                        </SnackbarProvider>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>
            </ThemeProvider>
        </StylesProvider>,
        document.getElementById("root")
    );
});

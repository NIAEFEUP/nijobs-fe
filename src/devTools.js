/* istanbul ignore file */

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import AppTheme from "./AppTheme.js";

import config, { INITIAL_API_HOSTNAME, INITIAL_LOCATION_SERVICE_HOSTNAME } from "./config.js";

export const loadDevTools = () => new Promise((resolve) => {
    // Allow dev tools in all envs but prod, unless it's explicitly enabled and not explicitly disabled
    const devToolsActive =
        process.env.REACT_APP_ALLOW_DEV_TOOLS !== "false" &&
        (process.env.REACT_APP_ALLOW_DEV_TOOLS === "true" || process.env.NODE_ENV !== "production");

    if (devToolsActive) {
        install();
        resolve();
    } else {
        resolve();
    }
});

const useDevToolsStyle = makeStyles((theme) => ({
    bar: {
        backgroundColor: theme.palette.dark.main,
        color: theme.palette.dark.contrastText,
        padding: theme.spacing(1),
        width: "100%",
        zIndex: 99999,
        "& > *": {
            margin: theme.spacing(0, 1),
        },
    },
    button: {
        color: theme.palette.dark.contrastText,
    },
    input: {
        color: theme.palette.dark.contrastText,
    },
}));

const DevToolsController = () => {

    // TODO: NIJobs devtools shoudl be better modularized in order to easily add new features
    const locallyStoredAPIHostname = localStorage.getItem("devTools.API_HOSTNAME");
    const [APIHostname, setAPIHostname] = useState(locallyStoredAPIHostname || config.API_HOSTNAME);

    const locallyStoredLocationServiceHostname = localStorage.getItem("devTools.LOCATION_SERVICE_HOSTNAME");
    const [
        LocationServiceHostname,
        setLocationServiceHostname,
    ] = useState(locallyStoredLocationServiceHostname || config.LOCATION_SERVICE_HOSTNAME);

    const handleApply = () => {
        localStorage.setItem("devTools.API_HOSTNAME", APIHostname);
        localStorage.setItem("devTools.LOCATION_SERVICE_HOSTNAME", LocationServiceHostname);
        window.location.reload();
    };

    const handleReset = () => {
        localStorage.setItem("devTools.API_HOSTNAME", INITIAL_API_HOSTNAME);
        localStorage.setItem("devTools.LOCATION_SERVICE_HOSTNAME", INITIAL_LOCATION_SERVICE_HOSTNAME);
        window.location.reload();
    };

    const classes = useDevToolsStyle();

    return (
        <div className={classes.bar}>
            <Typography>
                <span>⚠️</span>
                NIJobs Devtools
            </Typography>
            <Typography display="inline">API Hostname</Typography>
            <TextField
                InputProps={{
                    classes: {
                        root: classes.input,
                    },
                }}
                className={classes.input}
                placeholder="API Host in the format http(s)://host:port"
                onChange={(e) => {
                    setAPIHostname(e.target.value);
                }}
                value={APIHostname}
            />
            <Typography display="inline">Location Service Hostname</Typography>
            <TextField
                InputProps={{
                    classes: {
                        root: classes.input,
                    },
                }}
                className={classes.input}
                placeholder="Location service to use. URL is in the format http(s)://host:port"
                onChange={(e) => {
                    setLocationServiceHostname(e.target.value);
                }}
                value={LocationServiceHostname}
            />
            <Button className={classes.button} onClick={handleApply}>Apply and Reload</Button>
            <Button className={classes.button} onClick={handleReset}>Reset and Reload</Button>
        </div>
    );
};

const install = () => {

    const devToolsRoot = document.createElement("div");
    devToolsRoot.id = "_DEV_TOOLS";

    devToolsRoot.setAttribute("style", "position: sticky; bottom: 0");

    document.body.appendChild(devToolsRoot);

    ReactDOM.render(
        <ThemeProvider theme={AppTheme}>
            <DevToolsController />
        </ThemeProvider>,
        devToolsRoot
    );
};

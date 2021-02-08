/* istanbul ignore file */

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import AppTheme from "./AppTheme.js";

import config, { INITIAL_API_HOSTNAME } from "./config.js";

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
        position: "fixed",
        bottom: 0,
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
    const locallyStoredAPIHostname = localStorage.getItem("devTools.API_HOSTNAME");
    const [APIHostname, setAPIHostname] = useState(locallyStoredAPIHostname || config.API_HOSTNAME);

    const handleApply = () => {
        localStorage.setItem("devTools.API_HOSTNAME", APIHostname);
        window.location.reload();
    };

    const handleReset = () => {
        localStorage.setItem("devTools.API_HOSTNAME", INITIAL_API_HOSTNAME);
        window.location.reload();
    };

    const classes = useDevToolsStyle();

    return (
        <div className={classes.bar}>
            <Typography>⚠️ NIJobs Devtools</Typography>
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
            <Button className={classes.button} onClick={handleApply}>Apply and Reload</Button>
            <Button className={classes.button} onClick={handleReset}>Reset and Reload</Button>
        </div>
    );
};

const install = () => {
    const devToolsRoot = document.createElement("div");
    devToolsRoot.id = "_DEV_TOOLS";

    document.body.appendChild(devToolsRoot);

    ReactDOM.render(
        <ThemeProvider theme={AppTheme}>
            <DevToolsController />
        </ThemeProvider>,
        devToolsRoot
    );
};

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import "./index.css";
import App from "./App";

ReactDOM.render(
    <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
            <App />
        </SnackbarProvider>
    </BrowserRouter>, document.getElementById("root"));

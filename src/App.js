import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import store from "./store";
import Notifier from "./components/Notifications/Notifier";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CookieConsent } from "./cookieConsent";

const App = () => (
    <Provider store={store}>
        <React.Fragment>
            <CssBaseline />
            <Notifier />
            <CookieConsent />
            <AppRouter />
        </React.Fragment>

    </Provider>
);

export default App;

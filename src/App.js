import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import store from "./store";
import Notifier from "./components/Notifications/Notifier";
import CssBaseline from "@material-ui/core/CssBaseline";
import { initAnalytics } from "./utils/AnalyticsUtils";

const App = () => {

    React.useEffect(initAnalytics);

    return (
        <Provider store={store}>
            <React.Fragment>
                <CssBaseline />
                <Notifier />
                <AppRouter />
            </React.Fragment>

        </Provider>
    );
};

export default App;

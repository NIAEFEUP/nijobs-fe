import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import store from "./store";
import Notifier from "./components/Notifications/Notifier";
import CssBaseline from "@material-ui/core/CssBaseline";

const App = () => (
    <Provider store={store}>
        <React.Fragment>
            <CssBaseline />
            <Notifier />
            <AppRouter />
        </React.Fragment>

    </Provider>
);

export default App;

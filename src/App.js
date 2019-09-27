import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import store from "./store";
import Notifier from "./components/Notifications/Notifier";

const App = () => (
    <Provider store={store}>
        <React.Fragment>
            <Notifier />
            <AppRouter/>
        </React.Fragment>

    </Provider>
);

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter';
import store from './store';
import Notifier from './components/Notifications/Notifier';

const App = () => {

    return (
        <Provider store={store}>
            <React.Fragment>
                {/* <AppNavbar/> */}
                <Notifier />
                <AppRouter/>
            </React.Fragment>

        </Provider>
    );
    
};

export default App;
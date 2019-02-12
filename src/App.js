import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter';
import store from './store';
import Notifier from './components/Notifications/Notifier';

import { MuiThemeProvider } from '@material-ui/core/styles';
import AppTheme from './AppTheme.js';
// import './App.css';

class App extends Component {

    render() {

        const theme = AppTheme;

        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <div>
                        {/* <AppNavbar/> */}
                        <Notifier />
                        <AppRouter/>
                    </div>

                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
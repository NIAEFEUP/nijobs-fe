import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter';
import store from './store';
import Notifier from './components/Notifications/Notifier';


// import './App.css';

class App extends Component {

    render() {

        return (
            <Provider store={store}>
                
                <div>
                    {/* <AppNavbar/> */}
                    <Notifier />
                    <AppRouter/>
                </div>

            </Provider>
        );
    }
}

export default App;
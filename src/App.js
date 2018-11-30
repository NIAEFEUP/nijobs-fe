import React, { Component } from 'react'
import { Provider } from 'react-redux';
import AppRouter from './components/AppRouter';
import store from './store';

// import './App.css';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    {/* <AppNavbar/> */}
                    <AppRouter/>
                </div>
            </Provider>
        );
    }
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
                <App />
            </SnackbarProvider>
        </BrowserRouter>, div);
});
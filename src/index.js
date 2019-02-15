import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';

import { MuiThemeProvider } from '@material-ui/core/styles';
import AppTheme from './AppTheme.js';

import './index.css';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider theme={AppTheme}>
            <SnackbarProvider maxSnack={3}>
                <App />
            </SnackbarProvider>
        </MuiThemeProvider>
    </BrowserRouter>, document.getElementById('root'));
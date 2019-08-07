import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePageBoilerplate from './pages/HomePageBoilerplate';
import HomePage from './pages/HomePage';
import ExamplePage from './pages/ExamplePage';
import OtherPage from './pages/OtherPage';
import NotFound from './pages/NotFound';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path='/'
                    component={HomePage}
                />
                <Route
                    exact
                    path='/demo'
                    component={HomePageBoilerplate}
                />
                <Route
                    exact
                    path='/example'
                    component={ExamplePage}
                />
                <Route
                    exact
                    path='/other/:id(\d+)'
                    component={OtherPage}
                />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import NotFound from './components/ErrorPages/NotFound';

import ExamplePage from './components/ExamplePages/ExamplePage'
import OtherPage from './components/ExamplePages/OtherPage';

class AppRouter extends Component {
    render(){
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/example' component={ExamplePage}/>
                    <Route exact path='/other/:id(\d+)' component={OtherPage}/>
                    <Route component={NotFound} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default AppRouter;
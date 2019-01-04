import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExamplePage from './pages/ExamplePage'
import OtherPage from './pages/OtherPage';
import NotFound from './pages/NotFound';


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
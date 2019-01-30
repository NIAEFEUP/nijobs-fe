import React, { Component } from 'react';

import MainView from "../components/HomePage/MainView";
import SearchResults from "../components/HomePage/SearchResults";

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <MainView />
                <SearchResults />
            </React.Fragment>
        );
    }
}

export default HomePage;
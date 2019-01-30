import React, { Component } from 'react';
import MainView from "../components/HomePage/MainView";

class HomePage extends Component {

    render() {
        return (
            <React.Fragment>
                <MainView />
                <div style={{height: 500}}>
                    asd
                </div>
            </React.Fragment>
        );
    }
}

export default HomePage;
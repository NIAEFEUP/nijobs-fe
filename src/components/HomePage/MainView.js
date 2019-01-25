import React, { Component } from 'react';
import SearchArea from "./SearchArea";

import homePageStyles from './HomePage.module.css';
const logo = require('./nijobs.png');

class MainView extends Component {
    render() {
        return (
            <div className={homePageStyles.mainView}>
                <div>
                    <img
                        src={logo}
                        alt="nijobs Logo"
                    />
                </div>
                <SearchArea />
            </div>
        );
    }
}

export default MainView;
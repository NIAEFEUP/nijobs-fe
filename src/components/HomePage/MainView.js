import React, { Component } from 'react';
import SearchArea from "./SearchArea";
import ShowMoreButton from "./ShowMoreButton";
import InfoBox from "./InfoBox";

import homePageStyles from './HomePage.module.css';

const logo = require('./nijobs.png');

class MainView extends Component {
    render() {
        return (
            <div className={homePageStyles.mainView}>
                <div className={homePageStyles.mainMask}>
                    <div className={homePageStyles.mainLogo}>
                        <img
                            src={logo}
                            alt="nijobs Logo"
                        />
                    </div>
                </div>
                <SearchArea />
                <InfoBox
                    info='Your next oportunity is out there. Use the search to find it!'
                />
                <ShowMoreButton btnClass={homePageStyles.showMoreBtn}/>
            </div>
        );
    }
}

export default MainView;
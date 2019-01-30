import React, { Component } from 'react';

import SearchArea from "./SearchArea";
import ShowMoreButton from "./ShowMoreButton";
import InfoBox from "./InfoBox";

import homePageStyles from './HomePage.module.css';

const logo = require('./nijobs.png');

class MainView extends Component {

    /* TODO:
    scroll to search results div when ShowMoreButton is clicked
    scrollToSearch = () => window.scrollTo(0, the_next_div); */

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
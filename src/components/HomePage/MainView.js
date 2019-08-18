import React from "react";
import PropTypes from "prop-types";

import logo from "./nijobs.png";

import SearchArea from "./SearchArea/SearchArea";
import ShowMoreButton from "./ShowMoreButton";
import InfoBox from "./QuickInfoArea/InfoBox";

import homePageStyles from "./HomePage.module.css";

const MainView = ({ scrollToProductDescription, scrollToSearchResults }) => (
    <div className={homePageStyles.mainView}>
        <div className={homePageStyles.mainMask}>
            <div className={homePageStyles.mainLogo}>
                <img
                    src={logo}
                    alt="nijobs Logo"
                />
            </div>
        </div>
        <InfoBox
            info="Your next oportunity is out there. Use the search bar to find it!"
        />
        <SearchArea onSubmit={scrollToSearchResults}/>
        <ShowMoreButton
            className={homePageStyles.showMoreBtn}
            onClick={scrollToProductDescription}
        />
    </div>
);

MainView.propTypes = {
    scrollToProductDescription: PropTypes.func.isRequired,
    scrollToSearchResults: PropTypes.func.isRequired,
};

export default MainView;

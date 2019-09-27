import React from "react";
import PropTypes from "prop-types";

import logo from "./nijobs.png";

import SearchArea from "./SearchArea/SearchArea";
import ShowMoreButton from "./ShowMoreButton";
import InfoBox from "./QuickInfoArea/InfoBox";

import homePageStyles from "./HomePage.module.css";

const MainView = ({ scrollToProductDescription, showSearchResults }) => (
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
        <SearchArea
            onSubmit={() => {
                showSearchResults();
            }}
        />
        <div className={homePageStyles.showMoreBtn}>
            <ShowMoreButton
                onClick={scrollToProductDescription}
            />

        </div>
    </div>
);

MainView.propTypes = {
    scrollToProductDescription: PropTypes.func.isRequired,
    showSearchResults: PropTypes.func.isRequired,
};

export default MainView;

import React from "react";
import PropTypes from "prop-types";

import logo from "./nijobs.png";

import SearchArea from "./SearchArea/SearchArea";
import ShowMoreButton from "./ShowMoreButton";
import InfoBox from "./QuickInfoArea/InfoBox";

import useMainViewStyles from "./mainViewStyles.js";

const MainView = ({ scrollToProductDescription, showSearchResults }) => {
    const classes = useMainViewStyles();
    return (
        <div className={classes.mainView}>
            <div className={classes.mainMask}>
                <div className={classes.mainLogo}>
                    <img
                        src={logo}
                        alt="nijobs Logo"
                    />
                </div>
            </div>
            <div className={classes.searchAreaWrapper}>
                <div className={classes.searchArea}>
                    <SearchArea
                        onSubmit={() => {
                            showSearchResults();
                        }}
                    />
                </div>
            </div>
            <div className={classes.infoBox}>
                <InfoBox
                    info="Your next oportunity is out there. Use the search bar to find it!"
                />
            </div>
            <div className={classes.showMoreBtn}>
                <ShowMoreButton
                    onClick={scrollToProductDescription}
                />
            </div>
        </div>
    );
};

MainView.propTypes = {
    scrollToProductDescription: PropTypes.func.isRequired,
    showSearchResults: PropTypes.func.isRequired,
};

export default MainView;

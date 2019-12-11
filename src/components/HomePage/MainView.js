import React from "react";
import PropTypes from "prop-types";

import logo from "./nijobs.png";

import SearchArea from "./SearchArea/SearchArea";
import ShowMoreButton from "./ShowMoreButton";
import InfoBox from "./QuickInfoArea/InfoBox";

import { useMobile, NonMobileLayout } from "../../utils/media-queries";

import useMainViewStyles from "./mainViewStyles.js";

const MainView = ({ scrollToProductDescription, showSearchResults }) => {

    const classes = useMainViewStyles();
    return (
        <div className={classes.mainView}>
            <div className={useMobile() ? classes.mainMaskMobile : classes.mainMask}>
                <div className={useMobile() ? classes.mainLogoMobile : classes.mainLogo}>
                    <img
                        src={logo}
                        alt="nijobs Logo"
                    />
                </div>
            </div>

            <div className={useMobile() ? classes.searchAreaMobile : classes.searchArea}>
                <SearchArea
                    onSubmit={() => {
                        showSearchResults();
                    }}
                />
            </div>
            <NonMobileLayout>
                <div className={classes.infoBox}>
                    <InfoBox
                        info="Your next oportunity is out there. Use the search bar to find it!"
                    />
                </div>
            </NonMobileLayout>
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

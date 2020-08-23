import React from "react";
import PropTypes from "prop-types";

import logo from "./nijobs.png";

import SearchArea from "./SearchArea/SearchArea";
import ShowMoreButton from "./ShowMoreButton";
import InfoBox from "./QuickInfoArea/InfoBox";

import { useMobile, useDesktop } from "../../utils/media-queries";

import useMainViewStyles from "./mainViewStyles.js";
import { MainMask } from "./MainMask";

const MainView = ({ scrollToProductDescription, showSearchResults }) => {

    const classes = useMainViewStyles({ isMobile: !useDesktop() });
    return (
        <div className={classes.mainView}>
            <MainMask>
                <div className={classes.mainLogo}>
                    <img
                        src={logo}
                        alt="nijobs Logo"
                    />
                </div>
            </MainMask>
            <div className={classes.searchArea}>
                <SearchArea
                    onSubmit={() => {
                        showSearchResults();
                    }}
                />
            </div>
            <div className={classes.infoBox}>
                <InfoBox size={useMobile() ? "small" : "normal"}>
                    Your next oportunity is out there. Use the search bar to find it!
                </InfoBox>
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

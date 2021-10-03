import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import logo from "./nijobs.png";

import SearchArea from "./SearchArea/SearchArea";
import ShowMoreButton from "./ShowMoreButton";
import InfoBox from "./QuickInfoArea/InfoBox";

import { useMobile, useDesktop } from "../../utils/media-queries";

import useMainViewStyles from "./mainViewStyles.js";
import { MainMask } from "./MainMask";
import CenteredComponent from "./CenteredComponent";

const MainView = ({ scrollToProductDescription, showSearchResults }) => {

    const scrollButtonRef = useRef(null);
    const scrollButtonRefCurrent = scrollButtonRef?.current;
    const [scrollPosition, setScrollPosition] = useState(0);
    const [hideScrollButtonPosition, setHideScrollButtonPosition] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        setHideScrollButtonPosition(scrollButtonRefCurrent?.getBoundingClientRect()?.y / 2);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrollButtonRefCurrent]);

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
            <CenteredComponent>
                <div className={classes.searchArea}>
                    <SearchArea
                        onSubmit={() => {
                            showSearchResults();
                        }}
                    />
                </div>
            </CenteredComponent>
            <div className={classes.infoBox}>
                <InfoBox size={useMobile() ? "small" : "normal"}>
                    Your next opportunity is out there. Use the search bar to find it!
                </InfoBox>
            </div>
            <div className={classes.showMoreBtn} ref={scrollButtonRef}>
                {
                    scrollPosition <= hideScrollButtonPosition &&
                        <ShowMoreButton
                            onClick={scrollToProductDescription}
                            role="scrollButton"
                        />
                }
            </div>
        </div>
    );
};

MainView.propTypes = {
    scrollToProductDescription: PropTypes.func.isRequired,
    showSearchResults: PropTypes.func.isRequired,
};

export default MainView;

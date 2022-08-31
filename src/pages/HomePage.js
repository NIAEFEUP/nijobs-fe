import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import MainView from "../components/HomePage/MainView";
import ApplicationMessagesNotifier from "../components/ApplicationMessages";
import { smoothScrollToRef } from "../utils";
import { useDesktop } from "../utils/media-queries";
import ProductDescription from "../components/HomePage/ProductPlacementArea/ProductDescription";
import SearchResultsWidget from "../components/HomePage/SearchResultsArea/SearchResultsWidget/SearchResultsWidget";
import { useDispatch } from "react-redux";
import { toggleAuthModal } from "../actions/navbarActions";

const useStyles = ({ isMobile, showSearchResults }) => makeStyles(() => (
    showSearchResults &&
        {
            search: {
                scrollSnapAlign: "start",
            },
            productDescription: {
                scrollSnapAlign: isMobile ? "center" : "end",
            },
            searchResults: {
                scrollSnapAlign: "start",

                // don't apply snap scroll to the bottom of the search
                // results, so that it's possible to see the footer
                scrollMarginBottom: "100vh",
            },
        }
));

export const HomePage = ({ openPasswordRecoveryModal }) => {

    const productDescriptionRef = useRef(null);
    const searchResultsRef = useRef(null);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const productDescriptionScrollBlock = useDesktop() ? "end" : "center";
    const dispatch = useDispatch();

    // this will not trigger the scroll on subsequent submits, because the dependencies won't change after the first call
    useEffect(() => {
        if (showSearchResults && searchResultsRef) smoothScrollToRef(searchResultsRef);

        // In order to use snap-scroll, we need to add the scroll-snap-type property to the element which has scrolling
        document.getElementsByTagName("html")[0].style.scrollSnapType = "y proximity";
    }, [searchResultsRef, showSearchResults]);

    useEffect(() => {
        if (openPasswordRecoveryModal) {
            dispatch(toggleAuthModal(2));
        }
    }, [dispatch, openPasswordRecoveryModal]);


    const classes = useStyles({ isMobile: !useDesktop(), showSearchResults })();

    return (
        <React.Fragment>
            <ApplicationMessagesNotifier />
            <div className={classes.search}>
                <MainView
                    scrollToProductDescription={smoothScrollToRef.bind(null, productDescriptionRef, productDescriptionScrollBlock)}
                    showSearchResults={() => {
                        setShowSearchResults(true);
                        if (searchResultsRef && searchResultsRef.current) smoothScrollToRef(searchResultsRef);
                    }}
                />
            </div>
            <div className={classes.productDescription}>
                <ProductDescription ref={productDescriptionRef} />
            </div>
            {showSearchResults &&
                <div className={classes.searchResults}>
                    <SearchResultsWidget ref={searchResultsRef} />
                </div>
            }
        </React.Fragment>
    );

};

HomePage.propTypes = {
    openPasswordRecoveryModal: PropTypes.bool,
};

export default HomePage;

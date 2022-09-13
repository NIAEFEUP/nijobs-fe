import React, { useState, useRef, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core";
import MainView from "../components/HomePage/MainView";
import ApplicationMessagesNotifier from "../components/ApplicationMessages";
import { smoothScrollToRef } from "../utils";
import { useDesktop } from "../utils/media-queries";
import ProductDescription from "../components/HomePage/ProductPlacementArea/ProductDescription";
import SearchResultsWidget from "../components/HomePage/SearchResultsArea/SearchResultsWidget/SearchResultsWidget";
import { useDispatch } from "react-redux";
import { setRecoveryToken, toggleAuthModal } from "../actions/navbarActions";
import { useHistory, useParams } from "react-router-dom";
import { AuthModalConstants } from "../components/Navbar/Auth/AuthModalConstants";
import URLSearchParamsParser from "../components/HomePage/URLSearchParamsParser";
import PropTypes from "prop-types";

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
    const [showSearchResultsWidget, setShowSearchResultsWidget] = useState(false);
    const productDescriptionScrollBlock = useDesktop() ? "end" : "center";
    const dispatch = useDispatch();
    const history = useHistory();
    const { token } = useParams();

    // this will not trigger the scroll on subsequent submits, because the dependencies won't change after the first call
    useEffect(() => {
        if (showSearchResultsWidget && searchResultsRef) smoothScrollToRef(searchResultsRef);

        // In order to use snap-scroll, we need to add the scroll-snap-type property to the element which has scrolling
        document.getElementsByTagName("html")[0].style.scrollSnapType = "y proximity";
    }, [searchResultsRef, showSearchResultsWidget]);

    useEffect(() => {
        if (openPasswordRecoveryModal && token) {
            history.replace({ pathname: "/" });
            dispatch(toggleAuthModal(AuthModalConstants.FINISH_PAGE));
            dispatch(setRecoveryToken(token));
        }
    }, [dispatch, history, openPasswordRecoveryModal, token]);


    // const classes = useStyles({ isMobile: !useDesktop(), showSearchResults })();
    const classes = useStyles({ isMobile: !useDesktop(), showSearchResults: showSearchResultsWidget })();

    const showSearchResults = useCallback(() => {
        setShowSearchResultsWidget(true);
        if (searchResultsRef && searchResultsRef.current) smoothScrollToRef(searchResultsRef);
    }, []);

    return (
        <React.Fragment>
            <ApplicationMessagesNotifier />
            <URLSearchParamsParser showSearchResults={showSearchResults} />
            <div className={classes.search}>
                <MainView
                    scrollToProductDescription={smoothScrollToRef.bind(null, productDescriptionRef, productDescriptionScrollBlock)}
                    showSearchResults={showSearchResults}
                />
            </div>
            <div className={classes.productDescription}>
                <ProductDescription ref={productDescriptionRef} />
            </div>
            {showSearchResultsWidget &&
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

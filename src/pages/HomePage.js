import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import MainView from "../components/HomePage/MainView";
import ApplicationMessagesNotifier from "../components/ApplicationMessages";
import { smoothScrollToRef } from "../utils";
import { useDesktop } from "../utils/media-queries";
import ProductDescription from "../components/HomePage/ProductPlacementArea/ProductDescription";
import SearchResultsWidget from "../components/HomePage/SearchResultsArea/SearchResultsWidget/SearchResultsWidget";

const useStyles = makeStyles(() => ({
    searchResults: {
        scrollSnapAlign: "start",
        scrollMarginBottom: "100vh", // don't apply snap scroll to the bottom of the search results, so that it's possible to see the footer
    },
}));

export const HomePage = () => {

    const productDescriptionRef = useRef(null);
    const searchResultsRef = useRef(null);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const productDescriptionScrollBlock = useDesktop() ? "end" : "center";

    // this will not trigger the scroll on subsequent submits, because the dependencies won't change after the first call
    useEffect(() => {
        if (showSearchResults && searchResultsRef) smoothScrollToRef(searchResultsRef);

        // It's mandatory to add the scroll-snap-type style property to the html tag in order to use snap-scroll
        document.getElementsByTagName("html")[0].style.scrollSnapType = "y proximity";
    }, [searchResultsRef, showSearchResults]);

    const classes = useStyles();

    return (
        <React.Fragment>
            <ApplicationMessagesNotifier />
            <MainView
                scrollToProductDescription={smoothScrollToRef.bind(null, productDescriptionRef, productDescriptionScrollBlock)}
                showSearchResults={() => {
                    setShowSearchResults(true);
                    if (searchResultsRef && searchResultsRef.current) smoothScrollToRef(searchResultsRef);
                }}
            />
            <ProductDescription ref={productDescriptionRef}  />

            {showSearchResults &&
                <div className={classes.searchResults}>
                    <SearchResultsWidget ref={searchResultsRef} />
                </div>
            }
        </React.Fragment>
    );

};

export default HomePage;

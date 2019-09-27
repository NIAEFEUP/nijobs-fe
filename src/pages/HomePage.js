import React, { useState, useEffect } from "react";

import MainView from "../components/HomePage/MainView";
import SearchResultsWidget from "../components/HomePage/SearchResultsArea/SearchResultsWidget/SearchResultsWidget";
import ProductDescription from "../components/HomePage/ProductPlacementArea/ProductDescription";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import { smoothScrollToRef } from "../utils";

// TODO remove this, only for mock images
const redditLogo = require("./reddit-logo.png");
const feupLogo = require("./feup-logo.jpg");


const HomePage = () => {

    const [productDescriptionRef, setProductDescriptionRef] = useState(null);
    const [searchResultsRef, setSearchResultsRef] = useState(null);
    const [showSearchResults, setShowSearchResults] = useState(false);

    // this will not trigger the scroll on subsequent submits, because the dependencies won't change after the first call
    useEffect(() => {
        if (showSearchResults && searchResultsRef) smoothScrollToRef(searchResultsRef);
    }, [searchResultsRef, showSearchResults]);

    // Setting the offers. In the future they should come from the redux store and loaded when the respective service+action is called
    const [offers] = useState([
        new Offer(
            "random uuid1",
            "Full-Stack Developer",
            {
                name: "Reddit",
                logo: redditLogo,
            },
            "San Francisco",
            "2019-06",
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        ),
        new Offer(
            "random uuid2",
            "Security Guy",
            {
                name: "CICA",
                logo: feupLogo,
            },
            "Porto",
            "2019-06",
            "You won't do much, really...",
        ),
        new Offer(
            "random uuid3",
            "Frontend Developer",
            {
                name: "Sigarra",
                logo: feupLogo,
            },
            "Porto",
            "2019-06",
            "kek",
        ),
    ]);


    return (
        <React.Fragment>
            <MainView
                scrollToProductDescription={smoothScrollToRef.bind(null, productDescriptionRef)}
                showSearchResults={() => setShowSearchResults(true)}
            />
            <ProductDescription setRef={setProductDescriptionRef}/>
            {showSearchResults ?
                <SearchResultsWidget
                    setRef={setSearchResultsRef}
                    offers={offers}
                />
                : ""
            }

        </React.Fragment>
    );

};

export default HomePage;

import React, { useState, useEffect } from "react";

import MainView from "../components/HomePage/MainView";
import SearchResults from "../components/HomePage/SearchResultsArea/SearchResults";
import ProductDescription from "../components/HomePage/ProductPlacementArea/ProductDescription";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import { smoothScrollToRef } from "../utils";

const HomePage = () => {

    const [productDescriptionRef, setProductDescriptionRef] = useState(null);
    const [searchResultsRef, setSearchResultsRef] = useState(null);
    const [showSearchResults, setShowSearchResults] = useState(false);

    useEffect(() => {
        if (showSearchResults && searchResultsRef) smoothScrollToRef(searchResultsRef);
    }, [searchResultsRef, showSearchResults]);

    // Setting the offers. In the future they should come from the redux store and loaded when the respective service+action is called
    const [offers] = useState([
        new Offer(
            "random uuid",
            "Full-Stack Developer",
            "Porto",
            "Reddit",
            "2019-06",
            "This is a description",
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
                <SearchResults
                    setRef={setSearchResultsRef}
                    offers={offers}
                /> : ""}

        </React.Fragment>
    );

};

export default HomePage;

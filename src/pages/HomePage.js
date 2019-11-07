import React, { useState, useEffect } from "react";

import MainView from "../components/HomePage/MainView";
import SearchResultsWidget from "../components/HomePage/SearchResultsArea/SearchResultsWidget/SearchResultsWidget";
import ProductDescription from "../components/HomePage/ProductPlacementArea/ProductDescription";
import { smoothScrollToRef } from "../utils";

const HomePage = () => {

    const [productDescriptionRef, setProductDescriptionRef] = useState(null);
    const [searchResultsRef, setSearchResultsRef] = useState(null);
    const [showSearchResults, setShowSearchResults] = useState(false);

    // this will not trigger the scroll on subsequent submits, because the dependencies won't change after the first call
    useEffect(() => {
        if (showSearchResults && searchResultsRef) smoothScrollToRef(searchResultsRef);
    }, [searchResultsRef, showSearchResults]);


    return (
        <React.Fragment>
            <MainView
                scrollToProductDescription={smoothScrollToRef.bind(null, productDescriptionRef)}
                showSearchResults={() => {
                    setShowSearchResults(true);
                    if (searchResultsRef && searchResultsRef.current) smoothScrollToRef(searchResultsRef);
                }}
            />
            <ProductDescription setRef={setProductDescriptionRef}/>
            {showSearchResults ?
                <SearchResultsWidget
                    setRef={setSearchResultsRef}
                />
                : ""
            }
        </React.Fragment>
    );

};

export default HomePage;

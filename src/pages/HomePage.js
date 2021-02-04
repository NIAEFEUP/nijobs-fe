import React, { useState, useRef, useEffect } from "react";

import MainView from "../components/HomePage/MainView";
import SearchResultsWidget from "../components/HomePage/SearchResultsArea/SearchResultsWidget/SearchResultsWidget";
import ProductDescription from "../components/HomePage/ProductPlacementArea/ProductDescription";
import { smoothScrollToRef } from "../utils";
import Navbar from "../components/Navbar";
import ContactPage from "./ContactPage";

export const HomePage = () => {

    const productDescriptionRef = useRef(null);
    const searchResultsRef = useRef(null);
    const [showSearchResults, setShowSearchResults] = useState(false);

    // this will not trigger the scroll on subsequent submits, because the dependencies won't change after the first call
    useEffect(() => {
        if (showSearchResults && searchResultsRef) smoothScrollToRef(searchResultsRef);
    }, [searchResultsRef, showSearchResults]);

    return (
        <React.Fragment>
            <Navbar />
            <MainView
                scrollToProductDescription={smoothScrollToRef.bind(null, productDescriptionRef)}
                showSearchResults={() => {
                    setShowSearchResults(true);
                    if (searchResultsRef && searchResultsRef.current) smoothScrollToRef(searchResultsRef);
                }}
            />
            <ProductDescription ref={productDescriptionRef}/>
            {showSearchResults && <SearchResultsWidget ref={searchResultsRef}/>}
            <ContactPage />
        </React.Fragment>
    );

};

export default HomePage;

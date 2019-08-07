import React from 'react';

import MainView from "../components/HomePage/MainView";
import SearchResults from "../components/HomePage/SearchResultsArea/SearchResults";
import ProductDescription from "../components/HomePage/ProductPlacementArea/ProductDescription";

const HomePage = () => {
    
    let [productDescriptionRef, setProductDescriptionRef] = React.useState(null);
    let [searchResultsRef, setSearchResultsRef] = React.useState(null);

    const scrollToProductDescription = () => {
        productDescriptionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };
    const scrollToSearchResults = () => {
        searchResultsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    return (
        <React.Fragment>
            <MainView 
                scrollToProductDescription={scrollToProductDescription}
                scrollToSearchResults={scrollToSearchResults}
            />
            <ProductDescription setRef={setProductDescriptionRef}/>
            <SearchResults setRef={setSearchResultsRef}/>
        </React.Fragment>
    );
    
};

export default HomePage;
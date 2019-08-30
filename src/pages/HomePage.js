import React from "react";

import MainView from "../components/HomePage/MainView";
import SearchResults from "../components/HomePage/SearchResultsArea/SearchResults";
import ProductDescription from "../components/HomePage/ProductPlacementArea/ProductDescription";

export const scrollToProductDescription = (productDescriptionRef) => {
    productDescriptionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
};
export const scrollToSearchResults = (searchResultsRef) => {
    searchResultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
};

const HomePage = () => {

    const [productDescriptionRef, setProductDescriptionRef] = React.useState(null);
    const [searchResultsRef, setSearchResultsRef] = React.useState(null);

    // Setting the offers, probably needs re-thinking
    // Maybe use React.useEffect for offer loading
    const [offers] = React.useState([
        {
            loading: true,
        },
        {
            loading: false,
            position: "Full-Stack Developer",
            location: "Porto",
            company: "Reddit",
            date: "2019-06",
            description: "This is a description",
        },
    ]);


    return (
        <React.Fragment>
            <MainView
                scrollToProductDescription={scrollToProductDescription.bind(null, productDescriptionRef)}
                scrollToSearchResults={scrollToSearchResults.bind(null, searchResultsRef)}
            />
            <ProductDescription setRef={setProductDescriptionRef}/>
            <SearchResults
                setRef={setSearchResultsRef}
                offers={offers}
            />
        </React.Fragment>
    );

};

export default HomePage;

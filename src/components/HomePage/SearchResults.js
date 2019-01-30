import React, { Component } from "react";

import OfferCard from './OfferCard';
import homePageStyles from './HomePage.module.css';

class SearchResults extends Component {
    render() {
        return (
            <div className={homePageStyles.searchResults}>
                <OfferCard/>
            </div>
        );
    }
}

export default SearchResults;
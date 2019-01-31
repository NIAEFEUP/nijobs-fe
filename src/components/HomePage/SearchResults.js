import React, { Component } from "react";

import OfferCard from './OfferCard';
import homePageStyles from './HomePage.module.css';

class SearchResults extends Component {
    render() {
        return (
            <div className={homePageStyles.searchResults}>
                <OfferCard
                    position="Senior Front-End developer"
                    location="Porto Portugal"
                    company="NIAEFEUP"
                    date="3 days ago"
                    description="jçaksfjjklsjadkfljklfjklsdajflkçs"
                />
            </div>
        );
    }
}

export default SearchResults;
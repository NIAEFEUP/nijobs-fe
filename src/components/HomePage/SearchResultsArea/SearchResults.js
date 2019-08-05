import React from "react";
import PropTypes from 'prop-types';

import OfferCard from './Offer/OfferCard';
import homePageStyles from '../HomePage.module.css';

const SearchResults = props => {

    const {setRef} = props;
    
    const ref = React.useRef(null);
    setRef(ref);
    
    return (
        <div
            ref={ref}
            className={homePageStyles.searchResults}
        >
            <OfferCard loading/>
            <OfferCard
                position="Senior Front-End developer"
                location="Porto Portugal"
                company="NIAEFEUP"
                date="3 days ago"
                description="jçaksfjjklsjadkfljklfjklsdajflkçs"
            />
        </div>
    );
    
};

SearchResults.propTypes ={
    setRef: PropTypes.func.isRequired
}; 

export default SearchResults;
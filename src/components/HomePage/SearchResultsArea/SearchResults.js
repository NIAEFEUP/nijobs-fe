import React from "react";
import PropTypes from "prop-types";

import OfferCard from "./Offer/OfferCard";
import homePageStyles from "../HomePage.module.css";

const SearchResults = ({ setRef, offers }) => {
    const ref = React.useRef(null);
    setRef(ref);

    return (
        <div
            ref={ref}
            className={homePageStyles.searchResults}
        >
            {offers.map(({ loading, position, location, company, date, description }, key) => (
                <OfferCard
                    key={key}
                    loading={loading}
                    position={position}
                    location={location}
                    company={company}
                    date={date}
                    description={description}
                />
            ))}
        </div>
    );

};

SearchResults.propTypes = {
    setRef: PropTypes.func.isRequired,
    offers: PropTypes.array,
};

export default SearchResults;

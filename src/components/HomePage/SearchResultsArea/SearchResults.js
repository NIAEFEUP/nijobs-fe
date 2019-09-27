import React, { useRef } from "react";
import PropTypes from "prop-types";

import OfferCard from "./Offer/OfferCard";
import homePageStyles from "../HomePage.module.css";

export const SkeletonResults = () => (
    <div>
        skeleton
    </div>
);

const SearchResults = ({ setRef, offers }) => {
    const ref = useRef(null);
    setRef(ref);

    if (offers.length === 0) {
        return <SkeletonResults />;
    } else {
        return (
            <div
                ref={ref}
                className={homePageStyles.searchResults}
            >
                {offers.map((offer) => (
                    <OfferCard
                        key={offer.id}
                        offer={offer}
                    />
                ))}
            </div>
        );
    }


};

SearchResults.propTypes = {
    setRef: PropTypes.func.isRequired,
    offers: PropTypes.array,
};

export default SearchResults;

import React from "react";
import PropTypes from "prop-types";
import SearchResultsDesktop from "./SearchResultsDesktop";
import SearchResultsMobile from "./SearchResultsMobile";

const AbstractSearchResults = (props) => {
    const { mobile, offers, offersLoading, offersSearchError } = props;
    const noOffers = offersSearchError || (!offersLoading && offers.length === 0);
    return (
        <React.Fragment>

            {mobile ?
                <SearchResultsMobile
                    {...props}
                    noOffers={noOffers}
                />
                :
                <SearchResultsDesktop
                    {...props}
                    noOffers={noOffers}
                />
            }
        </React.Fragment>

    );
};

AbstractSearchResults.propTypes = {
    mobile: PropTypes.bool,
};

export default AbstractSearchResults;

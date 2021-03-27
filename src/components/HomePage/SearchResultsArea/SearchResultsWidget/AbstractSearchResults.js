import React from "react";
import PropTypes from "prop-types";
import SearchResultsDesktop from "./SearchResultsDesktop";
import SearchResultsMobile from "./SearchResultsMobile";
import Offer from "../Offer/Offer";
import useToggle from "../../../../hooks/useToggle";

const AbstractSearchResults = (props) => {
    const { mobile, offers, offersLoading, offersSearchError } = props;
    const noOffers = Boolean(offersSearchError || (!offersLoading && offers.length === 0));
    const [showSearchFilters, toggleShowSearchFilters] = useToggle(false);

    return (
        <React.Fragment>
            {mobile ?
                <SearchResultsMobile
                    {...props}
                    noOffers={noOffers}
                    showSearchFilters={showSearchFilters}
                    toggleShowSearchFilters={toggleShowSearchFilters}
                />
                :
                <SearchResultsDesktop
                    {...props}
                    noOffers={noOffers}
                    showSearchFilters={showSearchFilters}
                    toggleShowSearchFilters={toggleShowSearchFilters}
                />
            }
        </React.Fragment>
    );
};

AbstractSearchResults.propTypes = {
    mobile: PropTypes.bool,
    offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)),
    offersLoading: PropTypes.bool,
    offersSearchError: PropTypes.object,
};

export default AbstractSearchResults;

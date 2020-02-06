import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Grid, Paper } from "@material-ui/core";


import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";
import { useMobile } from "../../../../utils/media-queries";
import AbstractSearchResults from "./AbstractSearchResults";

export const SearchResultsWidget = React.forwardRef(({ offers, offersLoading, offersSearchError }, ref) => {

    const [selectedOffer, setSelectedOffer] = useState(null);
    const classes = useSearchResultsWidgetStyles();

    // Reset the selected offer on every "loading", so that it does not show up after finished loading
    useEffect(() => {
        if (offersLoading) setSelectedOffer(null);
    }, [offersLoading]);


    return (

        <Paper elevation={2}>
            <Grid
                ref={ref}
                className={classes.searchResults}
                container
                spacing={0}
            >
                <AbstractSearchResults
                    mobile={useMobile()}
                    selectedOffer={selectedOffer}
                    setSelectedOffer={setSelectedOffer}
                    offers={offers}
                    offersLoading={offersLoading}
                    offersSearchError={offersSearchError}
                />
            </Grid>
        </Paper>
    );
});

// Needed because of ForwardRef usage
SearchResultsWidget.displayName = "SearchResultsWidget";
SearchResultsWidget.propTypes = {
    offers: PropTypes.array,
    offersLoading: PropTypes.bool,
    offersSearchError: PropTypes.object,
};

const mapStateToProps = (state) => ({
    offers: state.offerSearch.offers,
    offersLoading: state.offerSearch.loading,
    offersSearchError: state.offerSearch.error,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SearchResultsWidget);

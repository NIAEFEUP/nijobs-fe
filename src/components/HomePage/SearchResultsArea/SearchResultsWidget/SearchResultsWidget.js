import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Grid, Paper } from "@material-ui/core";

import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";
import { useDesktop } from "../../../../utils/media-queries";
import Offer from "../Offer/Offer";
import SearchResultsMobile from "./SearchResultsMobile";
import SearchResultsDesktop from "./SearchResultsDesktop";
import useComponentController from "../../../../hooks/useComponentController";
import useToggle from "../../../../hooks/useToggle";

export const SearchResultsControllerContext = React.createContext({});

const SearchResultsController = ({ offersSearchError, offersLoading, offers }) => {

    const [selectedOffer, setSelectedOffer] = useState(null);

    // Reset the selected offer on every "loading", so that it does not show up after finished loading
    useEffect(() => {
        if (offersLoading) setSelectedOffer(null);
    }, [offersLoading]);

    const noOffers = Boolean(offersSearchError || (!offersLoading && offers.length === 0));
    const [showSearchFilters, toggleShowSearchFilters] = useToggle(false);

    return {
        controllerOptions: {
            initialValue: {
                noOffers,
                offers,
                offersLoading,
                offersSearchError,
                selectedOffer,
                setSelectedOffer,
                showSearchFilters,
                toggleShowSearchFilters,
            },
        },
    };
};

export const SearchResultsWidget = React.forwardRef(({ offers, offersLoading, offersSearchError }, ref) => {

    const classes = useSearchResultsWidgetStyles();

    const { ContextProvider } = useComponentController(
        SearchResultsController,
        { offers, offersLoading, offersSearchError },
        SearchResultsControllerContext
    );

    return (
        <ContextProvider>
            <Paper elevation={2}>
                <Grid
                    ref={ref}
                    className={classes.searchResults}
                    container
                    spacing={0}
                >
                    {!useDesktop() ?
                        <SearchResultsMobile />
                        :
                        <SearchResultsDesktop />
                    }
                </Grid>
            </Paper>
        </ContextProvider>
    );
});

// Needed because of ForwardRef usage
SearchResultsWidget.displayName = "SearchResultsWidget";
SearchResultsWidget.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)),
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

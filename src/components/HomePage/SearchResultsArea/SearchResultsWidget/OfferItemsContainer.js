import React, { useRef, useCallback, useState } from "react";
import PropTypes from "prop-types";
import OfferItem from "../Offer/OfferItem";

import { Button, Divider, List, ListItem, makeStyles } from "@material-ui/core";

import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";
import { Tune } from "@material-ui/icons";
import clsx from "clsx";
import LoadingOfferItem from "./LoadingOfferItem";
import useLoadMoreOffers from "../../../../hooks/useLoadMoreOffers";
import { connect } from "react-redux";
import { addSnackbar } from "../../../../actions/notificationActions";

const useAdvancedSearchButtonStyles = makeStyles((theme) => ({
    root: {
        top: "0",
        position: "sticky",
        padding: theme.spacing(3, "25%", 3, "25%"),
        zIndex: 1,
        backgroundColor: "white",
    },
    filtersButtonEnabled: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const ToggleFiltersButton = ({ onClick, enabled, ...props }) => {
    const classes = useAdvancedSearchButtonStyles();
    return (
        <ListItem className={classes.root}>
            <Button
                variant="contained"
                color="primary"
                className={clsx({ [classes.filtersButtonEnabled]: enabled })}
                fullWidth
                startIcon={<Tune />}
                onClick={onClick}
                {...props}
            >
                {`${!enabled ? "Adjust" : "Hide"} Filters`}
            </Button>
        </ListItem>
    );
};

ToggleFiltersButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    enabled: PropTypes.bool,
};

const OfferItemsContainer = ({
    // offers,
    addSnackbar,
    loading,
    selectedOfferIdx,
    setSelectedOfferIdx,
    showSearchFilters,
    toggleShowSearchFilters,
}) => {
    const classes = useSearchResultsWidgetStyles();

    const [offset, setOffset] = useState(0);

    const {
        offers,
        hasMore,
        loading: infiniteScrollLoading,
        error: infiniteScrollError,
    } = useLoadMoreOffers({ offset });

    const observer = useRef();
    const lastOfferElementRef = useCallback((node) => {
        if (loading || infiniteScrollLoading) return;

        if (infiniteScrollError) {
            addSnackbar({
                message: "An error occurred while fetching new offers",
                key: `${Date.now()}-fetch-new-offers`,
            });
        }

        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setOffset((previousOffset) => previousOffset + 3);
            }
        });
        if (node) observer.current.observe(node);
    }, [addSnackbar, hasMore, infiniteScrollError, infiniteScrollLoading, loading]);

    const handleOfferSelection = (...args) => {
        toggleShowSearchFilters(false);
        setSelectedOfferIdx(...args);
    };

    if (loading)
        return (
            <div
                data-testid="offer-items-container"
                className={`${classes.fullHeight} ${classes.fullWidth}`}
            >
                <LoadingOfferItem />
            </div>
        );

    return (
        <div
            data-testid="offer-items-container"
            className={`${classes.fullHeight} ${classes.fullWidth}`}
        >
            <List disablePadding>
                <ToggleFiltersButton
                    key="toggle-filters-button"
                    enabled={showSearchFilters}
                    onClick={() => toggleShowSearchFilters()}
                />
                {offers.map((offer, i) => (
                    <div key={offer._id} ref={lastOfferElementRef}>
                        {i !== 0 && <Divider component="li" />}
                        <OfferItem
                            offer={offer}
                            offerIdx={i}
                            selectedOfferIdx={selectedOfferIdx}
                            setSelectedOfferIdx={handleOfferSelection}
                            loading={loading}
                        />
                    </div>
                ))}
                {infiniteScrollLoading && <LoadingOfferItem dividerOnTop />}
            </List>
        </div>
    );
};

OfferItemsContainer.propTypes = {
    // offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)),
    loading: PropTypes.bool,
    selectedOfferIdx: PropTypes.number,
    setSelectedOfferIdx: PropTypes.func.isRequired,
    showSearchFilters: PropTypes.bool,
    toggleShowSearchFilters: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});

export default connect(null, mapDispatchToProps)(OfferItemsContainer);

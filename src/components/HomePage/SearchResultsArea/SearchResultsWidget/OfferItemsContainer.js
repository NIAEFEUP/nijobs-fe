import React, { useRef, useCallback, useState } from "react";
import PropTypes from "prop-types";
import Offer from "../Offer/Offer";
import OfferItem from "../Offer/OfferItem";

import { Button, Divider, List, ListItem, makeStyles } from "@material-ui/core";

import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";
import { Tune } from "@material-ui/icons";
import clsx from "clsx";
import LoadingOfferIcon from "./LoadingOfferItem";

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
    offers,
    loading,
    selectedOfferIdx,
    setSelectedOfferIdx,
    showSearchFilters,
    toggleShowSearchFilters,
}) => {
    const classes = useSearchResultsWidgetStyles();

    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [infiniteScrollLoading, setInfiniteScrollLoading] = useState(false);
    const observer = useRef();
    const lastOfferElementRef = useCallback((node) => {
        if (loading) return;
        if (infiniteScrollLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setOffset((previousOffset) => previousOffset + 5);
                setInfiniteScrollLoading(true);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore, infiniteScrollLoading, loading]);

    console.log(`Offset: ${offset}`);

    if (loading)
        return (
            <div
                data-testid="offer-items-container"
                className={`${classes.fullHeight} ${classes.fullWidth}`}
            >
                <LoadingOfferIcon />
            </div>
        );

    const handleOfferSelection = (...args) => {
        toggleShowSearchFilters(false);
        setSelectedOfferIdx(...args);
    };

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
                {infiniteScrollLoading && <LoadingOfferIcon dividerOnTop />}
            </List>
        </div>
    );
};

OfferItemsContainer.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)),
    loading: PropTypes.bool,
    selectedOfferIdx: PropTypes.number,
    setSelectedOfferIdx: PropTypes.func.isRequired,
    showSearchFilters: PropTypes.bool,
    toggleShowSearchFilters: PropTypes.func.isRequired,
};

export default OfferItemsContainer;

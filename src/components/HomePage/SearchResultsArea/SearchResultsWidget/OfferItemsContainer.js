import React, { useRef, useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, Divider, List, ListItem, makeStyles } from "@material-ui/core";
import { Tune } from "@material-ui/icons";

import OfferItem from "../Offer/OfferItem";
import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";
import LoadingOfferItem from "./LoadingOfferItem";
import Offer from "../Offer/Offer";

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
    initialOffersLoading,
    selectedOfferIdx,
    setSelectedOfferIdx,
    showSearchFilters,
    toggleShowSearchFilters,
    offers,
    moreOffersLoading,
    loadMoreOffers,
}) => {
    const classes = useSearchResultsWidgetStyles();

    const [lastOfferNode, setLastOfferNode] = useState(null);

    const observer = useRef();
    const lastOfferElementRef = useCallback((node) => {
        if (node) setLastOfferNode(node);
    }, []);

    useEffect(() => {

        if (initialOffersLoading || moreOffersLoading) {
            return;
        }

        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) loadMoreOffers();
        });
        if (lastOfferNode) observer.current.observe(lastOfferNode);
    }, [initialOffersLoading, lastOfferNode, loadMoreOffers, moreOffersLoading]);

    const handleOfferSelection = (...args) => {
        toggleShowSearchFilters(false);
        setSelectedOfferIdx(...args);
    };

    if (initialOffersLoading)
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
                            loading={initialOffersLoading}
                        />
                    </div>
                ))}
                {moreOffersLoading && <LoadingOfferItem dividerOnTop />}
            </List>
        </div>
    );
};

OfferItemsContainer.propTypes = {
    initialOffersLoading: PropTypes.bool,
    moreOffersLoading: PropTypes.bool,
    selectedOfferIdx: PropTypes.number,
    setSelectedOfferIdx: PropTypes.func.isRequired,
    showSearchFilters: PropTypes.bool,
    toggleShowSearchFilters: PropTypes.func.isRequired,
    offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)),
    loadMoreOffers: PropTypes.func,
};


export default OfferItemsContainer;

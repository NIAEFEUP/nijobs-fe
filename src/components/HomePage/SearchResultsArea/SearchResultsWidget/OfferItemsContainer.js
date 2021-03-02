import React from "react";
import PropTypes from "prop-types";
import Offer from "../Offer/Offer";
import OfferItem from "../Offer/OfferItem";

import {
    Button,
    Divider,
    List,
    ListItem,
    makeStyles,
} from "@material-ui/core";

import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";
import { Tune } from "@material-ui/icons";
import clsx from "clsx";

const useAdvancedSearchButtonStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3, "25%", 1, "25%"),
    },
    filtersButtonEnabled: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const ToogleFiltersButton = ({ onClick, enabled, ...props }) => {
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
                {`${!enabled ? "Show" : "Hide"} Filters`}
            </Button>
        </ListItem>
    );
};

const OfferItemsContainer = ({ offers, loading, selectedOffer, setSelectedOffer, showSearchFilters, toggleShowSearchFilters }) => {
    const classes = useSearchResultsWidgetStyles();

    if (loading) return (
        <div className={`${classes.fullHeight} ${classes.fullWidth}`}>
            <List disablePadding>
                <OfferItem
                    loading={loading}
                />
                <Divider component="li" />
                <OfferItem
                    loading={loading}
                />
                <Divider component="li" />
                <OfferItem
                    loading={loading}
                />
                <Divider component="li" />
            </List>
        </div>
    );

    const handleOfferSelection = (...args) => {
        toggleShowSearchFilters(false);
        setSelectedOffer(...args);
    };

    return (
        <div className={`${classes.fullHeight} ${classes.fullWidth}`}>
            <List disablePadding>
                <ToogleFiltersButton
                    enabled={showSearchFilters}
                    onClick={() => toggleShowSearchFilters()}
                />
                {offers.map((offer, i) => (
                    <React.Fragment key={offer.id}>
                        {i !== 0 && <Divider component="li" />}
                        <OfferItem
                            offer={offer}
                            selectedOffer={selectedOffer}
                            setSelectedOffer={handleOfferSelection}
                            loading={loading}
                        />
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
};

OfferItemsContainer.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)),
    loading: PropTypes.bool,
    selectedOffer: PropTypes.instanceOf(Offer),
    setSelectedOffer: PropTypes.func.isRequired,
};

export default OfferItemsContainer;

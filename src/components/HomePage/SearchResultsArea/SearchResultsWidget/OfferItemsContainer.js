import React from "react";
import PropTypes from "prop-types";
import Offer from "../Offer/Offer";
import OfferItem from "../Offer/OfferItem";

import {
    Divider,
    List,
} from "@material-ui/core";

import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";

const OfferItemsContainer = ({ offers, loading, setSelectedOffer }) => {
    const classes = useSearchResultsWidgetStyles();

    if (loading) return (
        <div className={classes.fullHeight}>
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

    return (
        <div className={classes.fullHeight}>
            <List disablePadding>
                {offers.map((offer, i) => (
                    <React.Fragment key={offer.id}>
                        {i !== 0 && <Divider component="li" />}
                        <OfferItem
                            offer={offer}
                            setSelectedOffer={setSelectedOffer}
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
    setSelectedOffer: PropTypes.func.isRequired,
};

export default OfferItemsContainer;

import React from "react";
import PropTypes from "prop-types";
import Offer from "../Offer/Offer";
import OfferItem from "../Offer/OfferItem";

import {
    Divider,
    List,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        height: "100%",
    },

}));

const OfferItemsContainer = ({ offers, loading, setSelectedOffer }) => {
    const classes = useStyles();
    if (loading) return "loading..."; // TODO: IMPLEMENT SKELETON LOADING

    return (
        <div className={classes.root}>
            <List disablePadding>
                {offers.map((offer, i) => (
                    <React.Fragment key={offer.id}>
                        {i !== 0 && <Divider component="li"/>}
                        <OfferItem
                            offer={offer}
                            setSelectedOffer={setSelectedOffer}
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

import React from "react";
import PropTypes from "prop-types";

import OfferItem from "../Offer/OfferItem";
import { Divider, List } from "@material-ui/core";

const LoadingOfferIcon = ({ dividerOnTop }) => (
    <List disablePadding>
        {dividerOnTop && <Divider component="li" />}
        <OfferItem loading />
        <Divider component="li" />
        <OfferItem loading />
        <Divider component="li" />
        <OfferItem loading />
        <Divider component="li" />
    </List>
);

LoadingOfferIcon.propTypes = {
    dividerOnTop: PropTypes.bool,
};

export default LoadingOfferIcon;

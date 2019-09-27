import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";
import Offer from "./Offer";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },


}));

const OfferContent = ({ offer }) => {
    const classes = useStyles();
    if (offer === null) {
        return (
            <div className={classes.root}>
                Please select an offer to view the details
            </div>
        );
    } else {
        return (
            <div className={classes.root}>
                <Typography
                    variant="h2"
                    gutterBottom={true}
                >
                    {offer.position}
                </Typography>
                <Typography variant="h4">
                    {offer.company.name}
                </Typography>
                <p>
                    {offer.description}
                </p>
            </div>

        );
    }
};

OfferContent.propTypes = {
    offer: PropTypes.instanceOf(Offer),
};

export default OfferContent;

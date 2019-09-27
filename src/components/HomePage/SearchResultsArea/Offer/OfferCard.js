import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Typography,
} from "@material-ui/core";

import OfferSubHeader from "./OfferSubHeader";
import OfferSkeletonLoader from "./OfferSkeletonLoader";

import OfferCardTheme from "./OfferCardTheme";
import Offer from "./Offer";

const logo = require("./ni.png");

const useStyles = makeStyles(OfferCardTheme);

const OfferCard = (props) => {

    const { offer, loading } = props;
    const classes = useStyles();

    if (loading) {
        return (<OfferSkeletonLoader />);
    }

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.logo}
                image={logo}
                title={`${offer.company} logo`}
            />
            <div className={classes.details}>
                <CardHeader
                    classes={{
                        root: classes.header,
                        title: classes.title,
                        subheader: classes.subheader,
                    }}
                    title={offer.position}
                    titleTypographyProps={{ variant: "h5" }}
                    subheader={
                        <OfferSubHeader
                            company={offer.company}
                            location={offer.location}
                            date={offer.date}
                        />
                    }
                    subheaderTypographyProps={{ variant: "caption" }}
                />
                <CardContent className={classes.content}>
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                            Description
                    </Typography>
                    <Typography
                        variant="body1"
                    >
                        {offer.description}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
};

OfferCard.propTypes = {
    offer: PropTypes.instanceOf(Offer),
    loading: PropTypes.bool,
};

export default OfferCard;

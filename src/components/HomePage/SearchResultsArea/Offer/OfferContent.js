import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";
import Offer from "./Offer";

import LoadingMagnifyGlass from "./loading_magnify_glass_svg";
import { useDesktop } from "../../../../utils/media-queries";

import useSearchResultsWidgetStyles from "../SearchResultsWidget/searchResultsWidgetStyles";

const getRandomOngoingSearchMessage = () => {
    const messages = [
        "Crunching the bits to find the best offers...",
        "Roses are red, Violets are blue, how many offers will we find for you?",
    ];

    return messages[Math.floor(Math.random() * messages.length)];
};

const OfferContent = ({ offer, loading }) => {
    const classes = useSearchResultsWidgetStyles({ isMobile: !useDesktop() });
    if (loading) {
        return (
            <div className={classes.offerContent}>
                <div className={classes.unselectedOffer}>
                    <React.Fragment>
                        <div className={classes.magnifyingGlassAnimationWrapper}>
                            <LoadingMagnifyGlass duration={1.2}/>
                        </div>
                        <Typography variant="h6">
                            {getRandomOngoingSearchMessage()}
                        </Typography>
                    </React.Fragment>

                </div>
            </div>
        );
    } else {
        return (
            <div className={classes.offerContent}>
                {offer === null ?
                    <div className={classes.unselectedOffer}>
                        <Typography variant="h5" classes={{ root: classes.pleaseSelectOfferText }}>
                            Please select an offer to view the details
                        </Typography>
                    </div>
                    :
                    <React.Fragment>
                        <Typography variant="h2" gutterBottom>
                            {offer.position}
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                            {offer.company.name}
                        </Typography>
                        <Typography variant="body1">
                            {offer.description}
                        </Typography>
                    </React.Fragment>
                }
            </div>
        );
    }
};

OfferContent.propTypes = {
    offer: PropTypes.instanceOf(Offer),
    loading: PropTypes.bool,
};

export default OfferContent;

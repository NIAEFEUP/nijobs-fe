import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";

import LoadingMagnifyGlass from "./loading_magnify_glass_svg";
import LOADING_MESSAGES from "./offerLoadingMessages";

const getRandomOngoingSearchMessage = () => LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

const UnselectedOffer = ({ classes }) => (
    <div className={classes.offerWidget} data-testid="offer-content">
        <div className={classes.unselectedOffer}>
            <React.Fragment>
                <div className={classes.magnifyingGlassAnimationWrapper}>
                    <LoadingMagnifyGlass duration={1.2} />
                </div>
                <Typography data-testid="random-loading-message" variant="h6">
                    {getRandomOngoingSearchMessage()}
                </Typography>
            </React.Fragment>
        </div>
    </div>
);

UnselectedOffer.propTypes = {
    classes: PropTypes.shape({
        offerWidget: PropTypes.string.isRequired,
        unselectedOffer: PropTypes.string.isRequired,
        magnifyingGlassAnimationWrapper: PropTypes.string.isRequired,
    }),
};

export default UnselectedOffer;

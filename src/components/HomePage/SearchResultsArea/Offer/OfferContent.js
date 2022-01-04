import React from "react";
import PropTypes from "prop-types";

import { Typography, Divider } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import Offer from "./Offer";
import OfferDescription from "./OfferDescription";
import OfferContentListItem from "./OfferContentListItem";

const OfferContent = ({ classes, offer, loading }) => (
    <div>
        <Divider className={classes.offerDivider} />
        <OfferContentListItem
            title="Requirements"
            items={offer?.requirements}
            loading={loading}
        />
        <div className={classes?.offerDescription}>
            <Typography
                component="span" /* if we don't use component="span",
                                                there is a <p> element inside a <p>,
                                                which fails the validateDOMNesting*/
                variant="body1"
            >
                {
                loading ?
                    <Skeleton variant="rect" height="100px" />
                    : 
                    <div>
                        <Divider className={classes.offerDivider} />  
                        <OfferDescription content={offer?.description} />
                    </div>    
                }
            </Typography>
        </div>
    </div>
);

OfferContent.propTypes = {
    classes: PropTypes.shape({
        offerDivider: PropTypes.string.isRequired,
        offerDescription: PropTypes.string.isRequired,
    }),
    offer: PropTypes.instanceOf(Offer),
    loading: PropTypes.bool,
};

export default OfferContent;

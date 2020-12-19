import React from "react";
import PropTypes from "prop-types";
import { Grid, Divider, Typography } from "@material-ui/core";
import OfferItemsContainer from "./OfferItemsContainer";
import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";
import SearchArea from "../../SearchArea/SearchArea";
import OfferContent from "../Offer/OfferContent";
import Offer from "../Offer/Offer";
import { WorkOff } from "@material-ui/icons";

const OffersList = ({ noOffers, classes, offers, selectedOffer, offersLoading, setSelectedOffer }) => (
    <Grid item md={4} id="offer_list" className={classes.fullHeight}>
        <Grid container className={classes.fullHeight}>
            <div className={classes.offerItemsContainer}>
                {noOffers ?
                    <div className={classes.noOffersColumn}>
                        <WorkOff className={classes.errorLoadingOffersIcon} />
                        <Typography>No offers available.</Typography>
                    </div>
                    :
                    <OfferItemsContainer
                        offers={offers}
                        selectedOffer={selectedOffer}
                        loading={offersLoading}
                        setSelectedOffer={setSelectedOffer}
                        noOffers={noOffers}
                    />
                }
                <Divider
                    className={`${classes.divider} ${classes.fullHeight}`}
                    orientation="vertical"
                    variant="middle"
                />
            </div>
        </Grid>
    </Grid>
);

OffersList.propTypes = {
    noOffers: PropTypes.bool.isRequired,
    classes: PropTypes.shape({
        divider: PropTypes.string.isRequired,
        fullHeight: PropTypes.string.isRequired,
        offerItemsContainer: PropTypes.string.isRequired,
        noOffersColumn: PropTypes.string.isRequired,
        errorLoadingOffersIcon: PropTypes.string.isRequired,
    }),
    offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)),
    offersLoading: PropTypes.bool,
    selectedOffer: PropTypes.instanceOf(Offer),
    setSelectedOffer: PropTypes.func.isRequired,
};

const OfferContentSection = ({ noOffers, classes, selectedOffer, offersLoading }) => (
    <Grid item md={8} id="offer_content" className={classes.fullHeight}>
        {noOffers ?
            <div className={classes.searchOfferErrorContainer}>
                <Typography className={classes.reviseCriteriaErrorMessage} variant="h6">
                                We could not fetch the offers you were looking for, please revise your search criteria.
                </Typography>
                <div className={classes.searchArea}>
                    <SearchArea />
                </div>
            </div>
            :
            <div className={classes.offerBodyContainer}>
                <OfferContent offer={selectedOffer} loading={offersLoading} />
            </div>
        }
    </Grid>
);

OfferContentSection.propTypes = {
    noOffers: PropTypes.bool.isRequired,
    classes: PropTypes.shape({
        searchOfferErrorContainer: PropTypes.string.isRequired,
        reviseCriteriaErrorMessage: PropTypes.string.isRequired,
        searchArea: PropTypes.string.isRequired,
        offerBodyContainer: PropTypes.string.isRequired,
        fullHeight: PropTypes.string.isRequired,
    }),
    offersLoading: PropTypes.bool,
    selectedOffer: PropTypes.instanceOf(Offer),
};

const SearchResultsDesktop = ({ offers, offersLoading, setSelectedOffer, selectedOffer, noOffers }) => {
    const classes = useSearchResultsWidgetStyles();

    const offersListClasses = {
        fullHeight: classes.fullHeight,
        noOffersColumn: classes.noOffersColumn,
        errorLoadingOffersIcon: classes.errorLoadingOffersIcon,
        divider: classes.divider,
        offerItemsContainer: classes.offerItemsContainer,
    };

    const offerContentClasses = {
        searchOfferErrorContainer: classes.searchOfferErrorContainer,
        reviseCriteriaErrorMessage: classes.reviseCriteriaErrorMessage,
        offerBodyContainer: classes.offerBodyContainer,
        searchArea: classes.searchArea,
        fullHeight: classes.fullHeight,
    };

    return (
        <React.Fragment>
            <OffersList
                classes={offersListClasses}
                noOffers={noOffers}
                offers={offers}
                offersLoading={offersLoading}
                selectedOffer={selectedOffer}
                setSelectedOffer={setSelectedOffer}
            />
            <OfferContentSection
                classes={offerContentClasses}
                noOffers={noOffers}
                selectedOffer={selectedOffer}
                offersLoading={offersLoading}
            />
        </React.Fragment>
    );
};

SearchResultsDesktop.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)),
    selectedOffer: PropTypes.instanceOf(Offer),
    offersLoading: PropTypes.bool,
    setSelectedOffer: PropTypes.func.isRequired,
    noOffers: PropTypes.bool.isRequired,
};

export default SearchResultsDesktop;

import React from "react";
import PropTypes from "prop-types";
import { Typography, Dialog, DialogTitle, IconButton, DialogContent, Grid } from "@material-ui/core";
import OfferItemsContainer from "./OfferItemsContainer";
import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";
import SearchArea from "../../SearchArea/SearchArea";
import OfferContent from "../Offer/OfferContent";
import Offer from "../Offer/Offer";
import useToggle from "../../../../hooks/useToggle";
import { NavigateBefore, WorkOff } from "@material-ui/icons";

const OffersList = ({ noOffers, classes, offers, offersLoading, showOfferDetails, showSearchFilters, toggleShowSearchFilters }) => (
    <Grid container className={classes.fullHeight}>
        <Grid xs={12} item className={classes.offerItemsContainer}>
            {noOffers ?
                <div id="no_offers_container" className={classes.noOffersColumn}>
                    <WorkOff className={classes.errorLoadingOffersIcon} />
                    <Typography variant="h6">No offers available.</Typography>
                    <Typography className={classes.reviseCriteriaErrorMessage} variant="h6">Try a different criteria.</Typography>
                    <SearchArea />
                </div>
                :
                <OfferItemsContainer
                    offers={offers}
                    loading={offersLoading}
                    setSelectedOffer={showOfferDetails}
                    noOffers={noOffers}
                    showSearchFilters={showSearchFilters}
                    toggleShowSearchFilters={toggleShowSearchFilters}
                />
            }
        </Grid>
    </Grid>
);

OffersList.propTypes = {
    noOffers: PropTypes.bool.isRequired,
    classes: PropTypes.shape({
        reviseCriteriaErrorMessage: PropTypes.string.isRequired,
        fullHeight: PropTypes.string.isRequired,
        errorLoadingOffersIcon: PropTypes.string.isRequired,
        noOffersColumn: PropTypes.string.isRequired,
        offerItemsContainer: PropTypes.string.isRequired,
    }),
    offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)),
    offersLoading: PropTypes.bool,
    showOfferDetails: PropTypes.func.isRequired,
    showSearchFilters: PropTypes.bool.isRequired,
    toggleShowSearchFilters: PropTypes.func.isRequired,
};

export const OfferViewer = ({ open, toggleOpenPreview, offerContentWrapperClassName, selectedOffer, offersLoading }) => (
    <Dialog
        fullScreen
        open={open}
    >
        <DialogTitle>
            <IconButton
                aria-label="back"
                onClick={toggleOpenPreview}
                color="secondary"
            >
                <NavigateBefore />
            </IconButton>
                    Offer Details
        </DialogTitle>
        <DialogContent>
            <div className={offerContentWrapperClassName}>
                <OfferContent offer={selectedOffer} loading={offersLoading} />
            </div>
        </DialogContent>
    </Dialog>
);

OfferViewer.propTypes = {
    open: PropTypes.bool,
    toggleOpenPreview: PropTypes.func,
    offerContentWrapperClassName: PropTypes.string,
    selectedOffer: PropTypes.instanceOf(Offer),
    offersLoading: PropTypes.bool,
};

const SearchResultsMobile = ({ offers, offersLoading, setSelectedOffer, selectedOffer,
    noOffers, showSearchFilters, toggleShowSearchFilters,
}) => {
    const classes = useSearchResultsWidgetStyles();
    const [openPreview, toggleOpenPreview] = useToggle(false);

    const showOfferDetails = (offer) => {
        setSelectedOffer(offer);
        toggleOpenPreview();
    };

    const offerListClasses = {
        noOffersColumn: classes.noOffersColumn,
        errorLoadingOffersIcon: classes.errorLoadingOffersIcon,
        reviseCriteriaErrorMessage: classes.reviseCriteriaErrorMessage,
        fullHeight: classes.fullHeight,
        offerItemsContainer: classes.offerItemsContainer,
    };

    return (
        <React.Fragment>
            <OffersList
                classes={offerListClasses}
                noOffers={noOffers}
                offers={offers}
                offersLoading={offersLoading}
                showOfferDetails={showOfferDetails}
                showSearchFilters={showSearchFilters}
                toggleShowSearchFilters={toggleShowSearchFilters}
            />
            {showSearchFilters ?
                <SearchArea
                    advanced
                    onSubmit={() => {
                        toggleShowSearchFilters(false);
                    }}
                    onMobileClose={() => {
                        toggleShowSearchFilters(false);
                    }}
                />
                :
                <OfferViewer
                    open={openPreview}
                    toggleOpenPreview={toggleOpenPreview}
                    offerContentWrapperClassName={classes.offerBodyContainer}
                    selectedOffer={selectedOffer}
                    offersLoading={offersLoading}
                />
            }

        </React.Fragment>
    );
};

SearchResultsMobile.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)),
    selectedOffer: PropTypes.instanceOf(Offer),
    offersLoading: PropTypes.bool,
    setSelectedOffer: PropTypes.func.isRequired,
    noOffers: PropTypes.bool.isRequired,
    showSearchFilters: PropTypes.bool.isRequired,
    toggleShowSearchFilters: PropTypes.func.isRequired,
};

export default SearchResultsMobile;

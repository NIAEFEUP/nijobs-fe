import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Typography, Dialog, DialogTitle, IconButton, DialogContent, Grid } from "@material-ui/core";
import OfferItemsContainer from "./OfferItemsContainer";
import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";
import SearchArea from "../../SearchArea/SearchArea";
import OfferWidget from "../Offer/OfferWidget";
import Offer from "../Offer/Offer";
import useToggle from "../../../../hooks/useToggle";
import { NavigateBefore, WorkOff } from "@material-ui/icons";
import { SearchResultsControllerContext } from "./SearchResultsWidget";

const OffersList = ({
    noOffers, classes, offersLoading, showOfferDetails, showSearchFilters,
    toggleShowSearchFilters, offers, moreOffersLoading, loadMoreOffers,
}) => (
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
                    initialOffersLoading={offersLoading}
                    setSelectedOfferIdx={showOfferDetails}
                    noOffers={noOffers}
                    showSearchFilters={showSearchFilters}
                    toggleShowSearchFilters={toggleShowSearchFilters}
                    offers={offers}
                    moreOffersLoading={moreOffersLoading}
                    loadMoreOffers={loadMoreOffers}
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
    offersLoading: PropTypes.bool,
    showOfferDetails: PropTypes.func.isRequired,
    showSearchFilters: PropTypes.bool.isRequired,
    toggleShowSearchFilters: PropTypes.func.isRequired,
    offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)),
    moreOffersLoading: PropTypes.bool,
};

export const OfferViewer = ({
    open,
    toggleOpenPreview,
    offerWidgetWrapperClassName,
    offer,
    handleDisableOffer,
    handleHideOffer,
    handleCompanyEnableOffer,
    handleAdminEnableOffer,
    offersLoading,
}) => (
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
            <div className={offerWidgetWrapperClassName}>
                <OfferWidget
                    offer={offer}
                    handleDisableOffer={handleDisableOffer}
                    handleHideOffer={handleHideOffer}
                    handleCompanyEnableOffer={handleCompanyEnableOffer}
                    handleAdminEnableOffer={handleAdminEnableOffer}
                    loading={offersLoading}
                />
            </div>
        </DialogContent>
    </Dialog>
);

OfferViewer.propTypes = {
    open: PropTypes.bool,
    toggleOpenPreview: PropTypes.func,
    offerWidgetWrapperClassName: PropTypes.string,
    offer: PropTypes.instanceOf(Offer),
    offersLoading: PropTypes.bool,
    handleDisableOffer: PropTypes.func,
    handleHideOffer: PropTypes.func,
    handleCompanyEnableOffer: PropTypes.func,
    handleAdminEnableOffer: PropTypes.func,
};

const SearchResultsMobile = () => {
    const classes = useSearchResultsWidgetStyles();
    const [openPreview, toggleOpenPreview] = useToggle(false);

    const {
        noOffers,
        offers,
        offersLoading,
        selectedOfferIdx,
        setSelectedOfferIdx,
        handleDisableOffer,
        handleHideOffer,
        handleCompanyEnableOffer,
        handleAdminEnableOffer,
        showSearchFilters,
        toggleShowSearchFilters,
        moreOffersLoading,
        loadMoreOffers,
    } = useContext(SearchResultsControllerContext);

    const showOfferDetails = (offerIdx) => {
        setSelectedOfferIdx(offerIdx);
        toggleOpenPreview();
    };

    const offerListClasses = {
        noOffersColumn: classes.noOffersColumn,
        errorLoadingOffersIcon: classes.errorLoadingOffersIcon,
        reviseCriteriaErrorMessage: classes.reviseCriteriaErrorMessage,
        fullHeight: classes.fullHeight,
        offerItemsContainer: classes.offerItemsContainer,
    };

    const selectedOffer = (selectedOfferIdx !== null && offers?.length > selectedOfferIdx)
        ? offers[selectedOfferIdx] : null;

    return (
        <React.Fragment>
            <OffersList
                classes={offerListClasses}
                noOffers={noOffers}
                offersLoading={offersLoading}
                showOfferDetails={showOfferDetails}
                showSearchFilters={showSearchFilters}
                toggleShowSearchFilters={toggleShowSearchFilters}
                offers={offers}
                moreOffersLoading={moreOffersLoading}
                loadMoreOffers={loadMoreOffers}
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
                    offerWidgetWrapperClassName={classes.offerBodyContainer}
                    offer={selectedOffer}
                    handleDisableOffer={handleDisableOffer}
                    handleHideOffer={handleHideOffer}
                    handleCompanyEnableOffer={handleCompanyEnableOffer}
                    handleAdminEnableOffer={handleAdminEnableOffer}
                    offersLoading={offersLoading}
                />
            }

        </React.Fragment>
    );
};

export default SearchResultsMobile;

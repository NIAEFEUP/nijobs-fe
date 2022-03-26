import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Grid, Divider, Typography } from "@material-ui/core";
import OfferItemsContainer from "./OfferItemsContainer";
import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";
import SearchArea from "../../SearchArea/SearchArea";
import OfferWidget from "../Offer/OfferWidget";
import Offer from "../Offer/Offer";
import { WorkOff } from "@material-ui/icons";
import clsx from "clsx";
import { SearchResultsControllerContext } from "./SearchResultsWidget";

const OffersList = ({
    noOffers, classes, selectedOfferIdx, offersLoading, setSelectedOfferIdx,
    showSearchFilters, toggleShowSearchFilters, offers, moreOffersLoading, loadMoreOffers,
}) => (
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
                        selectedOfferIdx={selectedOfferIdx}
                        initialOffersLoading={offersLoading}
                        setSelectedOfferIdx={setSelectedOfferIdx}
                        noOffers={noOffers}
                        showSearchFilters={showSearchFilters}
                        toggleShowSearchFilters={toggleShowSearchFilters}
                        offers={offers}
                        moreOffersLoading={moreOffersLoading}
                        loadMoreOffers={loadMoreOffers}
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
    offersLoading: PropTypes.bool,
    selectedOfferIdx: PropTypes.number,
    setSelectedOfferIdx: PropTypes.func.isRequired,
    showSearchFilters: PropTypes.bool.isRequired,
    toggleShowSearchFilters: PropTypes.func.isRequired,
    offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)),
};

const OfferWidgetSection = ({
    noOffers,
    classes,
    offer,
    handleDisableOffer,
    handleHideOffer,
    handleCompanyEnableOffer,
    handleAdminEnableOffer,
    offersLoading,
}) => (
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
                <OfferWidget
                    offer={offer}
                    handleDisableOffer={handleDisableOffer}
                    handleHideOffer={handleHideOffer}
                    handleCompanyEnableOffer={handleCompanyEnableOffer}
                    handleAdminEnableOffer={handleAdminEnableOffer}
                    loading={offersLoading}
                />
            </div>
        }
    </Grid>
);

OfferWidgetSection.propTypes = {
    noOffers: PropTypes.bool,
    classes: PropTypes.shape({
        searchOfferErrorContainer: PropTypes.string.isRequired,
        reviseCriteriaErrorMessage: PropTypes.string.isRequired,
        searchArea: PropTypes.string.isRequired,
        offerBodyContainer: PropTypes.string.isRequired,
        fullHeight: PropTypes.string.isRequired,
    }),
    offersLoading: PropTypes.bool,
    offer: PropTypes.instanceOf(Offer),
    handleDisableOffer: PropTypes.func,
    handleHideOffer: PropTypes.func,
    handleCompanyEnableOffer: PropTypes.func,
    handleAdminEnableOffer: PropTypes.func,
};

const SearchResultsDesktop = () => {
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
    const classes = useSearchResultsWidgetStyles();

    const offersListClasses = {
        fullHeight: classes.fullHeight,
        noOffersColumn: classes.noOffersColumn,
        errorLoadingOffersIcon: classes.errorLoadingOffersIcon,
        divider: classes.divider,
        offerItemsContainer: classes.offerItemsContainer,
    };

    const OfferWidgetClasses = {
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
                offersLoading={offersLoading}
                selectedOfferIdx={selectedOfferIdx}
                setSelectedOfferIdx={setSelectedOfferIdx}
                showSearchFilters={showSearchFilters}
                toggleShowSearchFilters={toggleShowSearchFilters}
                offers={offers}
                moreOffersLoading={moreOffersLoading}
                loadMoreOffers={loadMoreOffers}
            />
            {showSearchFilters ?
                <Grid
                    item
                    md={8}
                    id="search_filters"
                    className={clsx(classes.fullHeight, classes.searchOfferErrorContainer)}
                >
                    <div className={classes.searchArea}>
                        <SearchArea
                            advanced
                            onSubmit={() => {
                                toggleShowSearchFilters(false);
                            }}
                        />
                    </div>
                </Grid>
                :
                <OfferWidgetSection
                    classes={OfferWidgetClasses}
                    noOffers={noOffers}
                    offer={selectedOfferIdx !== null && offers?.length > 0 ? offers[selectedOfferIdx] : null}
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

export default SearchResultsDesktop;

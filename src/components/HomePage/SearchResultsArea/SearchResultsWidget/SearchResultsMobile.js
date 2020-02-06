import React from "react";
import PropTypes from "prop-types";
import { Typography, Dialog, DialogTitle, IconButton, DialogContent, Grid } from "@material-ui/core";
import OfferItemsContainer from "./OfferItemsContainer";
import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";
import SearchArea from "../../SearchArea/SearchArea";
import OfferContent from "../Offer/OfferContent";
import Offer from "../Offer/Offer";
import useToggle from "../../../../hooks/useToggle";
import { ArrowBackIos, WorkOff } from "@material-ui/icons";

const SearchResultsMobile = ({ offers, offersLoading, setSelectedOffer, selectedOffer, noOffers }) => {
    const classes = useSearchResultsWidgetStyles();
    const [openPreview, toggleOpenPreview] = useToggle(false);

    const showOfferDetails = (offer) => {
        setSelectedOffer(offer);
        toggleOpenPreview();
    };

    return (
        <React.Fragment>
            <Grid xs={12} container>
                <Grid xs={12} item>
                    {noOffers ?
                        <div className={classes.noOffersColumn}>
                            <WorkOff className={classes.errorLoadingOffersIcon} />
                            <Typography variant="h6">No offers available.</Typography>
                            <Typography className={classes.reviseCriteriaErrorMessage} variant="h6">Try a different criteria.</Typography>
                            <SearchArea/>
                        </div>
                        :
                        <OfferItemsContainer
                            offers={offers}
                            loading={offersLoading}
                            showDetails={showOfferDetails}
                            noOffers={noOffers}
                        />
                    }
                </Grid>
            </Grid>
            <Dialog
                fullScreen
                open={openPreview}
            >
                <DialogTitle>
                    <IconButton
                        aria-label="back"
                        onClick={toggleOpenPreview}
                        color="secondary"
                    >
                        <ArrowBackIos />
                    </IconButton>
                    Offer Details
                </DialogTitle>
                <DialogContent>
                    <div className={classes.offerBodyContainer}>
                        <OfferContent offer={selectedOffer} loading={offersLoading}/>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

SearchResultsMobile.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)),
    selectedOffer: PropTypes.instanceOf(Offer),
    offersLoading: PropTypes.bool,
    setSelectedOffer: PropTypes.func.isRequired,
    noOffers: PropTypes.bool.isRequired,
};

export default SearchResultsMobile;

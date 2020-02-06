import React from "react";
import PropTypes from "prop-types";
import { Grid, Divider, Typography } from "@material-ui/core";
import OfferItemsContainer from "./OfferItemsContainer";
import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";
import SearchArea from "../../SearchArea/SearchArea";
import OfferContent from "../Offer/OfferContent";
import Offer from "../Offer/Offer";
import { WorkOff } from "@material-ui/icons";

const SearchResultsDesktop = ({ offers, offersLoading, setSelectedOffer, selectedOffer, noOffers }) => {
    const classes = useSearchResultsWidgetStyles();

    return (
        <React.Fragment>
            <Grid item md={4} id="offer_list">
                <Grid container className={classes.fullHeight}>
                    <Grid item md={11}>
                        {noOffers ?
                            <div className={classes.noOffersColumn}>
                                <WorkOff className={classes.errorLoadingOffersIcon} />
                                <Typography>No offers available.</Typography>
                            </div>
                            :
                            <OfferItemsContainer
                                offers={offers}
                                loading={offersLoading}
                                showDetails={setSelectedOffer}
                                noOffers={noOffers}
                            />
                        }

                    </Grid>
                    <Grid item md={1}>
                        <Divider
                            className={`${classes.divider} ${classes.fullHeight}`}
                            orientation="vertical"
                            variant="middle"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={8} id="offer_content">
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
                        <OfferContent offer={selectedOffer} loading={offersLoading}/>
                    </div>
                }
            </Grid>
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

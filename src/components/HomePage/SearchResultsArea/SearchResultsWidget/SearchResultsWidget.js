import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Grid, Paper, Divider, Typography } from "@material-ui/core";

import OfferItemsContainer from "./OfferItemsContainer";
import OfferContent from "../Offer/OfferContent";
import { WorkOff } from "@material-ui/icons";

import SearchArea from "../../SearchArea/SearchArea";

import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";

export const SearchResultsWidget = ({ setRef, offers, offersLoading, offersSearchError }) => {
    const ref = useRef(null);
    setRef(ref);

    const [selectedOffer, setSelectedOffer] = useState(null);

    const classes = useSearchResultsWidgetStyles();

    return (
        <Paper elevation={2}>
            <Grid
                ref={ref}
                className={classes.searchResults}
                container
                spacing={0}
            >
                <Grid item lg={3} id="offer_list">
                    <Grid container className={classes.fullHeight}>
                        <Grid item lg={11}>
                            {(offersSearchError || (!offersLoading && offers.length === 0)) ?
                                <div className={classes.noOffersColumn}>
                                    <WorkOff className={classes.errorLoadingOffersIcon} />
                                    <Typography>No offers available.</Typography>
                                </div>
                                :
                                <OfferItemsContainer
                                    offers={offers}
                                    loading={offersLoading}
                                    setSelectedOffer={setSelectedOffer}
                                />
                            }
                        </Grid>
                        <Grid item lg={1}>
                            <Divider
                                className={`${classes.divider} ${classes.fullHeight}`}
                                orientation="vertical"
                                variant="middle"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={9} id="offer_content">
                    {(offersSearchError || (!offersLoading && offers.length === 0)) ?
                        <div className={classes.searchOfferErrorContainer}>
                            <Typography className={classes.reviseCriteriaErrorMessage} variant="h6">
                                We could not fetch the offers you were looking for. Please revise your search criteria.
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
            </Grid>
        </Paper>
    );
};

SearchResultsWidget.propTypes = {
    setRef: PropTypes.func.isRequired,
    offers: PropTypes.array,
    offersLoading: PropTypes.bool,
    offersSearchError: PropTypes.object,
};

const mapStateToProps = (state) => ({
    offers: state.offerSearch.offers,
    offersLoading: state.offerSearch.loading,
    offersSearchError: state.offerSearch.error,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsWidget);

import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Divider } from "@material-ui/core";

import OfferItemsContainer from "./OfferItemsContainer";
import OfferContent from "../Offer/OfferContent";

import homePageStyles from "../../HomePage.module.css";

const useStyles = makeStyles(() => ({
    divider: {
        margin: 0,
    },
    fullHeight: {
        height: "100%",
    },

}));

const SearchResultsWidget = ({ setRef, offers }) => {
    const ref = useRef(null);
    setRef(ref);

    const [selectedOffer, setSelectedOffer] = useState(null);

    const classes = useStyles();

    return (
        <Paper elevation={2}>

            <Grid
                ref={ref}
                className={homePageStyles.searchResults}
                container
                spacing={0}
            >

                <Grid
                    item
                    lg={3}
                >
                    <Grid
                        container
                        className={classes.fullHeight}
                    >
                        <Grid
                            item
                            lg={11}
                        >
                            <OfferItemsContainer
                                offers={offers}
                                loading={offers.length === 0}
                                setSelectedOffer={setSelectedOffer}
                            />
                        </Grid>
                        <Grid
                            item
                            lg={1}
                        >
                            <Divider
                                className={`${classes.divider} ${classes.fullHeight}`}
                                orientation="vertical"
                                variant="middle"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    lg={9}
                >
                    <div style={{ height: "100%", paddingLeft: "2em" }}>
                        <OfferContent offer={selectedOffer}/>
                    </div>
                </Grid>
            </Grid>
        </Paper>


    );

};

SearchResultsWidget.propTypes = {
    setRef: PropTypes.func.isRequired,
    offers: PropTypes.array,
};

export default SearchResultsWidget;

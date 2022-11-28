import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, Divider, List, ListItem, Dialog, makeStyles } from "@material-ui/core";
import { Tune, Share } from "@material-ui/icons";

import OfferItem from "../Offer/OfferItem";
import useSearchResultsWidgetStyles from "./searchResultsWidgetStyles";
import LoadingOfferItem from "./LoadingOfferItem";
import Offer from "../Offer/Offer";
import { SearchResultsConstants } from "./SearchResultsUtils";

import SearchURLWidget from "./SearchURLWidget";

import { useMobile } from "../../../../utils/media-queries";

const useAdvancedSearchButtonStyles = makeStyles((theme) => ({
    root: (isMobile) => ({
        top: "0",
        position: "sticky",
        padding: theme.spacing(isMobile ? 1.5 : 3, "5%"),
        zIndex: 1,
        backgroundColor: "white",
    }),
    filtersButtonEnabled: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const ToggleFiltersButton = ({ onClick, isMobile, enabled, ...props }) => {
    const classes = useAdvancedSearchButtonStyles(isMobile);
    return (
        <ListItem className={classes.root}>
            <Button
                variant="contained"
                color="primary"
                className={clsx({ [classes.filtersButtonEnabled]: enabled })}
                fullWidth
                startIcon={<Tune />}
                onClick={onClick}
                {...props}
            >
                {`${!enabled ? "Adjust" : "Hide"} Filters`}
            </Button>
        </ListItem>
    );
};

ToggleFiltersButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    enabled: PropTypes.bool,
    isMobile: PropTypes.bool,
};

const ShareURLModalButton = ({ onClick, isMobile }) => {
    const classes = useAdvancedSearchButtonStyles(isMobile);
    return (
        <ListItem className={classes.root}>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<Share />}
                onClick={onClick}
            >
                {"Share search results"}
            </Button>
        </ListItem>
    );
};

ShareURLModalButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    isMobile: PropTypes.bool,
};

const OfferItemsContainer = ({
    initialOffersLoading,
    selectedOfferIdx,
    setSelectedOfferIdx,
    showSearchFilters,
    toggleShowSearchFilters,
    offers,
    moreOffersLoading,
    loadMoreOffers,
    searchQueryToken,
}) => {
    const classes = useSearchResultsWidgetStyles();

    const [offerResultsWrapperNode, setOfferResultsWrapperNode] = useState(null);
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const [hasScroll, setHasScroll] = useState(undefined);

    const isVerticalScrollable = useCallback((node) => {
        const overflowY = window.getComputedStyle(node)["overflow-y"];
        return (overflowY === "scroll" || overflowY === "auto") && node.scrollHeight > node.clientHeight;
    }, []);

    const refetchTriggerRef = useCallback((node) => {
        if (node) setOfferResultsWrapperNode(node.parentElement);
    }, []);

    const onScroll = useCallback(() => {
        if (offerResultsWrapperNode) {
            setScrollPercentage(
                100 * offerResultsWrapperNode.scrollTop
                / (offerResultsWrapperNode.scrollHeight - offerResultsWrapperNode.clientHeight)
            );

        }
    }, [offerResultsWrapperNode]);

    useEffect(() => {
        if (!offerResultsWrapperNode) return;

        offerResultsWrapperNode.addEventListener("scroll", onScroll);
        // eslint-disable-next-line consistent-return
        return () => offerResultsWrapperNode.removeEventListener("scroll", onScroll);
    }, [offerResultsWrapperNode, onScroll]);

    useEffect(() => {
        if (!offerResultsWrapperNode) return;

        setHasScroll(isVerticalScrollable(offerResultsWrapperNode));
    }, [isVerticalScrollable, offerResultsWrapperNode, offers, initialOffersLoading, scrollPercentage, moreOffersLoading]);

    useEffect(() => {
        if (initialOffersLoading) {
            setHasScroll(undefined);
            setScrollPercentage(0);
        }
    }, [initialOffersLoading]);

    useEffect(() => {

        if (initialOffersLoading || moreOffersLoading) {
            return;
        }

        if (scrollPercentage > 80 || hasScroll === false) loadMoreOffers(searchQueryToken, SearchResultsConstants.FETCH_NEW_OFFERS_LIMIT);
    }, [hasScroll, initialOffersLoading, loadMoreOffers, moreOffersLoading, scrollPercentage, searchQueryToken]);

    const handleOfferSelection = (...args) => {
        toggleShowSearchFilters(false);
        setSelectedOfferIdx(...args);
    };

    const [openShareUrlModal, setOpenShareUrlModal] = useState(false);

    const isMobile = useMobile();

    const ButtonWrapper = isMobile ? React.Fragment : ListItem;

    if (initialOffersLoading)
        return (
            <div
                data-testid="offer-items-container"
                className={`${classes.fullHeight} ${classes.fullWidth}`}
            >
                <LoadingOfferItem />
            </div>
        );

    return (
        <div
            data-testid="offer-items-container"
            className={`${classes.fullHeight} ${classes.fullWidth}`}
            ref={refetchTriggerRef}
        >
            <List disablePadding>
                <ButtonWrapper>
                    <ToggleFiltersButton
                        key="toggle-filters-button"
                        enabled={showSearchFilters}
                        onClick={() => toggleShowSearchFilters()}
                    />
                    <ShareURLModalButton
                        key="show-url-share-modal"
                        onClick={() => setOpenShareUrlModal(true)}
                    />
                </ButtonWrapper>
                <Dialog
                    open={openShareUrlModal}
                    fullWidth
                    aria-labelledby="url-share-dialog"
                    onClose={() => {
                        setOpenShareUrlModal(false);
                    }}
                >
                    <SearchURLWidget />
                </Dialog>
                <div>
                    {offers?.map((offer, i) => (
                        <div key={offer._id}>
                            {i !== 0 && <Divider component="li" />}
                            <OfferItem
                                offer={offer}
                                offerIdx={i}
                                selectedOfferIdx={selectedOfferIdx}
                                setSelectedOfferIdx={handleOfferSelection}
                                loading={initialOffersLoading}
                            />
                        </div>
                    ))}
                </div>
                {moreOffersLoading && <LoadingOfferItem dividerOnTop />}
            </List>
        </div>
    );
};

OfferItemsContainer.propTypes = {
    initialOffersLoading: PropTypes.bool,
    moreOffersLoading: PropTypes.bool,
    selectedOfferIdx: PropTypes.number,
    setSelectedOfferIdx: PropTypes.func.isRequired,
    showSearchFilters: PropTypes.bool,
    toggleShowSearchFilters: PropTypes.func.isRequired,
    offers: PropTypes.arrayOf(PropTypes.instanceOf(Offer)),
    loadMoreOffers: PropTypes.func,
    searchQueryToken: PropTypes.string,
};


export default OfferItemsContainer;

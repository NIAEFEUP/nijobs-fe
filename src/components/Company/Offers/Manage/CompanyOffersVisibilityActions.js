import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
    IconButton,
    Tooltip,
} from "@material-ui/core";
import {
    VisibilityOff as VisibilityOffIcon,
    Visibility as VisibilityIcon,
} from "@material-ui/icons";
import {
    hideOffer as hideOfferService,
    enableOffer as enableOfferService,
} from "../../../../services/offerService";
import { getHumanError } from "../../../../utils/offer/OfferUtils";
import { useDispatch } from "react-redux";
import { addSnackbar as addSnackbarAction } from "../../../../actions/notificationActions";
import Offer from "../../../HomePage/SearchResultsArea/Offer/Offer";

const CompanyOffersVisibilityActions = ({ offer, getOfferVisibility, setOfferVisibility, offerId }) => {

    const dispatch = useDispatch();
    const addSnackbar = useCallback((notification) => dispatch(addSnackbarAction(notification)), [dispatch]);

    const offerVisible = getOfferVisibility(offerId)?.isVisible;
    const offerDisabled = getOfferVisibility(offerId)?.isDisabled;
    const offerBlocked = getOfferVisibility(offerId)?.isBlocked;

    const [loadingOfferVisibility, setLoadingOfferVisibility] = useState(false);
    const [offerVisibilityButtonDisabled, setOfferVisibilityButtonDisabled] = useState(false);

    useEffect(() => {
        setOfferVisibilityButtonDisabled(loadingOfferVisibility
            || offerDisabled
            || offerBlocked);
    }, [loadingOfferVisibility, offerBlocked, offerDisabled, offerId]);

    const handleHideOffer = useCallback(({ offer, addSnackbar, onError }) => {
        setLoadingOfferVisibility(true);
        hideOfferService(offer._id)
            .then(() => {
                setOfferVisibility(offerId, (state) => ({ ...state, isVisible: false, isHidden: true }));
                addSnackbar({
                    message: "The offer was hidden",
                    key: `${Date.now()}-${offer._id}-hidden`,
                });
            })
            .catch((err) => {
                if (onError) onError(err);
            }).finally(() => setLoadingOfferVisibility(false));
    }, [offerId, setOfferVisibility]);

    const handleEnableOffer = useCallback(({ offer, addSnackbar, onError }) => {
        setLoadingOfferVisibility(true);
        enableOfferService(offer._id)
            .then(() => {
                setOfferVisibility(offerId, (state) => ({ ...state, isVisible: true, isHidden: false }));
                addSnackbar({
                    message: "The offer was enabled",
                    key: `${Date.now()}-${offer._id}-enabled`,
                });
            })
            .catch((err) => {
                if (onError) onError(err);
            }).finally(() => setLoadingOfferVisibility(false));
    }, [offerId, setOfferVisibility]);

    const handleOfferVisibilityError = useCallback((err) => {
        if (Array.isArray(err) && err.length > 0) {
            let visibilityError;
            if (Object.prototype.hasOwnProperty.call(err[0], "msg"))
                visibilityError = getHumanError(err[0]?.msg);
            else
                visibilityError = getHumanError(err[0]);

            addSnackbar({
                message: visibilityError ? visibilityError : "Unexpected Error. Please try again later.",
                key: `${Date.now()}-${offer._id}-visibilityError`,
            });
        }
    }, [addSnackbar, offer._id]);

    const handleOfferVisibility = useCallback(() => {
        if (offerVisible) {
            handleHideOffer({
                offer: offer,
                addSnackbar: addSnackbar,
                onError: handleOfferVisibilityError,
            });
        } else {
            handleEnableOffer({
                offer: offer,
                addSnackbar: addSnackbar,
                onError: handleOfferVisibilityError,
            });
        }
    }, [offerVisible, handleHideOffer, offer, addSnackbar, handleOfferVisibilityError, handleEnableOffer]);

    return (
        <Tooltip title={offerVisible ? "Hide Offer" : "Enable Offer"}>
            <span>
                <IconButton
                    onClick={handleOfferVisibility}
                    disabled={offerVisibilityButtonDisabled}
                >
                    {offerVisible ?
                        <VisibilityOffIcon
                            data-testid="HideOffer"
                            color={offerVisibilityButtonDisabled ? undefined : "secondary"}
                            fontSize="medium"
                        />
                        :
                        <VisibilityIcon
                            data-testid="EnableOffer"
                            color={offerVisibilityButtonDisabled ? undefined : "secondary"}
                            fontSize="medium"
                        />
                    }
                </IconButton>
            </span>
        </Tooltip>
    );
};

CompanyOffersVisibilityActions.propTypes = {
    offer: PropTypes.instanceOf(Offer).isRequired,
    getOfferVisibility: PropTypes.func.isRequired,
    setOfferVisibility: PropTypes.func.isRequired,
    offerId: PropTypes.number.isRequired,
};

export default CompanyOffersVisibilityActions;

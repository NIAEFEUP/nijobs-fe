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

const CompanyOffersVisibilityActions = ({ offer, offerVisibilityState, resetOfferVisibilityState }) => {

    const dispatch = useDispatch();
    const addSnackbar = useCallback((notification) => dispatch(addSnackbarAction(notification)), [dispatch]);

    const [loadingOfferVisibility, setLoadingOfferVisibility] = useState(false);
    const [offerVisibilityButtonDisabled, setOfferVisibilityButtonDisabled] = useState(false);

    const isHiddenOffer = offer?.isHidden;
    const offerHiddenReason = offer?.hiddenReason;

    useEffect(() => {
        setOfferVisibilityButtonDisabled(loadingOfferVisibility || offerVisibilityState?.isDisabled || offerVisibilityState?.isBlocked);
    }, [isHiddenOffer, offerHiddenReason, offerVisibilityState, resetOfferVisibilityState, loadingOfferVisibility]);


    const handleHideOffer = useCallback(({ offer, addSnackbar, onError }) => {
        setLoadingOfferVisibility(true);
        hideOfferService(offer._id)
            .then(() => {
                addSnackbar({
                    message: "The offer was hidden",
                    key: `${Date.now()}-${offer._id}-hidden`,
                });
                resetOfferVisibilityState();
            })
            .catch((err) => {
                if (onError) onError(err);
            }).finally(() => setLoadingOfferVisibility(false));
    }, [resetOfferVisibilityState]);

    const handleEnableOffer = useCallback(({ offer, addSnackbar, onError }) => {
        setLoadingOfferVisibility(true);
        enableOfferService(offer._id)
            .then(() => {
                addSnackbar({
                    message: "The offer was enabled",
                    key: `${Date.now()}-${offer._id}-enabled`,
                });
                resetOfferVisibilityState();
            })
            .catch((err) => {
                if (onError) onError(err);
            }).finally(() => setLoadingOfferVisibility(false));
    }, [resetOfferVisibilityState]);

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

    const handleOfferVisibility = () => {
        if (offerVisibilityState?.isVisible) {
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
    };

    return (
        <Tooltip title={offerVisibilityState?.isVisible ? "Hide Offer" : "Enable Offer"}>
            <span>
                <IconButton
                    onClick={handleOfferVisibility}
                    disabled={offerVisibilityButtonDisabled}
                >
                    {offerVisibilityState?.isVisible ?
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
    offerVisibilityState: PropTypes.object.isRequired,
    resetOfferVisibilityState: PropTypes.func.isRequired,
};

export default CompanyOffersVisibilityActions;

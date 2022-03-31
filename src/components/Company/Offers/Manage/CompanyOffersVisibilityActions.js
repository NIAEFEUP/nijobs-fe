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

const CompanyOffersVisibilityActions = ({ offer }) => {

    const dispatch = useDispatch();
    const addSnackbar = useCallback((notification) => dispatch(addSnackbarAction(notification)), [dispatch]);

    const [offerVisibilityState, setOfferVisibilityState] = useState({
        isVisible: undefined,
        isDisabled: undefined,
        isBlocked: undefined,
    });

    const isHiddenOffer = offer?.isHidden;
    const offerHiddenReason = offer?.hiddenReason;

    useEffect(() => {
        setOfferVisibilityState({
            isDisabled: isHiddenOffer && offerHiddenReason === "ADMIN_REQUEST",
            isVisible: !isHiddenOffer,
            isBlocked: isHiddenOffer && offerHiddenReason === "COMPANY_BLOCKED",
        });
    }, [isHiddenOffer, offerHiddenReason]);

    const handleHideOffer = useCallback(({ offer, addSnackbar, onError }) => {
        hideOfferService(offer._id)
            .then(() => {
                setOfferVisibilityState((offerVisibilityState) => ({ ...offerVisibilityState, isVisible: false }));
                addSnackbar({
                    message: `The offer with the title "${offer.title}" was hidden`,
                    key: `${Date.now()}-${offer._id}-hidden`,
                });
            })
            .catch((err) => {
                if (onError) onError(err);
            });
    }, []);

    const handleEnableOffer = useCallback(({ offer, addSnackbar, onError }) => {
        enableOfferService(offer._id)
            .then(() => {
                setOfferVisibilityState((offerVisibilityState) => ({ ...offerVisibilityState, isVisible: true }));
                addSnackbar({
                    message: `The offer with the title "${offer.title}" was enabled`,
                    key: `${Date.now()}-${offer._id}-enabled`,
                });
            })
            .catch((err) => {
                if (onError) onError(err);
            });
    }, []);

    const handleOfferVisibilityError = useCallback((err) => {
        if (Array.isArray(err) && err.length > 0) {
            let visibilityError = null;
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

    const handleOfferVisibility = async () => {
        if (offerVisibilityState.isVisible) {
            await handleHideOffer({
                offer: offer,
                addSnackbar: addSnackbar,
                onError: handleOfferVisibilityError,
            });
        } else  {
            await handleEnableOffer({
                offer: offer,
                addSnackbar: addSnackbar,
                onError: handleOfferVisibilityError,
            });
        }
    };

    return (
        <Tooltip title={ offerVisibilityState.isVisible ? "Hide Offer" : "Enable Offer"}>
            <IconButton
                onClick={handleOfferVisibility}
                disabled={offerVisibilityState.isDisabled}
            >
                {offerVisibilityState.isVisible ? <VisibilityOffIcon color="secondary" fontSize="medium" />
                    : <VisibilityIcon color="secondary" fontSize="medium" />}
            </IconButton>
        </Tooltip>
    );
};

CompanyOffersVisibilityActions.propTypes = {
    offer: PropTypes.instanceOf(Offer),
};

export default CompanyOffersVisibilityActions;

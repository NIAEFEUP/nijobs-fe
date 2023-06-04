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

const CompanyOffersVisibilityActions = ({ offer, offersVisibility, setOfferVisibility, offerId }) => {

    const dispatch = useDispatch();
    const addSnackbar = useCallback((notification) => dispatch(addSnackbarAction(notification)), [dispatch]);

    const [loadingOfferVisibility, setLoadingOfferVisibility] = useState(false);
    const [offerVisibilityButtonDisabled, setOfferVisibilityButtonDisabled] = useState(false);

    useEffect(() => {
        setOfferVisibilityButtonDisabled(loadingOfferVisibility
            || offersVisibility[offerId]?.isDisabled
            || offersVisibility[offerId]?.isBlocked);
    }, [offersVisibility, loadingOfferVisibility, offerId]);

    const handleHideOffer = useCallback(({ offer, addSnackbar, onError }) => {
        setLoadingOfferVisibility(true);
        hideOfferService(offer._id)
            .then(() => {
                addSnackbar({
                    message: "The offer was hidden",
                    key: `${Date.now()}-${offer._id}-hidden`,
                });
                setOfferVisibility(offerId, { ...offersVisibility[offerId], isVisible: false, isHidden: true });
            })
            .catch((err) => {
                if (onError) onError(err);
            }).finally(() => setLoadingOfferVisibility(false));
    }, [offerId, offersVisibility, setOfferVisibility]);

    const handleEnableOffer = useCallback(({ offer, addSnackbar, onError }) => {
        setLoadingOfferVisibility(true);
        enableOfferService(offer._id)
            .then(() => {
                addSnackbar({
                    message: "The offer was enabled",
                    key: `${Date.now()}-${offer._id}-enabled`,
                });
                setOfferVisibility(offerId, { ...offersVisibility[offerId], isVisible: true, isHidden: false });
            })
            .catch((err) => {
                if (onError) onError(err);
            }).finally(() => setLoadingOfferVisibility(false));
    }, [offerId, offersVisibility, setOfferVisibility]);

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
        if (offersVisibility[offerId]?.isVisible) {
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
    }, [offer, offerId, offersVisibility, handleHideOffer, handleEnableOffer, addSnackbar, handleOfferVisibilityError]);

    return (
        <Tooltip title={offersVisibility[offerId]?.isVisible ? "Hide Offer" : "Enable Offer"}>
            <span>
                <IconButton
                    onClick={handleOfferVisibility}
                    disabled={offerVisibilityButtonDisabled}
                >
                    {offersVisibility[offerId]?.isVisible ?
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
    offersVisibility: PropTypes.array.isRequired,
    setOfferVisibility: PropTypes.func.isRequired,
    offerId: PropTypes.number.isRequired,
};

export default CompanyOffersVisibilityActions;

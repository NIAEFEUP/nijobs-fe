import React, { useContext, useCallback } from "react";
import { useParams, Redirect } from "react-router-dom";

import OfferWidget from "../components/HomePage/SearchResultsArea/Offer/OfferWidget";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import { CardContent } from "@material-ui/core";

import {
    disableOffer as disableOfferService,
    hideOffer as hideOfferService,
    enableOffer as enableOfferService,
} from "../services/offerService";
import useOffer from "../hooks/useOffer";
import { OfferConstants } from "../components/Offers/Form/OfferUtils";

export const OfferPageControllerContext = React.createContext();

export const OfferPageController = () => {
    const { id } = useParams();
    const { offer, error, loading, mutate } = useOffer(id);
    const redirectProps = { to: { pathname: "/not-found" } };

    const handleDisableOffer = useCallback(({ offer, adminReason, onSuccess, onError }) => {
        disableOfferService(offer._id, adminReason)
            .then(() => {
                mutate(new Offer({
                    ...offer,
                    hiddenReason: OfferConstants.ADMIN_REQUEST,
                    isHidden: true,
                    adminReason,
                }));
                if (onSuccess) onSuccess();
            })
            .catch((err) => {
                if (onError) onError(err);
            });
    }, [mutate]);

    const handleHideOffer = useCallback(({ offer, addSnackbar, onError, setLoadingOfferVisibility = (_state) => { } }) => {
        setLoadingOfferVisibility(true);
        hideOfferService(offer._id)
            .then(() => {
                mutate(new Offer({
                    ...offer,
                    hiddenReason: OfferConstants.COMPANY_REQUEST,
                    isHidden: true,
                }));
                addSnackbar({
                    message: "The offer was hidden",
                    key: `${Date.now()}-hidden`,
                });
            })
            .catch((err) => {
                if (onError) onError(err);
            })
            .finally(() => setLoadingOfferVisibility(false));
    }, [mutate]);

    const handleCompanyEnableOffer = useCallback(({ offer, addSnackbar, onError, setLoadingOfferVisibility = (_state) => { } }) => {
        setLoadingOfferVisibility(true);
        enableOfferService(offer._id)
            .then(() => {
                mutate(new Offer({
                    ...offer,
                    isHidden: false,
                }));
                addSnackbar({
                    message: "The offer was enabled",
                    key: `${Date.now()}-enabled`,
                });
            })
            .catch((err) => {
                if (onError) onError(err);
            })
            .finally(() => setLoadingOfferVisibility(false));
    }, [mutate]);

    const handleAdminEnableOffer = useCallback(({ offer, addSnackbar, onError }) => {
        enableOfferService(offer._id)
            .then(() => {
                mutate(new Offer({
                    ...offer,
                    isHidden: false,
                    hiddenReason: null,
                    adminReason: null,
                }));
                addSnackbar({
                    message: "The offer was enabled",
                    key: `${Date.now()}-enabled`,
                });
            })
            .catch((err) => {
                if (onError) onError(err);
            });
    }, [mutate]);

    return {
        controllerOptions: {
            initialValue: {
                offer,
                handleDisableOffer,
                handleHideOffer,
                handleCompanyEnableOffer,
                handleAdminEnableOffer,
                loading,
                error,
                redirectProps,
            },
        },
    };
};

const OfferPage = () => {

    const {
        offer,
        handleDisableOffer,
        handleHideOffer,
        handleCompanyEnableOffer,
        handleAdminEnableOffer,
        loading,
        error,
        redirectProps,
    } = useContext(OfferPageControllerContext);

    if (!error) {
        return (
            <CardContent>
                <OfferWidget
                    offer={offer}
                    handleDisableOffer={handleDisableOffer}
                    handleHideOffer={handleHideOffer}
                    handleCompanyEnableOffer={handleCompanyEnableOffer}
                    handleAdminEnableOffer={handleAdminEnableOffer}
                    isPage
                    loading={loading}
                />
            </CardContent>
        );
    }
    return (
        <Redirect {...redirectProps} />
    );
};

export default OfferPage;

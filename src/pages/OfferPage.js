import React, { useEffect, useContext, useState, useCallback } from "react";
import { useParams, Redirect } from "react-router-dom";

import OfferWidget from "../components/HomePage/SearchResultsArea/Offer/OfferWidget";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import { getOffer } from "../services/getOfferService";
import { CardContent } from "@material-ui/core";

import {
    disableOffer as disableOfferService,
    hideOffer as hideOfferService,
    enableOffer as enableOfferService,
} from "../services/offerVisibilityService";

export const OfferPageControllerContext = React.createContext();

export const OfferPageController = () => {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOffer(id)
            .then((offer) => {
                setOffer(new Offer(offer));
                setLoading(false);
            })
            .catch(() => {
                setError("Unexpected Error. Could not fetch requested offer.");
            });
        return () => {
        };
    }, [id]);

    const redirectProps = { to: { pathname: "/not-found" } };

    const handleDisableOffer = useCallback(async ({
        offer,
        adminReason,
        setOpen,
        setVisibilityState,
        visibilityState,
        addSnackbar,
        onError,
    }) => {
        await disableOfferService(offer.id, adminReason).then(() => {
            setOpen(false);
            setOffer((offer) => (
                new Offer({
                    ...offer,
                    _id: offer.id,
                    hiddenReason: "ADMIN_REQUEST",
                    isHidden: true,
                    adminReason: adminReason,
                })
            ));
            setVisibilityState({ ...visibilityState, isVisible: false, isDisabled: true });
            addSnackbar({
                message: "The offer was disabled",
                key: `${Date.now()}-disabled`,
            });
        }).catch((err) => {
            onError(err);
        });
    }, []);

    const handleHideOffer = useCallback(async ({
        offer,
        setVisibilityState,
        visibilityState,
        addSnackbar,
        onError,
    }) => {
        await hideOfferService(offer.id).then(() => {
            setOffer((offer) => (
                new Offer({
                    ...offer,
                    _id: offer.id,
                    hiddenReason: "COMPANY_REQUEST",
                    isHidden: true,
                })
            ));
            setVisibilityState({ ...visibilityState, isVisible: false });
            addSnackbar({
                message: "The offer was hidden",
                key: `${Date.now()}-hidden`,
            });
        }).catch((err) => {
            onError(err);
        });
    }, []);

    const handleCompanyEnableOffer = useCallback(async ({
        offer,
        setVisibilityState,
        visibilityState,
        addSnackbar,
        onError,
    }) => {
        await enableOfferService(offer.id).then(() => {
            setOffer((offer) => (
                new Offer({
                    ...offer,
                    _id: offer.id,
                    isHidden: false,
                })
            ));
            setVisibilityState({ ...visibilityState, isVisible: true });
            addSnackbar({
                message: "The offer was enabled",
                key: `${Date.now()}-enabled`,
            });
        }).catch((err) => {
            onError(err);
        });
    }, []);

    const handleAdminEnableOffer = useCallback(async ({
        offer,
        setVisibilityState,
        visibilityState,
        addSnackbar,
        onError,
    }) => {
        await enableOfferService(offer.id).then(() => {
            setOffer((offer) => (
                new Offer({
                    ...offer,
                    _id: offer.id,
                    isHidden: false,
                    hiddenReason: null,
                    adminReason: null,
                })
            ));
            setVisibilityState({ ...visibilityState, isVisible: true, isDisabled: false });
            addSnackbar({
                message: "The offer was enabled",
                key: `${Date.now()}-enabled`,
            });
        }).catch((err) => {
            onError(err);
        });
    }, []);

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

    if (error === null) {
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

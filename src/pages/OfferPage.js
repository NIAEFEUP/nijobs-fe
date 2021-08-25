import React, { useEffect, useContext, useState, useCallback } from "react";
import { useParams, Redirect } from "react-router-dom";

import OfferWidget from "../components/HomePage/SearchResultsArea/Offer/OfferWidget";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";
import { CardContent } from "@material-ui/core";

import {
    disableOffer as disableOfferService,
    hideOffer as hideOfferService,
    enableOffer as enableOfferService,
} from "../services/offerVisibilityService";
import useOffer from "../hooks/useOffer";

export const OfferPageControllerContext = React.createContext();

export const OfferPageController = () => {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const { offerData, error, mutate } = useOffer(id);
    const redirectProps = { to: { pathname: "/not-found" } };

    useEffect(() => {
        if (offerData) {
            setOffer(new Offer(offerData));
            setLoading(false);
        }
    }, [offerData]);

    const handleDisableOffer = useCallback(async ({
        offer,
        adminReason,
        setOpen,
        addSnackbar,
        onError,
    }) => {
        await disableOfferService(offer.id, adminReason).then(() => {
            setOpen(false);
            mutate({
                ...offerData,
                _id: offer.id,
                hiddenReason: "ADMIN_REQUEST",
                isHidden: true,
                adminReason: adminReason,
            });
            addSnackbar({
                message: "The offer was disabled",
                key: `${Date.now()}-disabled`,
            });
        }).catch((err) => {
            onError(err);
        });
    }, [mutate, offerData]);

    const handleHideOffer = useCallback(async ({
        offer,
        addSnackbar,
        onError,
    }) => {
        await hideOfferService(offer.id).then(() => {
            mutate({
                ...offerData,
                _id: offer.id,
                hiddenReason: "COMPANY_REQUEST",
                isHidden: true,
            });
            addSnackbar({
                message: "The offer was hidden",
                key: `${Date.now()}-hidden`,
            });
        }).catch((err) => {
            onError(err);
        });
    }, [mutate, offerData]);

    const handleCompanyEnableOffer = useCallback(async ({
        offer,
        addSnackbar,
        onError,
    }) => {
        await enableOfferService(offer.id).then(() => {
            mutate({
                ...offerData,
                _id: offer.id,
                isHidden: false,
            });
            addSnackbar({
                message: "The offer was enabled",
                key: `${Date.now()}-enabled`,
            });
        }).catch((err) => {
            onError(err);
        });
    }, [mutate, offerData]);

    const handleAdminEnableOffer = useCallback(async ({
        offer,
        addSnackbar,
        onError,
    }) => {
        await enableOfferService(offer.id).then(() => {
            mutate({
                ...offerData,
                _id: offer.id,
                isHidden: false,
                hiddenReason: null,
                adminReason: null,
            });
            addSnackbar({
                message: "The offer was enabled",
                key: `${Date.now()}-enabled`,
            });
        }).catch((err) => {
            onError(err);
        });
    }, [mutate, offerData]);

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

import React, { useCallback, useMemo, useState } from "react";

import { Grid, Tooltip, Divider, Button } from "@material-ui/core";
import { Visibility, VisibilityOff, Block, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import OfferApplyButton from "./OfferApplyButton";
import useToggle from "../../../../hooks/useToggle";
import { recordApplyURLVisit } from "../../../../utils/analytics";

const OfferInteractionOptions = ({
    loading,
    sessionData,
    classes,
    visibilityState,
    addSnackbar,
    setShowAdminReasonModal,
    onError,
    isMobile,
    offer,
    handleHideOffer,
    handleCompanyEnableOffer,
    handleAdminEnableOffer,
}) => {

    const [loadingOfferVisibility, setLoadingOfferVisibility] = useState(false);
    const [showRedirectDialog, toggleRedirectDialog, setClosedRedirectDialog] = useToggle(false);

    const handleOfferVisibility = async () => {

        const handler = visibilityState.isVisible ? handleHideOffer : handleCompanyEnableOffer;

        await handler({
            offer,
            addSnackbar,
            onError,
            setLoadingOfferVisibility,
        });
    };

    const handleEnableDisableOffer = async () => {
        if (!visibilityState.isDisabled) {
            setShowAdminReasonModal(true);
        } else {
            await handleAdminEnableOffer({
                offer: offer,
                addSnackbar: addSnackbar,
                onError: onError,
            });
        }
    };

    const handleApplyURLRedirect = useCallback(() => {
        if (!offer) return;
        setClosedRedirectDialog();
        window.open(offer.applyURL, "_blank", "noopener");
        recordApplyURLVisit(offer._id, offer.title, offer.ownerName);
    }, [offer, setClosedRedirectDialog]);

    const canChangeOfferVisibility = useMemo(() => (
        visibilityState.isVisible ||
        !visibilityState.isDisabled ||
        sessionData?.company?._id === offer?.owner) &&
        (sessionData?.company?._id === offer?.owner ||
            sessionData?.isAdmin
        ), [offer, sessionData, visibilityState.isDisabled, visibilityState.isVisible]);

    if (!loading)
        return (
            <Grid item xs={12} md={3} className={classes.offerOptions}>
                {
                    !isMobile &&
                    <Divider
                        orientation="vertical"
                        variant="middle"
                        className={classes.verticalDivider}
                    />}
                <div className={classes.offerOptionsButtons}>
                    {
                        offer?.applyURL &&
                        <div className={classes.offerApplyButton}>
                            <OfferApplyButton
                                open={showRedirectDialog}
                                handleAccept={handleApplyURLRedirect}
                                handleToggle={toggleRedirectDialog}
                                applyURL={offer.applyURL}
                                title="You're being redirected to the following website:"
                            />
                        </div>
                    }
                    {
                        (sessionData?.company?._id === offer.owner || sessionData?.isAdmin) &&
                        <Tooltip title={"Edit Offer"}>
                            <Button
                                disabled={visibilityState.isDisabled}
                                className={classes.visibilityButton}
                                component={Link}
                                to={`/offer/${offer._id}/edit`}
                                startIcon={(<Edit />)}
                            >
                                Edit Offer
                            </Button>
                        </Tooltip>
                    }
                    {
                        canChangeOfferVisibility &&
                        <Tooltip title={visibilityState.isVisible ? "Hide Offer" : "Enable Offer"}>
                            <span>
                                <Button
                                    onClick={handleOfferVisibility}
                                    className={classes.visibilityButton}
                                    role="hideEnableOfferButton"
                                    disabled={loadingOfferVisibility || visibilityState.isDisabled}
                                    startIcon={visibilityState.isVisible ? <VisibilityOff /> : <Visibility />}
                                >
                                    {visibilityState.isVisible ? "Hide Offer" : "Enable Offer"}
                                </Button>
                            </span>
                        </Tooltip>
                    }
                    {
                        (sessionData?.isAdmin) &&
                        <Tooltip title={(!visibilityState.isDisabled) ? "Disable Offer" : "Enable Offer"}>
                            <Button
                                onClick={handleEnableDisableOffer}
                                className={classes.visibilityButton}
                                role="disableEnableOfferButton"
                                startIcon={(!visibilityState.isDisabled) ? <Block /> : <Visibility />}
                            >
                                {(!visibilityState.isDisabled) ? "Disable Offer" : "Enable Offer"}
                            </Button>
                        </Tooltip>
                    }
                </div>
            </Grid>
        );
    else
        return null;
};

export default OfferInteractionOptions;

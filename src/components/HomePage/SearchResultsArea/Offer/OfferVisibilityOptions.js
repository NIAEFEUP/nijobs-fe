import React from "react";

import { Grid, Tooltip, Divider, Button } from "@material-ui/core";
import { Visibility, VisibilityOff, Block } from "@material-ui/icons";

import { enableOffer, hideOffer } from "../../../../services/offerVisibilityService";

const OfferVisibilityOptions = ({
    loading, sessionData, classes, visibilityState,
    setVisibilityState, addSnackbar, setShowAdminReasonModal,
    dealWithPromiseError, isMobile, offer }) => {

    const handleOfferVisibility = () => {
        if (visibilityState.isVisible) {
            hideOffer(offer.id).then(() => {
                offer.isHidden = true;
                setVisibilityState({ ...visibilityState, isVisible: false });
                addSnackbar({
                    message: "The offer was hidden",
                    key: "hidden",
                });
            }).catch((err) => {
                dealWithPromiseError(err);
            });
        } else  {
            enableOffer(offer.id).then(() => {
                offer.isHidden = false;
                setVisibilityState({ ...visibilityState, isVisible: true });
                addSnackbar({
                    message: "The offer was enabled",
                    key: "enabled",
                });
            }).catch((err) => {
                dealWithPromiseError(err);
            });
        }
    };

    const handleEnableDisableOffer = () => {
        if (!visibilityState.isDisabled) {
            setShowAdminReasonModal(true);
        } else {
            enableOffer(offer.id).then(() => {
                offer.adminReason = null;
                offer.hiddenReason = null;
                offer.isHidden = false;
                setVisibilityState({ ...visibilityState, isDisabled: false });
                addSnackbar({
                    message: "The offer was enabled",
                    key: "enabled",
                });
            }).catch((err) => {
                dealWithPromiseError(err);
            });
        }
    };

    if (!loading && (sessionData?.isAdmin || sessionData?.company?._id === offer.owner))
        return (
            <Grid item xs={12} md={3} className={classes.offerOptions}>
                {
                    !isMobile &&
                    <Divider
                        orientation="vertical"
                        variant="middle"
                        className={classes.verticalDivider}
                    /> }
                <div className={classes.offerOptionsButtons}>
                    {
                        (
                            visibilityState.isVisible ||
                        !visibilityState.isDisabled ||
                        sessionData?.company?._id === offer.owner
                        ) &&
                        <Tooltip title={ visibilityState.isVisible ? "Hide Offer" : "Enable Offer"}>
                            <Button
                                onClick={handleOfferVisibility}
                                className={classes.visibilityButton}
                                role="hideEnableOfferButton"
                                disabled={visibilityState.isDisabled}
                                startIcon={visibilityState.isVisible ? <VisibilityOff /> : <Visibility />}
                            >
                                { visibilityState.isVisible ? "Hide Offer" : "Enable Offer" }
                            </Button>
                        </Tooltip>
                    }
                    {
                        (sessionData?.isAdmin) &&
                        <Tooltip title={ (!visibilityState.isDisabled) ? "Disable Offer" : "Enable Offer"}>
                            <Button
                                onClick={handleEnableDisableOffer}
                                className={classes.visibilityButton}
                                role="disableEnableOfferButton"
                                startIcon={(!visibilityState.isDisabled) ? <Block /> : <Visibility />}
                            >
                                { (!visibilityState.isDisabled) ? "Disable Offer" : "Enable Offer" }
                            </Button>
                        </Tooltip>
                    }
                </div>
            </Grid>
        );
    else
        return null;
};

export default OfferVisibilityOptions;

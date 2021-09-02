import React from "react";

import { Grid, Tooltip, Divider, Button } from "@material-ui/core";
import { Visibility, VisibilityOff, Block } from "@material-ui/icons";

const OfferVisibilityOptions = ({
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

    const handleOfferVisibility = async () => {
        if (visibilityState.isVisible) {
            await handleHideOffer({
                offer: offer,
                addSnackbar: addSnackbar,
                onError: onError,
            });
        } else  {
            await handleCompanyEnableOffer({
                offer: offer,
                addSnackbar: addSnackbar,
                onError: onError,
            });
        }
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

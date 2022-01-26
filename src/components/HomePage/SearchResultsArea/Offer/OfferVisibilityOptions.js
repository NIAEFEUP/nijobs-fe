import React from "react";

import { Grid, Tooltip, Divider, Button } from "@material-ui/core";
import { Visibility, VisibilityOff, Block, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";

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
    console.log(offer);
    console.log(`offer/${offer?.id}/edit`);

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
                        (sessionData?.company?._id === offer.owner || sessionData?.isAdmin) &&
                        <Tooltip title={"Edit Offer"}>
                            <Link to={`/offer/${offer._id}/edit`}>
                                <Button
                                    className={classes.visibilityButton}
                                    startIcon={(<Edit />)}
                                >
                                    { "Edit Offer" }
                                </Button>
                            </Link>
                        </Tooltip>
                    }
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

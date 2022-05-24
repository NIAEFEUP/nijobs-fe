import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import { Typography } from "@material-ui/core";
import { connect } from "react-redux";

import { recordOfferVisit } from "../../../../utils/analytics";
import Constants from "../../../../utils/Constants";

import Offer from "./Offer";
import UnselectedOffer from "./UnselectedOffer";
import AdminReasonModal from "./AdminReasonModal";
import OfferDetails from "./OfferDetails";
import { getHumanError } from "../../../../utils/offer/OfferUtils";
import { addSnackbar } from "../../../../actions/notificationActions";
import useSearchResultsWidgetStyles from "../SearchResultsWidget/searchResultsWidgetStyles";
import { useDesktop } from "../../../../utils/media-queries";
import OfferContent from "./OfferContent";
import { OfferConstants } from "../../../Offers/Form/OfferUtils";
import OfferApplyButton from "./OfferApplyButton";

const OfferWidget = ({
    addSnackbar,
    offer,
    handleDisableOffer,
    handleHideOffer,
    handleCompanyEnableOffer,
    handleAdminEnableOffer,
    loading,
    isPage,
}) => {

    const isMobile = !useDesktop();
    const classes = useSearchResultsWidgetStyles({ isMobile, isPage, loading, hasApplyButton: true });

    const [visibilityState, setVisibilityState] = useState({
        isVisible: undefined,
        isDisabled: undefined,
        isBlocked: undefined,
    });

    const isHiddenOffer = offer?.isHidden;
    const offerHiddenReason = offer?.hiddenReason;

    useEffect(() => {
        setVisibilityState({
            isDisabled: isHiddenOffer && offerHiddenReason === OfferConstants.ADMIN_REQUEST,
            isVisible: !isHiddenOffer,
            isBlocked: isHiddenOffer && offerHiddenReason === OfferConstants.COMPANY_BLOCKED,
        });
    }, [isHiddenOffer, offerHiddenReason]);

    useEffect(() => {
        if (offer) {
            recordOfferVisit(offer._id, offer.title, offer.ownerName);
        }
    }, [offer]);

    const [showAdminReasonModal, setShowAdminReasonModal] = useState(false);

    const handleError = useCallback((err) => {
        if (Array.isArray(err) && err.length > 0) {
            let visibilityError;
            if (Object.prototype.hasOwnProperty.call(err[0], "msg"))
                visibilityError = getHumanError(err[0]?.msg);
            else
                visibilityError = getHumanError(err[0]);

            addSnackbar({
                message: visibilityError || Constants.UNEXPECTED_ERROR_MESSAGE,
                key: `${Date.now()}-visibilityError`,
            });
        }
    }, [addSnackbar]);

    if (loading && !isPage) {
        return <UnselectedOffer classes={classes} />;
    } else {
        // TODO Only put icon when applyURL exists
        return (
            <div className={classes.offerWidget} data-testid="offer-content">
                <AdminReasonModal
                    open={showAdminReasonModal}
                    setOpen={setShowAdminReasonModal}
                    offer={offer}
                    handleDisableOffer={handleDisableOffer}
                    onError={handleError}
                />
                {(offer === null && !isPage) ?
                    <div className={classes.unselectedOffer} id="no_selected_offer_text">
                        <Typography variant="h5" classes={{ root: classes.pleaseSelectOfferText }}>
                            Please select an offer to view the details
                        </Typography>
                    </div>
                    :
                    <div className={!isPage && classes.offerContainer}>
                        <OfferDetails
                            offer={offer}
                            handleHideOffer={handleHideOffer}
                            handleCompanyEnableOffer={handleCompanyEnableOffer}
                            handleAdminEnableOffer={handleAdminEnableOffer}
                            loading={loading}
                            isPage={isPage}
                            addSnackbar={addSnackbar}
                            visibilityState={visibilityState}
                            isMobile={isMobile}
                            setShowAdminReasonModal={setShowAdminReasonModal}
                            handleError={handleError}
                        />
                        <OfferContent
                            classes={classes}
                            offer={offer}
                            loading={loading}
                        />
                        <div className={classes.offerApplyButton}>
                            <OfferApplyButton />
                        </div>
                    </div>
                }
            </div>
        );
    }
};

OfferWidget.propTypes = {
    addSnackbar: PropTypes.func,
    offer: PropTypes.instanceOf(Offer),
    handleDisableOffer: PropTypes.func,
    handleHideOffer: PropTypes.func,
    handleCompanyEnableOffer: PropTypes.func,
    handleAdminEnableOffer: PropTypes.func,
    loading: PropTypes.bool,
    isPage: PropTypes.bool,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferWidget);

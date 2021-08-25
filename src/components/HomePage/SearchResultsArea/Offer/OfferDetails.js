import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { Avatar, Typography, Link, Grid, Tooltip, Divider } from "@material-ui/core";
import {
    DateRange, LocationOn, Work, Schedule, MonetizationOn, MoneyOff,
    FindInPage, Info,
} from "@material-ui/icons";
import { format, parseISO, formatDistanceToNowStrict } from "date-fns";

import { Skeleton } from "@material-ui/lab";

import Offer from "./Offer";
import OfferVisibilityOptions from "./OfferVisibilityOptions";
import ChipList from "./ChipList";
import OfferContentListItem from "./OfferContentListItem";
import JOB_OPTIONS from "../../SearchArea/AdvancedSearch/JobOptions";
import useSession from "../../../../hooks/useSession";
import useSearchResultsWidgetStyles from "../SearchResultsWidget/searchResultsWidgetStyles";

const defaultLogo = require("./default_icon.svg");

const OfferDetails = ({
    offer,
    handleHideOffer,
    handleCompanyEnableOffer,
    handleAdminEnableOffer,
    loading,
    isPage,
    addSnackbar,
    visibilityState,
    isMobile,
    setShowAdminReasonModal,
    handleError,
}) => {

    const { data, isValidating, error, isLoggedIn } = useSession();
    const sessionData = (!isValidating && !error && isLoggedIn) ? data : null;
    const classes = useSearchResultsWidgetStyles({ isMobile, isPage, loading });

    const getDisabledOfferMessage = useCallback(() => (
        (sessionData?.isAdmin) ?
            `Offer disabled by an admin. Reason: ${offer.adminReason}`
            :
            "This offer was hidden by an admin so it won't show up in search results. "
            + "Please contact support for more information."
    ), [offer, sessionData]);

    const getHiddenOfferMessage = useCallback(() => {
        if (visibilityState.isDisabled)
            return getDisabledOfferMessage();
        else {
            return visibilityState.isBlocked ?
                "This offer is hidden due to the company being blocked."
                : "This offer is hidden so it won't show up in search results";
        }
    }, [getDisabledOfferMessage, visibilityState.isBlocked, visibilityState.isDisabled]);

    return (
        <div className={classes.offerDetails}>
            <Grid
                container
                alignItems="center"
                className={classes.offerHeader}
            >
                <Grid item xs={12} md={9}>
                    <Typography variant="h4" gutterBottom className={classes.offerTitle}>
                        {
                        // eslint-disable-next-line no-nested-ternary
                            loading ? <Skeleton /> :
                                isPage ?
                                    offer.title
                                    :
                                    <Link href={`/offer/${offer.id}`} className={classes.offerTitleLink}>
                                        {offer.title}
                                    </Link>
                        }
                    </Typography>
                    <span className={classes.companyInfo}>
                        {
                            loading ?
                                <>
                                    <Skeleton variant="circle">
                                        <Avatar />
                                    </Skeleton>
                                    <Skeleton variant="text" height={30} className={classes.ownerNameSkeleton} />
                                </>
                                :
                                <>
                                    <Avatar
                                        alt="company_logo"
                                        color="blue"
                                        src={offer.ownerLogo || defaultLogo}
                                        className={classes.companyLogoInOffer}
                                    />
                                    <Typography variant="h6" color="primary">
                                        {offer.ownerName}
                                    </Typography>
                                </>
                        }
                    </span>
                </Grid>
                <OfferVisibilityOptions
                    loading={loading}
                    sessionData={sessionData}
                    classes={classes}
                    visibilityState={visibilityState}
                    addSnackbar={addSnackbar}
                    setShowAdminReasonModal={setShowAdminReasonModal}
                    onError={handleError}
                    isMobile={isMobile}
                    offer={offer}
                    handleHideOffer={handleHideOffer}
                    handleCompanyEnableOffer={handleCompanyEnableOffer}
                    handleAdminEnableOffer={handleAdminEnableOffer}
                />
            </Grid>
            <Typography variant="subtitle1" className={classes.hiddenOfferInfo}>
                {
                    !loading && (!visibilityState.isVisible) &&
                    <span>
                        <Info className={classes.iconStyle} />
                        <span>
                            {getHiddenOfferMessage()}
                        </span>
                    </span>

                }
            </Typography>
            <Divider className={classes.offerDivider} />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Tooltip title="Location" placement="left" disableHoverListener={loading}>
                        <Typography variant="body1" display="inline" color="secondary">
                            {
                                loading ?
                                    <Skeleton height={35} />
                                    :
                                    <>
                                        <LocationOn className={classes.iconStyle} />
                                        {offer.location}
                                    </>
                            }
                        </Typography>
                    </Tooltip>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Tooltip title="Job Type" placement="left" disableHoverListener={loading}>
                        <Typography variant="body1" display="inline" color="secondary">
                            {
                                loading ?
                                    <Skeleton height={35} />
                                    :
                                    <>
                                        <Work className={classes.iconStyle} />
                                        {JOB_OPTIONS.filter((x) => x.value === offer.jobType)[0]?.label}
                                    </>
                            }
                        </Typography>
                    </Tooltip>
                </Grid>
                {!loading && (offer.jobMinDuration || offer.jobStartDate) &&
                <Grid item xs={12} md={6}>
                    <Tooltip title="Start Date • Duration" placement="left">
                        <span>
                            <Typography display="inline" variant="body1" color="secondary">
                                <DateRange className={classes.iconStyle} />
                            </Typography>
                            {
                                offer.jobStartDate &&
                                <Typography display="inline" variant="body1" color="secondary">
                                    {format(parseISO(offer.jobStartDate), "dd-MM-yyyy")}
                                </Typography>
                            }
                            {
                                offer.jobMinDuration &&
                                <>
                                    <Typography display="inline" variant="body1" color="secondary">
                                        {offer.jobStartDate && " • "}
                                        {offer.jobMinDuration}
                                    </Typography>
                                    <Typography display="inline" variant="body1" color="secondary">
                                        {offer.jobMaxDuration ? `-${offer.jobMaxDuration}` : "+"}
                                        {offer.jobMinDuration && " months"}
                                    </Typography>
                                </>
                            }
                        </span>
                    </Tooltip>
                </Grid>
                }
                <Grid item xs={12} md={6}>
                    <Tooltip title="Publish Date" placement="left" disableHoverListener={loading}>
                        <Typography display="inline" variant="body1" color="secondary">
                            {loading ?
                                <Skeleton height={35} />
                                :
                                <>
                                    <Schedule className={classes.iconStyle} />
                                    {formatDistanceToNowStrict(parseISO(offer.publishDate), { addSuffix: true })}
                                    {
                                        offer.publishEndDate &&
                                    (sessionData?.isAdmin || sessionData?.company?._id === offer.owner) &&
                                    ` • until ${format(parseISO(offer.publishEndDate), "dd-MM-yyyy")}`
                                    }
                                </>
                            }
                        </Typography>
                    </Tooltip>
                </Grid>
                {
                    !loading && offer.vacancies &&
                    <Grid item xs={12} md={6}>
                        <Tooltip title="Vacancies" placement="left">
                            <Typography display="inline" variant="body1" color="secondary">
                                <FindInPage className={classes.iconStyle} />
                                {`${offer.vacancies} ${offer.vacancies === 1 ? "vacancy" : "vacancies"}`}
                            </Typography>
                        </Tooltip>
                    </Grid>
                }
                {
                    !loading && (offer.isPaid !== null && offer.isPaid !== undefined) &&
                    (
                        <Grid item xs={12} md={6}>
                            <Tooltip title={offer.isPaid ? "Paid" : "Unpaid"} placement="left">
                                <Typography display="inline" variant="body1" color="secondary">
                                    {offer.isPaid ?
                                        <MonetizationOn className={classes.iconStyle} />
                                        :
                                        <MoneyOff className={classes.iconStyle} />
                                    }
                                    {offer.isPaid ? "Paid" : "Unpaid"}
                                </Typography>
                            </Tooltip>
                        </Grid>
                    )
                }
                <Grid item xs={12}>
                    <ChipList
                        type="Technologies"
                        values={offer?.technologies}
                        loading={loading}
                    />
                    <ChipList
                        type="Fields"
                        values={offer?.fields}
                        loading={loading}
                    />
                </Grid>
            </Grid>
            <OfferContentListItem
                title="Contacts"
                items={offer?.contacts}
                loading={loading}
            />
        </div>
    );
};

OfferDetails.propTypes = {
    offer: PropTypes.instanceOf(Offer),
    handleHideOffer: PropTypes.func,
    handleCompanyEnableOffer: PropTypes.func,
    handleAdminEnableOffer: PropTypes.func,
    loading: PropTypes.bool,
    isPage: PropTypes.bool,
    addSnackbar: PropTypes.func.isRequired,
    visibilityState: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    setShowAdminReasonModal: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
};

export default OfferDetails;

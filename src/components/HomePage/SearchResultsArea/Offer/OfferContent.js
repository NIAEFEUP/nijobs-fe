import React, { useState } from "react";
import PropTypes from "prop-types";

import { Avatar, Typography, Link, Grid, Tooltip, Divider } from "@material-ui/core";
import Offer from "./Offer";
import OfferContentListItem from "./OfferContentListItem";

import LoadingMagnifyGlass from "./loading_magnify_glass_svg";
import { useDesktop } from "../../../../utils/media-queries";
import useSession from "../../../../hooks/useSession";

import useSearchResultsWidgetStyles from "../SearchResultsWidget/searchResultsWidgetStyles";
import LOADING_MESSAGES from "./offerLoadingMessages";
import {
    DateRange, LocationOn, Work, Schedule, MonetizationOn, MoneyOff,
    FindInPage, Info,
} from "@material-ui/icons";
import { format, parseISO, formatDistanceToNowStrict } from "date-fns";
import ChipList from "./ChipList";
import AdminReasonModal from "./AdminReasonModal";

import JOB_OPTIONS from "../../SearchArea/AdvancedSearch/JobOptions";

import { addSnackbar } from "../../../../actions/notificationActions";

import { connect } from "react-redux";
import { getHumanError } from "../../../../utils/offer/OfferUtils";
import { Skeleton } from "@material-ui/lab";
import OfferDescription from "./OfferDescription";
import OfferVisibilityOptions from "./OfferVisibilityOptions";

const getRandomOngoingSearchMessage = () => LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

const defaultLogo = require("./default_icon.svg");

const OfferContent = ({ addSnackbar, offer, loading, isPage }) => {

    const { data, isValidating, error, isLoggedIn } = useSession();
    const sessionData = (!isValidating && !error && isLoggedIn) ? data : null;
    const isMobile = !useDesktop();
    const classes = useSearchResultsWidgetStyles({ isMobile, isPage, loading });

    const [visibilityState, setVisibilityState] = useState({
        isVisible: undefined,
        isDisabled: undefined,
        isBlocked: undefined,
    });
    visibilityState.isDisabled = offer?.isHidden && offer?.hiddenReason === "ADMIN_REQUEST";
    visibilityState.isVisible = !offer?.isHidden;
    visibilityState.isBlocked = offer?.isHidden && offer?.hiddenReason === "COMPANY_BLOCKED";

    const [visibilityError, setVisibilityError] = useState(null);
    const [showAdminReasonModal, setShowAdminReasonModal] = useState(false);

    const dealWithPromiseError = (err) => {
        if (Array.isArray(err) && err.length > 0) {
            if (Object.prototype.hasOwnProperty.call(err[0], "msg"))
                setVisibilityError(getHumanError(err[0]?.msg));
            else
                setVisibilityError(getHumanError(err[0]));
        }
        addSnackbar({
            message: visibilityError ? visibilityError : "Unexpected Error. Please try again later.",
            key: visibilityError,
        });
    };

    const getDisabledOfferMessage = () => (
        (sessionData?.isAdmin) ?
            `Offer disabled by an admin. Reason: ${offer.adminReason}`
            :
            "This offer was hidden by an admin so it won't show up in search results. "
            + "Please contact support for more information."
    );

    const getHiddenOfferMessage = () => {
        if (visibilityState.isDisabled)
            return getDisabledOfferMessage();
        else {
            return visibilityState.isBlocked ?
                "This offer is hidden, because the company is blocked."
                : "This offer is hidden so it won't show up in search results";
        }
    };

    if (loading && !isPage) {
        return (
            <div className={classes.offerContent} data-testid="offer-content">
                <div className={classes.unselectedOffer}>
                    <React.Fragment>
                        <div className={classes.magnifyingGlassAnimationWrapper}>
                            <LoadingMagnifyGlass duration={1.2} />
                        </div>
                        <Typography data-testid="random-loading-message" variant="h6">
                            {getRandomOngoingSearchMessage()}
                        </Typography>
                    </React.Fragment>
                </div>
            </div>
        );
    } else {
        return (
            <div className={classes.offerContent} data-testid="offer-content">
                <AdminReasonModal
                    open={showAdminReasonModal}
                    setOpen={setShowAdminReasonModal}
                    offer={offer}
                    setVisibilityState={setVisibilityState}
                    visibilityState={visibilityState}
                    dealWithPromiseError={dealWithPromiseError}
                />
                {(offer === null && !isPage) ?
                    <div className={classes.unselectedOffer} id="no_selected_offer_text">
                        <Typography variant="h5" classes={{ root: classes.pleaseSelectOfferText }}>
                            Please select an offer to view the details
                        </Typography>
                    </div>
                    :
                    <div>
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
                                                <Avatar
                                                    alt="company_logo"
                                                    color="blue"
                                                    src={offer.ownerLogo || defaultLogo}
                                                    className={classes.companyLogoInOffer}
                                                />
                                        }
                                        <Typography variant="h6" color="primary">
                                            { !loading && offer.ownerName}
                                        </Typography>
                                    </span>
                                </Grid>
                                <OfferVisibilityOptions
                                    loading={loading}
                                    sessionData={sessionData}
                                    classes={classes}
                                    visibilityState={visibilityState}
                                    setVisibilityState={setVisibilityState}
                                    addSnackbar={addSnackbar}
                                    setShowAdminReasonModal={setShowAdminReasonModal}
                                    dealWithPromiseError={dealWithPromiseError}
                                    isMobile={isMobile}
                                    offer={offer}
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
                                        content={offer?.technologies}
                                        loading={loading}
                                    />
                                    <ChipList
                                        type="Fields"
                                        content={offer?.fields}
                                        loading={loading}
                                    />
                                </Grid>
                            </Grid>
                            <OfferContentListItem
                                title="Contacts"
                                content={offer?.contacts}
                                loading={loading}
                            />
                        </div>
                        <div>
                            <Divider className={classes.offerDivider} />
                            <OfferContentListItem
                                title="Requirements"
                                content={offer?.requirements}
                                loading={loading}
                            />
                            <div className={classes.offerDescription}>
                                <Typography
                                    component="span" /* if we don't use component="span",
                                                    there is a <p> element inside a <p>,
                                                    which fails the validateDOMNesting*/
                                    variant="body1"
                                >
                                    { loading ?
                                        <Skeleton variant="rect" height="100px" />
                                        :
                                        <OfferDescription content={offer.description} />
                                    }
                                </Typography>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
};

OfferContent.propTypes = {
    addSnackbar: PropTypes.func,
    offer: PropTypes.instanceOf(Offer),
    loading: PropTypes.bool,
    isPage: PropTypes.bool,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferContent);

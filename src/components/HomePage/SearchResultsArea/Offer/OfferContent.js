import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { Avatar, Typography, Link, Grid, Tooltip, Divider, Button } from "@material-ui/core";
import Offer from "./Offer";
import OfferContentListItem from "./OfferContentListItem";

import LoadingMagnifyGlass from "./loading_magnify_glass_svg";
import { useDesktop } from "../../../../utils/media-queries";
import useSession from "../../../../hooks/useSession";

import useSearchResultsWidgetStyles from "../SearchResultsWidget/searchResultsWidgetStyles";
import LOADING_MESSAGES from "./offerLoadingMessages";
import {
    DateRange, LocationOn, Work, Schedule, MonetizationOn, MoneyOff,
    FindInPage, Visibility, VisibilityOff, Block, Info,
} from "@material-ui/icons";
import { format, parseISO } from "date-fns";
import createDOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";
import remarkBreaksPlugin from "remark-breaks";
import ChipList from "./ChipList";
import AdminReasonModal from "./AdminReasonModal";
import { enableOffer, hideOffer } from "../../../../services/offerVisibilityService";

import JOB_OPTIONS from "../../SearchArea/AdvancedSearch/JobOptions";

import { addSnackbar } from "../../../../actions/notificationActions";

import { connect } from "react-redux";
import { getHumanError } from "../../../../utils/offer/OfferUtils";
import { Skeleton } from "@material-ui/lab";

const purify = createDOMPurify(window);

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
    });
    visibilityState.isDisabled = offer?.isHidden && offer?.hiddenReason === "ADMIN_REQUEST";
    visibilityState.isVisible = !offer?.isHidden;

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

    const getDisabledOfferMessage = () => (
        (sessionData?.isAdmin) ?
            `Offer disabled by an admin. Reason: ${offer.adminReason}`
            :
            "This offer was hidden by an admin so it won't show up in search results. "
            + "Please contact support for more information."
    );

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
                                                    <Skeleton className={classes.ownerNameSkeleton} />
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
                                {
                                    !loading && (sessionData?.isAdmin || sessionData?.company?._id === offer.owner) &&
                                    <Grid item xs={12} md={3} className={classes.offerOptions}>
                                        {!isMobile && <Divider orientation="vertical" className={classes.verticalDivider} /> }
                                        {
                                            (sessionData?.company?._id === offer.owner) &&
                                            <Tooltip title={ visibilityState.isVisible ? "Hide Offer" : "Enable Offer"}>
                                                <Button
                                                    onClick={handleOfferVisibility}
                                                    className={classes.visibilityButton}
                                                    role="visibilityButton"
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
                                                        role="visibilityButton"
                                                        startIcon={(!visibilityState.isDisabled) ? <Block /> : <Visibility />}
                                                    >
                                                        { (!visibilityState.isDisabled) ? "Disable Offer" : "Enable Offer" }
                                                    </Button>
                                                </Tooltip>
                                        }
                                    </Grid>
                                }
                            </Grid>
                            <Typography variant="subtitle1" className={classes.hiddenOfferInfo}>
                                {
                                    !loading && (!visibilityState.isVisible || visibilityState.isDisabled) &&
                                        <span>
                                            <Info className={classes.iconStyle} />
                                            <span>
                                                {
                                                    (visibilityState.isDisabled) ?
                                                        getDisabledOfferMessage()
                                                        :
                                                        "This offer is hidden so it won't show up in search results"
                                                }
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
                                                    <Skeleton />
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
                                                    <Skeleton />
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
                                                <Skeleton />
                                                :
                                                <>
                                                    <Schedule className={classes.iconStyle} />
                                                    {moment(parseISO(offer.publishDate)).fromNow()}
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
                                        <ReactMarkdown remarkPlugins={[remarkBreaksPlugin]}>
                                            { purify.sanitize(offer.description) }
                                        </ReactMarkdown>
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

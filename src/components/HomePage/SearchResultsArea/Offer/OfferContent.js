import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { Typography, Link, Grid, Tooltip, Divider, IconButton, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Offer from "./Offer";
import OfferContentListItem from "./OfferContentListItem";

import LoadingMagnifyGlass from "./loading_magnify_glass_svg";
import { useDesktop } from "../../../../utils/media-queries";
import useSession from "../../../../hooks/useSession";

import useSearchResultsWidgetStyles from "../SearchResultsWidget/searchResultsWidgetStyles";
import LOADING_MESSAGES from "./offerLoadingMessages";
import {
    DateRange, LocationCity, Work, Schedule, MonetizationOn,
    FindInPage, Visibility, VisibilityOff, Block, Info,
} from "@material-ui/icons";
import { format, parseISO } from "date-fns";
import createDOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";
import remarkBreaksPlugin from "remark-breaks";
import ChipList from "./ChipList";
import AdminReasonModal from "./AdminReasonModal";
import { enableOffer, hideOffer } from "../../../../services/offerVisibilityService";

const purify = createDOMPurify(window);

const getRandomOngoingSearchMessage = () => LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

function capitalizeString(content) {
    if (content && content === content.toUpperCase())
        return content.toLowerCase().split(" ").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");
    return content;
}

const OfferContent = ({ offer, loading, isPage }) => {

    const { data, isValidating, error, isLoggedIn } = useSession();
    const sessionData = (!isValidating && !error && isLoggedIn) ? data : null;
    const classes = useSearchResultsWidgetStyles({ isMobile: !useDesktop(), isPage });

    const [visibilityState, setVisibilityState] = React.useState({
        isVisible: !offer?.isHidden,
        isDisabled: undefined,
    });
    visibilityState.isDisabled = offer?.isHidden && offer?.hiddenReason === "ADMIN_REQUEST";

    const [visibilityError, setVisibilityError] = React.useState(null);
    const [showAdminReasonModal, setShowAdminReasonModal] = React.useState(false);

    const dealWithPromiseError = (err) => {
        if (Array.isArray(err))
            setVisibilityError(err[0]?.msg);
        else if (Object.prototype.toString.call(err) === "[object String]") // err is a string
            setVisibilityError(err);
    };

    const handleOfferVisibility = () => {
        if (visibilityState.isVisible) {
            hideOffer(offer.id).then(() => {
                offer.isHidden = true;
                setVisibilityState({ ...visibilityState, isVisible: false });
            }).catch((err) => {
                dealWithPromiseError(err);
            });
        } else  {
            enableOffer(offer.id).then(() => {
                offer.isHidden = false;
                setVisibilityState({ ...visibilityState, isVisible: true });
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
            }).catch((err) => {
                dealWithPromiseError(err);
            });
        }
    };

    const handleCloseVisibilityErrorSnackbar = () => {
        setVisibilityError(null);
    };

    if (loading) {
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
                <Snackbar
                    open={visibilityError !== null}
                    autoHideDuration={3000}
                    onClose={handleCloseVisibilityErrorSnackbar}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    <Alert onClose={handleCloseVisibilityErrorSnackbar} severity="error">
                        {visibilityError ? visibilityError : "Unexpected Error. Please try again later."}
                    </Alert>
                </Snackbar>
                <AdminReasonModal
                    open={showAdminReasonModal}
                    setOpen={setShowAdminReasonModal}
                    offer={offer}
                    setShowAdminReasonModal={setShowAdminReasonModal}
                    setVisibilityState={setVisibilityState}
                    visibilityState={visibilityState}
                    dealWithPromiseError={dealWithPromiseError}
                />
                {offer === null ?
                    <div className={classes.unselectedOffer} id="no_selected_offer_text">
                        <Typography variant="h5" classes={{ root: classes.pleaseSelectOfferText }}>
                            {!isPage ? "Please select an offer to view the details" : "Unexpected Error"}
                        </Typography>
                    </div>
                    :
                    <div>
                        <div className={classes.offerHeader}>
                            <span className={classes.offerTitleRow}>
                                <Typography variant="h4" gutterBottom className={classes.offerTitle}>
                                    {
                                        isPage ?
                                            offer.title
                                            :
                                            <Link href={`/offer/${offer.id}`} className={classes.offerTitleLink}>
                                                {offer.title}
                                            </Link>
                                    }
                                </Typography>
                                {
                                    (sessionData?.company?._id === offer.owner) &&
                                    <IconButton
                                        onClick={handleOfferVisibility}
                                        className={classes.visibilityButton}
                                        disabled={visibilityState.isDisabled}
                                    >
                                        {
                                            (visibilityState.isVisible) ?
                                                <Tooltip title="Hide Offer">
                                                    <VisibilityOff className={classes.visibilityIcon} />
                                                </Tooltip>
                                                :
                                                <Tooltip title="Enable Offer">
                                                    <Visibility className={classes.visibilityIcon} />
                                                </Tooltip>
                                        }
                                    </IconButton>
                                }
                                {
                                    (sessionData?.isAdmin) &&
                                    <IconButton
                                        onClick={handleEnableDisableOffer}
                                        className={classes.visibilityButton}
                                    >
                                        {
                                            (!visibilityState.isDisabled) ?
                                                <Tooltip title="Disable Offer">
                                                    <Block color="primary" className={classes.visibilityIcon} />
                                                </Tooltip>
                                                :
                                                <Tooltip title="Enable Offer">
                                                    <Visibility className={classes.visibilityIcon} />
                                                </Tooltip>
                                        }
                                    </IconButton>
                                }
                            </span>
                            <Typography variant="subtitle1" className={classes.hiddenOfferInfo}>
                                {
                                    (!visibilityState.isVisible || visibilityState.isDisabled) &&
                                        <span>
                                            <Info className={classes.iconStyle} />
                                            <span>
                                                {
                                                    // eslint-disable-next-line no-nested-ternary
                                                    (visibilityState.isDisabled) ?
                                                        (
                                                            (sessionData?.isAdmin) ?
                                                                `Offer disabled by an admin. Reason: ${offer.adminReason}`
                                                                :
                                                                "This offer was hidden by an admin so it won't show up in search results. "
                                                                    + "Please contact support for more information."
                                                        )
                                                        :
                                                        "This offer is hidden so it won't show up in search results"

                                                }
                                            </span>
                                        </span>

                                }
                            </Typography>
                            <span className={classes.companyInfo}>
                                <img src={offer.ownerLogo} alt="Company Logo" className={classes.companyLogoInOffer} />
                                <Typography variant="h6" color="primary" gutterBottom>
                                    {offer.ownerName}
                                </Typography>
                            </span>
                            <Divider className={classes.offerDivider} />
                            <Grid container spacing={1}>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <div>
                                            <LocationCity className={classes.iconStyle} />
                                            <Typography variant="body1" display="inline">
                                                {offer.location}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <div>
                                            <Work className={classes.iconStyle} />
                                            <Typography variant="body1" display="inline">
                                                {capitalizeString(offer.jobType)}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <div>
                                            {(offer.jobMinDuration || offer.jobStartDate) &&
                                            <DateRange className={classes.iconStyle} />
                                            }
                                            {offer.jobStartDate &&
                                            <Typography display="inline" variant="body1">
                                                {format(parseISO(offer.jobStartDate), "dd-MM-yyyy")}
                                            </Typography>
                                            }
                                            {offer.jobMinDuration &&
                                            <>
                                                <Typography display="inline" variant="body1">
                                                    {offer.jobStartDate && " • "}
                                                    {offer.jobMinDuration}
                                                </Typography>
                                                <Typography display="inline" variant="body1">
                                                    {offer.jobMaxDuration ?
                                                        `-${offer.jobMaxDuration}` : "+"
                                                    }
                                                </Typography>
                                            </>
                                            }
                                            {offer.jobMinDuration && " months"}
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <div>
                                            <Schedule className={classes.iconStyle} />
                                            <Typography display="inline" variant="body1">
                                                {moment(parseISO(offer.publishDate)).fromNow()}
                                                {
                                                    offer.jobStartDate &&
                                                    (sessionData?.isAdmin || sessionData?.company?._id === offer.owner) &&
                                                    <Typography display="inline" variant="body1">
                                                        {` • until ${format(parseISO(offer.jobStartDate), "dd-MM-yyyy")}`}
                                                    </Typography>
                                                }
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                {
                                    (offer.vacancies || offer.isPaid) &&
                                    <Grid container item xs={12} spacing={3}>
                                        {
                                            offer.vacancies &&
                                            <Grid item xs={12} md={6}>
                                                <div>
                                                    <FindInPage className={classes.iconStyle} />
                                                    <Typography display="inline" variant="body1">
                                                        {`${offer.vacancies} ${offer.vacancies === 1 ? "vacancy" : "vacancies"}`}
                                                    </Typography>
                                                </div>
                                            </Grid>
                                        }
                                        {
                                            offer.isPaid &&
                                            <Grid item xs={12} md={6}>
                                                <div>
                                                    <MonetizationOn className={classes.iconStyle} />
                                                    <Typography display="inline" variant="body1">
                                                        Paid
                                                    </Typography>
                                                </div>
                                            </Grid>
                                        }
                                    </Grid>
                                }
                            </Grid>
                        </div>
                        <div>
                            <ChipList
                                type="Technologies"
                                content={offer.technologies}
                            />
                            <ChipList
                                type="Fields"
                                content={offer.fields}
                            />
                            <Divider className={classes.offerDivider} />
                            <OfferContentListItem
                                title="Requirements"
                                content={offer.requirements}
                            />
                            <OfferContentListItem
                                title="Contacts"
                                content={offer.contacts}
                            />
                            <Divider className={classes.offerDivider} />
                            <Typography variant="body1">
                                <ReactMarkdown remarkPlugins={[remarkBreaksPlugin]}>
                                    { purify.sanitize(offer.description) }
                                </ReactMarkdown>
                            </Typography>
                        </div>
                    </div>
                }
            </div>
        );
    }
};

OfferContent.propTypes = {
    offer: PropTypes.instanceOf(Offer),
    loading: PropTypes.bool,
};

export default OfferContent;

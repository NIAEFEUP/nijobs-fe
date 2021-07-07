import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { Typography, Link, Grid, Switch, FormControlLabel, Divider } from "@material-ui/core";
import Offer from "./Offer";
import OfferContentItem from "./OfferContentItem";

import LoadingMagnifyGlass from "./loading_magnify_glass_svg";
import { useDesktop } from "../../../../utils/media-queries";
import useSession from "../../../../hooks/useSession";

import useSearchResultsWidgetStyles from "../SearchResultsWidget/searchResultsWidgetStyles";
import LOADING_MESSAGES from "./offerLoadingMessages";
import { DateRange, LocationCity, Work, Schedule, MonetizationOn, FindInPage } from "@material-ui/icons";
import { format, parseISO } from "date-fns";
import createDOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";
import remarkBreaksPlugin from "remark-breaks";
import ChipList from "./ChipList";

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

    const [state, setState] = React.useState({
        isVisible: !offer?.isHidden,
    });

    const handleOfferVisibility = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        if (!event.target.checked) {
            // Hide offer
            // Ask for hidden reason or admin reason
            // Use the /hide endpoint
        } else  {
            // Make offer visible
            // Use /enable endpoint
        }
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
                                // TODO: only the owner company can see this switch
                                    (sessionData?.isAdmin || sessionData?.company?._id === offer.owner) &&
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={state.isVisible}
                                                onChange={handleOfferVisibility}
                                                name="isVisible"
                                                color="primary"
                                            />
                                        }
                                        label="Visible"
                                    />
                                }
                            </span>
                            <span className={classes.companyInfo}>
                                <img src={offer.ownerLogo} alt="Company Logo" className={classes.companyLogoInOffer} />
                                <Typography variant="h6" color="primary" gutterBottom>
                                    {offer.ownerName}
                                </Typography>
                            </span>
                            <Divider className={classes.offerDivider} />
                            <Grid container spacing={1}>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
                                        <div>
                                            <LocationCity className={classes.iconStyle} />
                                            <Typography variant="body1" display="inline">
                                                {offer.location}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div>
                                            <Work className={classes.iconStyle} />
                                            <Typography variant="body1" display="inline">
                                                {capitalizeString(offer.jobType)}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={3}>
                                    <Grid item xs={6}>
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
                                    <Grid item xs={6}>
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
                                            <Grid item xs={6}>
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
                                            <Grid item xs={6}>
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
                            {/* { console.log(sessionData) }
                            { console.log(data) }
                            { console.log(`isValidating: ${isValidating}`) }
                            { console.log(`error: ${error}`) }
                            { console.log(`isLoggedIn: ${isLoggedIn}`) } */}
                            <ChipList
                                type="Technologies"
                                content={offer.technologies}
                            />
                            <ChipList
                                type="Fields"
                                content={offer.fields}
                            />
                            <Divider className={classes.offerDivider} />
                            <OfferContentItem
                                hasPermissions
                                title="Requirements"
                                content={offer.requirements}
                            />
                            <OfferContentItem
                                hasPermissions
                                title="Contacts"
                                content={offer.contacts}
                            />
                            <OfferContentItem
                                hasPermissions={sessionData?.isAdmin || sessionData?.company?._id === offer.owner}
                                title="Hidden Reason"
                                content={offer.hiddenReason}
                            />
                            <OfferContentItem
                                hasPermissions={sessionData?.isAdmin}
                                title="Admin Reason"
                                content={offer.adminReason}
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

import React from "react";
import PropTypes from "prop-types";

import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
} from "@material-ui/core";
import Offer from "./Offer";

import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "react-loading-skeleton";
import { LocationCity } from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(2),
        cursor: "pointer",
    },
    offerTitle: {
        fontWeight: "bold",
        marginRight: theme.spacing(1),
        wordWrap: "break-word",
        display: "-webkit-box",
        overflow: "hidden",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": 2,
    },
    hoverMask: {
        backgroundColor: theme.palette.primary.main,
        width: 0,
        transition: "width 0.2s ease-in-out",
    },
    maskActive: {
        width: theme.spacing(1),
    },
    itemWrapper: {
        display: "flex",
        alignItems: "stretch",
        "&:hover": {
            "& $hoverMask": {
                width: theme.spacing(1),
            },
        },
    },

}));

const defaultLogo = require("./default_icon.svg");

const OfferItem = ({ selectedOffer, offer, setSelectedOffer, loading }) => {
    const isCurrentlySelected = offer?.id === selectedOffer?.id;
    const classes = useStyles();
    return (
        <div className={classes.itemWrapper}>
            {!loading && <div className={clsx(classes.hoverMask, { [classes.maskActive]: isCurrentlySelected })} />}
            <ListItem
                alignItems="flex-start"
                onClick={() => !loading && setSelectedOffer(offer)}
                className={classes.root}
            >
                <ListItemAvatar>
                    {loading ?
                        <Avatar data-testid="avatar-skeleton" variant="circle" classes={{ colorDefault: "transparent" }}>
                            <Skeleton circle width={100} height={100} />
                        </Avatar>
                        :
                        <Avatar
                            alt="company_logo"
                            color="blue"
                            src={offer?.company?.logo || defaultLogo}
                        />
                    }
                </ListItemAvatar>
                <ListItemText
                    primary={
                        loading ?
                            <span data-testid="title-skeleton">
                                <Skeleton />
                            </span>
                            :
                            offer.title
                    }
                    primaryTypographyProps={{
                        className: classes.offerTitle,
                        gutterBottom: true,
                    }}
                    secondary={loading ?
                        <span data-testid="subtitle-skeleton">
                            <Skeleton />
                        </span>
                        :
                        <>
                            <Typography
                                component="span"
                                variant="body2"
                                color="primary"
                                display="block"
                            >
                                {offer?.company?.name}
                            </Typography>
                            <LocationCity fontSize="small" style={{ verticalAlign: "sub" }} />
                            <Typography display="inline" variant="caption">
                                {offer.location}
                            </Typography>
                        </>
                    }
                />

            </ListItem>
        </div>
    );
};

OfferItem.propTypes = {
    offer: PropTypes.instanceOf(Offer),
    selectedOffer: PropTypes.instanceOf(Offer),
    setSelectedOffer: PropTypes.func,
    loading: PropTypes.bool,
};

export default OfferItem;

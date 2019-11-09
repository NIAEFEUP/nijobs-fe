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

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        cursor: "pointer",
    },
    offerTitle: {
        fontWeight: "bold",
    },
    hoverMask: {
        backgroundColor: theme.palette.primary.main,
        width: 0,
        transition: "width 0.2s ease-in-out",
    },
    itemWrapper: {
        display: "flex",
        alignItems: "stretch",
        "&:hover": {
            "& $hoverMask": {
                width: theme.spacing(),
            },
        },
    },

}));

const OfferItem = ({ offer, setSelectedOffer, loading }) => {
    const classes = useStyles();
    return (
        <div className={classes.itemWrapper}>
            <ListItem
                alignItems="flex-start"
                onClick={() => !loading && setSelectedOffer(offer)}
                className={classes.root}
            >
                <ListItemAvatar>
                    {loading ?
                        <Avatar variant="rounded" classes={{ colorDefault: "transparent" }}>
                            <Skeleton circle width={100} height={100} />
                        </Avatar>
                        :
                        <Avatar
                            alt="company_logo"
                            src={offer.company.logo}
                        />
                    }
                </ListItemAvatar>
                <ListItemText
                    primary={loading ? <Skeleton/> : offer.position}
                    primaryTypographyProps={{
                        className: classes.offerTitle,
                    }}
                    secondary={loading ?
                        <Skeleton/> :
                        <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                        >
                            {offer.company.name}
                        </Typography>}
                />

            </ListItem>
            <div className={classes.hoverMask} />
        </div>
    );
};

OfferItem.propTypes = {
    offer: PropTypes.instanceOf(Offer),
    setSelectedOffer: PropTypes.func,
    loading: PropTypes.bool,
};

export default OfferItem;

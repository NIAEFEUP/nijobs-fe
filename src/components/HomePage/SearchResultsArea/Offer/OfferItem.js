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

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: 0,
        paddingLeft: theme.spacing(2),
        cursor: "pointer",
    },
    offerTitle: {
        fontWeight: "bold",
    },
    hoverMask: {
        // height: "100px",
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

const OfferItem = ({ offer, setSelectedOffer }) => {
    const classes = useStyles();
    return (
        <div className={classes.itemWrapper}>
            <ListItem
                alignItems="flex-start"
                onClick={() => setSelectedOffer(offer)}
                className={classes.root}
            >
                <ListItemAvatar>
                    <Avatar
                        alt="company_logo"
                        src={offer.company.logo}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={offer.position}
                    primaryTypographyProps={{
                        className: classes.offerTitle,
                    }}
                    secondary={
                        <Typography
                            component="p"
                            variant="body2"
                            color="textPrimary"
                        >
                            {offer.company.name}
                        </Typography>
                    }
                />
            </ListItem>
            <div className={classes.hoverMask} />
        </div>
    );
};

OfferItem.propTypes = {
    offer: PropTypes.instanceOf(Offer).isRequired,
    setSelectedOffer: PropTypes.func.isRequired,
};

export default OfferItem;

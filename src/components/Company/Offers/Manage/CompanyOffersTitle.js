import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    hiddenChip: {
        backgroundColor: "#90A4AE",
        marginRight: "5px",
    },
    blockedChip: {
        backgroundColor: "#DC4338",
        marginRight: "5px",
    },
    archivedChip: {
        backgroundColor: "#56A8D6",
        marginRight: "5px",
    },
    chips: {
        position: "absolute",
    },
}));

const OfferTitle = ({ title, getOfferVisibility, offerId }) => {
    const [chips, setChips] = useState([]);
    const isHidden = getOfferVisibility(offerId)?.isHidden;
    const isBlocked = getOfferVisibility(offerId)?.isDisabled;
    const isArchived = getOfferVisibility(offerId)?.isArchived;

    const classes = useStyles();

    useEffect(() => {
        const statusChips = {
            hidden: <Chip size="small" label="Hidden" data-testid="HiddenChip" className={classes.hiddenChip} />,
            blocked: <Chip size="small" label="Blocked" data-testid="BlockedChip" className={classes.blockedChip} />,
            archived: <Chip size="small" label="Archived" data-testid="ArchivedChip" className={classes.archivedChip} />,
        };

        const tempChips = [];
        if (isHidden)
            tempChips.push(statusChips.hidden);
        if (isBlocked)
            tempChips.push(statusChips.blocked);
        if (isArchived)
            tempChips.push(statusChips.archived);
        setChips(tempChips);
    }, [classes, isArchived, isBlocked, isHidden]);

    return (
        <>
            {title}
            <div className={classes.chips}>
                {chips}
            </div>
        </>
    );
};

OfferTitle.propTypes = {
    title: PropTypes.string.isRequired,
    getOfferVisibility: PropTypes.func.isRequired,
    offerId: PropTypes.number.isRequired,
};

export default OfferTitle;

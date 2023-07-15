import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Chip, makeStyles } from "@material-ui/core";

const statusChips = {
    hidden: <Chip label="Hidden" size="small" data-testid="HiddenChip" style={{ backgroundColor: "#90A4AE" }} />,
    blocked: <Chip label="Blocked" size="small" data-testid="BlockedChip" style={{ backgroundColor: "#DC4338" }} />,
    archived: <Chip label="Archived" size="small"  data-testid="ArchivedChip" style={{ backgroundColor: "#56A8D6" }} />,
};

const useStyles = makeStyles(() => ({
    chips: {
        position: "absolute",
    },
}));

const OfferTitle = ({ title, getOfferVisibility, setOfferVisibility, offerId }) => {
    const [chips, setChips] = useState([]);
    const isHidden = getOfferVisibility(offerId)?.isHidden;
    const isBlocked = getOfferVisibility(offerId)?.isDisabled;
    const isArchived = getOfferVisibility(offerId)?.isArchived;

    const classes = useStyles();

    useEffect(() => {
        const tempChips = [];
        if (isHidden)
            tempChips.push(statusChips.hidden, <span>&nbsp;</span>);
        if (isBlocked)
            tempChips.push(statusChips.blocked, <span>&nbsp;</span>);
        if (isArchived)
            tempChips.push(statusChips.archived, <span>&nbsp;</span>);
        setChips(tempChips);
    }, [isArchived, isBlocked, isHidden, setOfferVisibility]);

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
    setOfferVisibility: PropTypes.func.isRequired,
    offerId: PropTypes.number.isRequired,
};

export default OfferTitle;

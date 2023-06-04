import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Chip } from "@material-ui/core";

export const statusChips = {
    hidden: <Chip label="Hidden" size="small" style={{ backgroundColor: "#90A4AE" }} />,
    blocked: <Chip label="Blocked" size="small" style={{ backgroundColor: "#DC4338" }} />,
    archived: <Chip label="Archived" size="small" style={{ backgroundColor: "#56A8D6" }} />,
};

const OfferTitle = ({ title, offersVisibility, setOfferVisibility, offerId }) => {
    const [chips, setChips] = useState([]);
    const isHidden = offersVisibility[offerId]?.isHidden;
    const isBlocked = offersVisibility[offerId]?.isDisabled;
    const isArchived = offersVisibility[offerId]?.isArchived;

    useEffect(() => {
        const tempChips = [];
        if (isHidden)
            tempChips.push(statusChips.hidden);
        if (isBlocked)
            tempChips.push(statusChips.blocked);
        if (isArchived)
            tempChips.push(statusChips.archived);
        setChips(tempChips);
    }, [isArchived, isBlocked, isHidden, offerId, offersVisibility, setOfferVisibility]);

    return (
        <>
            {title}
            <div style={{ position: "absolute" }}>
                {chips.reduce((res, chip, index, chips) => {
                    res.push(chip);
                    if (index !== chips.length - 1)
                        res.push(<span>&nbsp;</span>);
                    return res;
                }, [])}
            </div>
        </>
    );
};

OfferTitle.propTypes = {
    title: PropTypes.string.isRequired,
    offersVisibility: PropTypes.array,
    setOfferVisibility: PropTypes.func,
    offerId: PropTypes.number,
};

export default OfferTitle;

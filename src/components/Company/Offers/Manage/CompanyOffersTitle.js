import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Chip } from "@material-ui/core";

export const statusChips = {
    active: <Chip label="Active" size="small" style={{ backgroundColor: "#4CAF50" }} />,
    hidden: <Chip label="Hidden" size="small" style={{ backgroundColor: "#90A4AE" }} />,
    blocked: <Chip label="Blocked" size="small" style={{ backgroundColor: "#DC4338" }} />,
    archived: <Chip label="Archived" size="small" style={{ backgroundColor: "#56A8D6" }} />,
};

const OfferTitle = ({ title, offerVisibilityState }) => {
    const [chips, setChips] = useState([]);

    useEffect(() => {
        const tempChips = [];
        if (offerVisibilityState?.isVisible)
            tempChips.push(statusChips.active);
        if (offerVisibilityState?.isHidden)
            tempChips.push(statusChips.hidden);
        if (offerVisibilityState?.isDisabled)
            tempChips.push(statusChips.blocked);
        if (offerVisibilityState?.isArchived)
            tempChips.push(statusChips.archived);
        setChips(tempChips);
    }, [offerVisibilityState]);

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
    offerVisibilityState: PropTypes.object,
};

export default OfferTitle;

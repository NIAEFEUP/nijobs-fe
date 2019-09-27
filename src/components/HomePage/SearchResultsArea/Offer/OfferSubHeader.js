import React from "react";
import PropTypes from "prop-types";

import { Icon } from "@material-ui/core";

import OfferCardStyle from "./OfferCard.module.css";

const OfferSubHeader = ({ company, location, date }) => (
    <React.Fragment>
        <div className={OfferCardStyle.jobInfo}>
            <Icon>
                location_city
            </Icon>
            <span className={OfferCardStyle.subheaderLabel}>
                {company}
            </span>
            <Icon>
                place
            </Icon>
            <span className={OfferCardStyle.subheaderLabel}>
                {location}
            </span>
        </div>
        <span className={"date-label"}>
            {date}
        </span>
    </React.Fragment>
);

OfferSubHeader.propTypes = {
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

export default OfferSubHeader;

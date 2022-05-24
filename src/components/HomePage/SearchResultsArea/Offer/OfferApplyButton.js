import React from "react";
import PropTypes from "prop-types";

import { Fab, Tooltip } from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const OfferApplyButton = ({ onClick }) =>
    <Tooltip
        title="Apply to this offer"
        placement="top"
    >
        <Fab
            color="primary"
            aria-label="Search"
            onClick={onClick}
        >
            <FontAwesomeIcon size="lg" icon={faArrowUpRightFromSquare} />
        </Fab>
    </Tooltip>;

OfferApplyButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default OfferApplyButton;

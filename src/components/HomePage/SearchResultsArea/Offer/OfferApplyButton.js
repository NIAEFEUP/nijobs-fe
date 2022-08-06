import React from "react";
import PropTypes from "prop-types";

import { Button, Tooltip } from "@material-ui/core";
import { BaseDialog } from "../../../../utils/Dialog/BaseDialog";

const OfferApplyButton = ({ open, handleAccept, handleToggle, applyURL, title }) =>
    <>
        <Tooltip
            title="Apply to this offer"
            placement="top"
        >
            <Button variant="contained" color="primary" onClick={handleToggle}>
                Apply
            </Button>
        </Tooltip>
        <BaseDialog
            open={open}
            handleAccept={handleAccept}
            handleToggle={handleToggle}
            handleReject={handleToggle}
            content={applyURL}
            title={title}
            rejectButtonText="Go back"
            acceptButtonText="Continue"
            centerContent={true}
        />
    </>
;

OfferApplyButton.propTypes = {
    open: PropTypes.bool.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired,
    applyURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default OfferApplyButton;

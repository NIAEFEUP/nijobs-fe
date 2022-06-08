import React from "react";
import PropTypes from "prop-types";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid, Tooltip } from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const OfferApplyButton = ({ open, handleAccept, handleToggle, applyURL }) =>
    <>
        <Tooltip
            title="Apply to this offer"
            placement="top"
        >
            <Fab
                color="primary"
                aria-label="Search"
                onClick={handleToggle}
            >
                <FontAwesomeIcon size="lg" icon={faArrowUpRightFromSquare} />
            </Fab>
        </Tooltip>
        <OfferApplyDialog
            open={open}
            handleAccept={handleAccept}
            handleToggle={handleToggle}
            applyURL={applyURL}
        />
    </>
;

const OfferApplyDialog = ({ open, handleAccept, handleToggle, applyURL }) =>
    <>
        <Dialog
            open={open}
            onClose={handleToggle}
        >
            <DialogTitle>
                You&apos;re being redirected to the following website:
            </DialogTitle>
            <DialogContent style={{ textAlign: "center" }}>
                { applyURL }
            </DialogContent>
            <DialogActions>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm="auto" marginRight={2}>
                        <Button onClick={handleToggle}>Go back</Button>
                    </Grid>
                    <Grid item xs={12} sm="auto">
                        <Button color="primary" variant="contained" onClick={handleAccept}>Continue</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    </>
;

OfferApplyButton.propTypes = {
    open: PropTypes.bool.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired,
    applyURL: PropTypes.string.isRequired,
};

OfferApplyDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired,
    applyURL: PropTypes.string.isRequired,
};

export default OfferApplyButton;

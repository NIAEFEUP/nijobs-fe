import React from "react";
import PropTypes from "prop-types";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    dialog: {
        padding: theme.spacing(2),
        textAlign: "center",
    },
    buttonsArea: {
        display: "flex",
        justifyContent: "flex-end",
        padding: theme.spacing(2),
    },
}));

const OfferApplyButton = ({ open, handleAccept, handleToggle, applyURL }) =>
    <>
        <Tooltip
            title="Apply to this offer"
            placement="top"
        >
            <Button variant="contained" color="primary" onClick={handleToggle}>
                Apply
            </Button>
        </Tooltip>
        <OfferApplyDialog
            open={open}
            handleAccept={handleAccept}
            handleToggle={handleToggle}
            applyURL={applyURL}
        />
    </>
;

const OfferApplyDialog = ({ open, handleAccept, handleToggle, applyURL }) => {
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={handleToggle}
            classes={{ paper: classes.dialog }}
        >
            <DialogTitle>
                {"You're being redirected to the following website:"}
            </DialogTitle>
            <DialogContent>
                { applyURL }
            </DialogContent>
            <DialogActions className={classes.buttonsArea}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item xs={5} sm="auto">
                        <Button onClick={handleToggle}>Go back</Button>
                    </Grid>
                    <Grid item xs={5} sm="auto">
                        <Button color="primary" variant="contained" onClick={handleAccept}>Continue</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

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

import React from "react";
import PropTypes from "prop-types";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles } from "@material-ui/core";
import { useMobile } from "../media-queries";

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

export const BaseDialog = ({ open, handleAccept, handleToggle, handleReject, content, title,
    rejectButtonText, acceptButtonText, wrapButtons, centerContent }) => {
    const classes = useStyles();
    const isMobile = useMobile();

    return (
        <Dialog
            open={open}
            onClose={handleToggle}
            classes={{ paper: classes.dialog }}
        >
            <DialogTitle>
                { title }
            </DialogTitle>
            <DialogContent style={{ textAlign: centerContent ? "center" : "justify" }}>
                { content }
            </DialogContent>
            <DialogActions className={classes.buttonsArea}>
                <Grid container spacing={2} justifyContent={!isMobile ? "flex-end" : "center"}>
                    <Grid item xs={wrapButtons ? 12 : 5} sm="auto">
                        <Button onClick={handleReject}>
                            { rejectButtonText }
                        </Button>
                    </Grid>
                    <Grid item xs={wrapButtons ? 12 : 5} sm="auto">
                        <Button color="primary" variant="contained" onClick={handleAccept}>
                            { acceptButtonText }
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

BaseDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired,
    content: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    rejectButtonText: PropTypes.string.isRequired,
    acceptButtonText: PropTypes.string.isRequired,
    wrapButtons: PropTypes.bool,
    centerContent: PropTypes.bool,
};

import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    dialog: {
        padding: theme.spacing(2),
    },
    buttonsArea: {
        display: "flex",
        justifyContent: "flex-end",
        padding: theme.spacing(2),
    },
}));

const ApplicationInfoDialog = ({ open, toggle }) => {
    const classes = useStyles();
    return (
        <Dialog
            open={open}
            classes={{ paper: classes.dialog }}
            onClose={toggle}
        >
            <DialogTitle>
                Why do I need to apply?
            </DialogTitle>
            <DialogContent style={{ textAlign: "justify" }}>
                <p>
                    {"NIJobs is a free platform for companies to share their job opportunities with students."}
                </p>
                <p>
                    {"As this platform is made by students, for students, we oversee the entries \
                    so that we can make sure that both our and the participating companies' expectations are satisfied."}
                </p>
                <p>
                    {"Once you're accepted, you will receive an email from us, and you \
                    will be able to customize your profile further (Add a nice Bio, and a Company Logo, as well as your contacts)"}
                </p>
                <p>
                    {"See you soon!"}
                </p>
            </DialogContent>
            <DialogActions className={classes.buttonsArea}>
                <Button onClick={toggle} color="primary" variant="contained">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

ApplicationInfoDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
};

export default ApplicationInfoDialog;

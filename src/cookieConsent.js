import React, { useEffect, useState } from "react";
import { Button, Box, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from "@material-ui/core";
import { DAY_IN_MS } from "./utils/TimeUtils";
import { clearAnalytics, initAnalytics } from "./utils/analytics";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RouterLink } from "./utils";

export const COOKIE_ACCEPT_LIFETIME_DAYS = 30;
export const COOKIE_REJECT_LIFETIME_DAYS = 5;

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

const CookiesUsageDialog = ({ open, handleAccept, handleReject }) => {
    const classes = useStyles();
    return (
        <Dialog
            open={open}
            classes={{ paper: classes.dialog }}
        >
            <DialogTitle>
                Why do we use cookies?
            </DialogTitle>
            <DialogContent style={{ textAlign: "justify" }}>
                <p>
                    {"NIJobs uses cookies to collect usage to improve our product."}
                </p>
                <p>
                    {"Regarding privacy issues, we simply collect search parameters and other \
                        useful metrics without linking them to your identity."}
                </p>
                <p>
                    {"For more information, consult our "}
                    <Link component={RouterLink} to="privacy">
                        {"Privacy Policy"}
                    </Link>
                    {"!"}
                </p>
                <p>
                    {"Thank you!"}
                </p>
            </DialogContent>
            <DialogActions className={classes.buttonsArea}>
                <Box marginRight={2}>
                    <Button onClick={handleReject}>Use only essential cookies</Button>
                </Box>
                <Box>
                    <Button color="primary" variant="contained" onClick={handleAccept}>Accept</Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};


export const CookieConsent = () => {
    const [open, setOpen] = useState(false);

    const [showWhyModal, setShowWhyModal] = useState(false);

    const handle = (accepted) => {
        if (accepted) {
            initAnalytics();
        } else {
            clearAnalytics();
        }
    };

    useEffect(() => {
        const cookies = localStorage.getItem("non-essential-cookies-enablement");
        if (!cookies) {
            setOpen(true);
            return;
        }

        const expired = Date.now() > cookies.expires;
        setOpen(expired);
        if (!expired) {
            handle(cookies.accepted);
        }
    }, []);

    const handleAccept = () => {
        const expires = Date.now() + (COOKIE_ACCEPT_LIFETIME_DAYS * DAY_IN_MS);
        localStorage.setItem("non-essential-cookies-enablement", {
            "accepted": true,
            expires,
        });
        handle(true);
        setOpen(false);
        setShowWhyModal(false);
    };

    const handleReject = () => {
        const expires = Date.now() + (COOKIE_REJECT_LIFETIME_DAYS * DAY_IN_MS);
        localStorage.setItem("non-essential-cookies-enablement", {
            "accepted": false,
            expires,
        });
        handle(false);
        setOpen(false);
        setShowWhyModal(false);
    };

    const handleShowWhyModal = () => {
        setShowWhyModal(true);
        setOpen(false);
    };

    return (
        <CookieComponent
            open={open}
            handleAccept={handleAccept}
            handleReject={handleReject}
            showWhyModal={showWhyModal}
            handleShowWhyModal={handleShowWhyModal}
        />
    );
};

const CookieComponent = ({ open, showWhyModal, handleAccept, handleReject, handleShowWhyModal }) => {
    const action = (
        <>
            <Box marginRight={2}>
                <Button color="primary" onClick={handleAccept}>Accept</Button>
            </Box>
            <Box>
                <Button color="primary" onClick={handleShowWhyModal}>Learn how we use cookies</Button>
            </Box>
        </>
    );

    return (
        <>
            <Snackbar
                message="This website uses optional cookies to improve user experience"
                open={open}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                action={action}
            />
            <CookiesUsageDialog
                open={showWhyModal}
                handleAccept={handleAccept}
                handleReject={handleReject}
            />
        </>);
};

CookieComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired,
    showWhyModal: PropTypes.bool.isRequired,
    handleShowWhyModal: PropTypes.func.isRequired,
};

CookiesUsageDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired,
};

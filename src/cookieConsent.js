import React, { useEffect } from "react";
import { Button, Box, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, makeStyles, Grid } from "@material-ui/core";
import { DAY_IN_MS, MONTH_IN_MS } from "./utils/TimeUtils";
import { clearAnalytics, initAnalytics } from "./utils/analytics";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RouterLink } from "./utils";
import { useMobile } from "./utils/media-queries";
import useToggle from "./hooks/useToggle";

export const COOKIE_ACCEPT_LIFETIME_MONTHS = 6;
export const COOKIE_REJECT_LIFETIME_DAYS = 5;

const useStyles = (isMobile) => makeStyles((theme) => ({
    dialog: {
        padding: theme.spacing(2),
    },
    buttonsArea: {
        display: "flex",
        justifyContent: "flex-end",
        padding: theme.spacing(2),
    },
    snackbar: isMobile ? ({
        "& .MuiSnackbarContent-action": {
            paddingLeft: 0,
        },
    }) : ({}),
}));

const CookiesUsageDialog = ({ open, handleAccept, handleReject, handleToggle }) => {
    const classes = useStyles()();
    const isMobile = useMobile();

    return (
        <Dialog
            open={open}
            onClose={handleToggle}
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
                <Grid container spacing={2} justifyContent={!isMobile ? "flex-end" : "center"}>
                    <Grid item xs={12} sm="auto" marginRight={2}>
                        <Button onClick={handleReject}>Use only essential cookies</Button>
                    </Grid>
                    <Grid item xs={12} sm="auto">
                        <Button color="primary" variant="contained" onClick={handleAccept}>Accept</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export const CookieConsent = () => {
    const [open, toggleOpen, setClosed] = useToggle(false);

    const [showWhyModal, toggleWhyModal, setClosedWhyModal] = useToggle(false);

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
            toggleOpen();
            return;
        }

        const expired = Date.now() > cookies.expires;
        if (!expired) {
            handle(cookies.accepted);
        } else {
            toggleOpen();
        }
    }, [toggleOpen]);

    const handleAccept = () => {
        const expires = Date.now() + (COOKIE_ACCEPT_LIFETIME_MONTHS * MONTH_IN_MS);
        localStorage.setItem("non-essential-cookies-enablement", {
            "accepted": true,
            expires,
        });
        handle(true);
        setClosed();
        setClosedWhyModal();
    };

    const handleReject = () => {
        const expires = Date.now() + (COOKIE_REJECT_LIFETIME_DAYS * DAY_IN_MS);
        localStorage.setItem("non-essential-cookies-enablement", {
            "accepted": false,
            expires,
        });
        handle(false);
        setClosed();
        setClosedWhyModal();
    };

    const handleToggle = () => {
        toggleOpen();
        toggleWhyModal();
    };

    return (
        <CookieComponent
            open={open}
            handleAccept={handleAccept}
            handleReject={handleReject}
            showWhyModal={showWhyModal}
            handleToggle={handleToggle}
        />
    );
};

const CookieComponent = ({ open, showWhyModal, handleAccept, handleReject, handleToggle }) => {
    const isMobile = useMobile();
    const classes = useStyles(isMobile)();

    const action = (
        <>
            <Box>
                <Button color="primary" onClick={handleToggle}>Learn how we use cookies</Button>
            </Box>
            <Box margin={1}>
                <Button color="primary" variant="contained" onClick={handleAccept}>Accept</Button>
            </Box>
        </>
    );

    return (
        <>
            <Snackbar
                className={classes.snackbar}
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
                handleToggle={handleToggle}
            />
        </>);
};

CookieComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired,
    showWhyModal: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired,
};

CookiesUsageDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired,
};

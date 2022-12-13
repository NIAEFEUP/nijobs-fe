import React, { useEffect } from "react";
import { Button, Box, Snackbar, makeStyles, Link } from "@material-ui/core";
import { DAY_IN_MS, MONTH_IN_MS } from "./utils/TimeUtils";
import { clearAnalytics, initAnalytics } from "./utils/analytics";
import PropTypes from "prop-types";
import { RouterLink } from "./utils";
import { useMobile } from "./utils/media-queries";
import useToggle from "./hooks/useToggle";
import { BaseDialog } from "./utils/Dialog/BaseDialog";

export const COOKIE_ACCEPT_LIFETIME_MONTHS = 6;
export const COOKIE_REJECT_LIFETIME_DAYS = 5;

const useStyles = (isMobile) => makeStyles((theme) => ({
    dialog: {
        padding: theme.spacing(2),
        textAlign: "center",
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

const CookiesUsageDialogContent = ({ handleToggle }) => (
    <>
        <p>
            {"NIJobs uses cookies to collect usage to improve our product."}
        </p>
        <p>
            {"Regarding privacy issues, we simply collect search parameters and other \
                        useful metrics without linking them to your identity."}
        </p>
        <p>
            {"For more information, consult our "}
            <Link component={RouterLink} to="/privacy-policy" onClick={handleToggle}>
                {"Privacy Policy"}
            </Link>
            {"!"}
        </p>
        <p>
            {"Thank you!"}
        </p>
    </>
);

export const CookieConsent = () => {
    const [open, toggleOpen, resetConsentOpeningState] = useToggle(false);

    const [showWhyModal, toggleWhyModal, setClosedWhyModal] = useToggle(false);

    const handle = (accepted) => {
        if (accepted) {
            initAnalytics();
        } else {
            clearAnalytics();
        }
    };

    useEffect(() => {
        const rawCookies = localStorage.getItem("non-essential-cookies-enablement");
        if (!rawCookies) {
            toggleOpen();
            return;
        }

        try {
            const cookies = JSON.parse(rawCookies);

            const expired = Date.now() > cookies.expires;
            if (!expired) {
                handle(cookies.accepted);
            } else {
                toggleOpen();
            }
        } catch {
            toggleOpen();
        }

    }, [toggleOpen]);

    const handleAccept = () => {
        const expires = Date.now() + (COOKIE_ACCEPT_LIFETIME_MONTHS * MONTH_IN_MS);
        localStorage.setItem("non-essential-cookies-enablement", JSON.stringify({
            accepted: true,
            expires,
        }));
        handle(true);
        resetConsentOpeningState();
        setClosedWhyModal();
    };

    const handleReject = () => {
        const expires = Date.now() + (COOKIE_REJECT_LIFETIME_DAYS * DAY_IN_MS);
        localStorage.setItem("non-essential-cookies-enablement", JSON.stringify({
            accepted: false,
            expires,
        }));
        handle(false);
        resetConsentOpeningState();
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
            <BaseDialog
                open={showWhyModal}
                handleAccept={handleAccept}
                handleToggle={handleToggle}
                handleReject={handleReject}
                content={<CookiesUsageDialogContent handleToggle={handleToggle} />}
                title="Why do we use cookies?"
                rejectButtonText="Use only essential cookies"
                acceptButtonText="Accept"
                wrapButtons={true}
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

CookiesUsageDialogContent.propTypes = {
    handleToggle: PropTypes.func.isRequired,
};

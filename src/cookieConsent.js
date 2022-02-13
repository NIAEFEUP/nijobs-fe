import React, { useEffect, useState } from "react";
import { Button, Box, Snackbar } from "@material-ui/core";
import { DAY_IN_MS } from "./utils/TimeUtils";
import { clearAnalytics, initAnalytics } from "./utils/analytics";
import PropTypes from "prop-types";

export const COOKIE_ACCEPT_LIFETIME_DAYS = 30;
export const COOKIE_REJECT_LIFETIME_DAYS = 5;

export const CookieConsent = () => {
    const [open, setOpen] = useState(false);

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
    };

    const handleReject = () => {
        const expires = Date.now() + (COOKIE_REJECT_LIFETIME_DAYS * DAY_IN_MS);
        localStorage.setItem("non-essential-cookies-enablement", {
            "accepted": false,
            expires,
        });
        handle(false);
        setOpen(false);
    };

    return (
        <CookieComponent
            open={open}
            handleAccept={handleAccept}
            handleReject={handleReject}
        />
    );
};

const CookieComponent = ({ open, handleAccept, handleReject }) => {
    const action = (
        <>
            <Box marginRight={2}>
                <Button color="primary" onClick={handleAccept}>Accept</Button>
            </Box>
            <Box>
                <Button color="primary" onClick={handleReject}>Use only essential cookies</Button>
            </Box>
        </>
    );

    return (
        <Snackbar
            message="This website uses optional cookies to improve user experience"
            open={open}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            action={action}
        />);
};

CookieComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired,
};

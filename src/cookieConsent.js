import React, { useEffect, useState } from "react";
import { Button, Grid, Snackbar } from "@material-ui/core";
import { DAY_IN_MS } from "./utils/TimeUtils";
import Cookies from "js-cookie";
import { initAnalytics } from "./utils/analytics";
import PropTypes from "prop-types";

export const COOKIE_ACCEPT_LIFETIME_DAYS = 30;
export const COOKIE_REJECT_LIFETIME_DAYS = 5;

export const CookieConsent = () => {
    const [open, setOpen] = useState(false);

    const handle = (accepted) => {
        if (accepted) {
            initAnalytics();
        } else {
            Cookies.remove("_ga");
            Cookies.remove("_gat");
            Cookies.remove("_gid");
        }
    };

    useEffect(() => {
        const cookies = localStorage.getItem("cookies-accepted");
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
        localStorage.setItem("cookies-accepted", {
            "accepted": true,
            expires,
        });
        handle(true);
        setOpen(false);
    };

    const handleReject = () => {
        const expires = Date.now() + (COOKIE_REJECT_LIFETIME_DAYS * DAY_IN_MS);
        localStorage.setItem("cookies-accepted", {
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
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Button color="primary" onClick={handleAccept}>Accept</Button>
            </Grid>
            <Grid item xs={6}>
                <Button color="primary" onClick={handleReject}>Reject</Button>
            </Grid>
        </Grid>
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

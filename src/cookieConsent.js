import React, { useEffect, useState } from "react";
import { Button, Grid, Snackbar } from "@material-ui/core";
import { DAY_IN_MS } from "./utils/TimeUtils";
import Cookies from "js-cookie";
import { initAnalytics } from "./utils/analytics";
import PropTypes from "prop-types";

const COOKIE_LIFETIME_DAYS = 15;

export const CookieConsent = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const date = localStorage.getItem("cookies-accepted");
        if (!date) {
            setOpen(true);
            return;
        }
        setOpen(Date.now() > date);
    }, []);

    const handleAccept = () => {
        const newDate = Date.now() + (COOKIE_LIFETIME_DAYS * DAY_IN_MS);
        localStorage.setItem("cookies-accepted", newDate);
        initAnalytics();
        setOpen(false);
    };

    const handleReject = () => {
        Cookies.remove("_ga");
        Cookies.remove("_gat");
        Cookies.remove("_gid");
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

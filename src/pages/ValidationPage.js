import React, { useEffect, useState } from "react";
import { CardContent, CircularProgress, makeStyles } from "@material-ui/core";
import { useMobile } from "../utils/media-queries";
import { Redirect, useParams } from "react-router-dom";
import { validateApplication } from "../services/companyApplicationService";

const useStyles = (isMobile) => makeStyles((theme) => ({
    content: {
        padding: isMobile ? theme.spacing(2, 2) : theme.spacing(3, 9),
    },
}));

const ValidationPage = () => {
    const isMobile = useMobile();
    const classes = useStyles(isMobile)();
    const { token } = useParams();

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        try {
            setLoading(false);
            setSuccess(true);
            validateApplication(token);
        } catch {
            setLoading(false);
            setSuccess(false);
        }
    }, [token]);

    if (loading) {
        return <CircularProgress />;
    } else if (success) {
        // toggle
        return <Redirect to="/" />;
    }

    return (
        <CardContent className={classes.content}>
            Error
        </CardContent>
    );
};

export default ValidationPage;

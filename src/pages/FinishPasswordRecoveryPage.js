import React, { useEffect, useState } from "react";
import { CardContent, CircularProgress, makeStyles } from "@material-ui/core";
import { useMobile } from "../utils/media-queries";
import { verifyPasswordRecoveryToken } from "../services/auth";
import { Redirect, useParams } from "react-router-dom";

const useStyles = (isMobile) => makeStyles((theme) => ({
    content: {
        padding: isMobile ? theme.spacing(2, 2) : theme.spacing(3, 9),
    },
}));

const FinishPasswordRecoveryPage = () => {
    const isMobile = useMobile();
    const classes = useStyles(isMobile)();
    const { token } = useParams();

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        try {
            setLoading(false);
            setSuccess(true);
            verifyPasswordRecoveryToken(token);
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

export default FinishPasswordRecoveryPage;

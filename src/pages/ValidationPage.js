/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { CardContent, CircularProgress, makeStyles, Button } from "@material-ui/core";
import { useMobile } from "../utils/media-queries";
import { Redirect, useParams } from "react-router-dom";
import { validateApplication } from "../services/companyApplicationService";

const useStyles = (isMobile) => makeStyles((theme) => ({
    content: {
        padding: isMobile ? theme.spacing(2, 2) : theme.spacing(3, 3),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: "rgb(80,80,80)",
        fontSize: "23px",
    },
    text: {
        color: "rgb(100,100,100)",
        fontSize: "15px",
        maxWidth: isMobile ? "100%" : "80%",
        textAlign: "center",

    },
    button: {
        background: "rgb(250,80,80)",
        color: "white",
        marginTop: "3vh",

    },
}));

const ValidationPage = () => {
    const isMobile = useMobile();
    const classes = useStyles(isMobile)();
    const { token } = useParams();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [buttonPressed, setButtonPressed] = useState(false);
    const [err,setErr] = useState("");


    useEffect( () => {
        try {
            async function ola()
            {
                try {
                    setLoading(false);
                    setSuccess(true);
                    await validateApplication(token);
                } catch ( error){
                    setLoading(false);
                    setSuccess(false);
                    setErr(error.message);
                }

            }
            ola();
        } catch(error) {
            setLoading(false);
            setSuccess(false);
            setErr(error.message);
        }
    }, [token]);

    if (buttonPressed) {
        return <Redirect to="/" />;
    }

    if (loading) {
        return (
            <CardContent className={classes.content}>
                <h2 className={classes.title}>Loading...</h2>
                <CircularProgress  />
            </CardContent>
        );
    } else if (success) {
            return  (
                <CardContent className={classes.content}>
                    <h2 className={classes.title}>Your application has been validated successfully! </h2>
                    <span className={classes.text}>
                        We will now review your application, and in case you're approved,
                         you will receive another email with further instructions in order to complete your registration.
                    </span>
                    <Button className={classes.button} variant="contained" onClick={() => setButtonPressed(true) }>
                        Click here to go to Home page
                    </Button>
                </CardContent>
            );

    }

    return (
        <CardContent className={classes.content}>
            <h2 className={classes.title}> {err}! </h2>
            <span className={classes.text}>
                An error has occur when validating your application for more information contact
                <a href="mailto:nijobs@aefeup.pt"> nijobs@aefeup.pt</a>
                !
                </span>
            <Button className={classes.button} variant="contained" onClick={() => setButtonPressed(true) }>
                Click here to go to Home page
            </Button>
        </CardContent>
    );
};

export default ValidationPage;

/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { CardContent, CircularProgress, makeStyles, Button } from "@material-ui/core";
import { useMobile } from "../utils/media-queries";
import { Redirect, useParams } from "react-router-dom";
import { validateApplication } from "../services/companyApplicationService";
import { getValidationError } from "../components/Apply/Company/CompanyApplicationUtils.js";

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
        background: "rgb(250,70,70)",
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
    const [error, setError] = useState("");


    useEffect(() => {
        async function validate() {
            try {
                setLoading(false);
                setSuccess(true);
                await validateApplication(token);
            } catch (error_) {
                setError(error_[0].msg);
                setLoading(false);
                setSuccess(false);
            }

        }
        validate();

    }, [token]);
    const errorMessage = (error) => {
        const { title, text } = getValidationError(error);
        return (
            <CardContent className={classes.content}>
                <h2 className={classes.title}>
                    {title}
                </h2>
                <span className={classes.text}>
                    {text}
                    for more information contact us:
                    <a href="mailto:nijobs@aefeup.pt"> nijobs@aefeup.pt</a>
                    !
                </span>
                <Button className={classes.button} variant="contained" onClick={() => setButtonPressed(true) }>
                    Click here to go to Home page
                </Button>
            </CardContent>
        );
    };

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
                        You should receive a confirmation email shortly. If not, please contact us:
                         <a href="mailto:nijobs@aefeup.pt"> nijobs@aefeup.pt</a>
                    </span>
                    <Button className={classes.button} variant="contained" onClick={() => setButtonPressed(true) }>
                        Click here to go to Home page
                    </Button>
                </CardContent>
            );
    } else {
       return  errorMessage(error);
    }

};
export default ValidationPage;

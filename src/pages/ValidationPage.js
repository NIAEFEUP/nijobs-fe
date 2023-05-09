/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import {CardContent, CircularProgress, makeStyles, Button, Fab, Link, Typography} from "@material-ui/core";
import { useMobile } from "../utils/media-queries";
import { Link as RouteLink} from "react-router-dom";
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
        fontWeight:500,
    },
    text: {
        fontSize: theme.typography.body1,
        maxWidth: isMobile ? "100%" : "80%",
        textAlign: "center",

    },
    button: {
        background: theme.palette.primary.main,
        color:theme.palette.dark.contrastText,
        '&:hover':{
            background: theme.palette.secondary.main,
        }
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
            } catch (err) {
                setError(err[0].msg);
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
               <Typography variant="h5" className={classes.title} gutterBottom>
                    {title}
               </Typography>
                <Typography variant="body1" gutterBottom align='center' >
                    {text}
                    for more information contact us:
                    <a href="mailto:nijobs@aefeup.pt"> nijobs@aefeup.pt</a>
                    !
                </Typography>

                <Button color= "primary" variant= "extended" className={classes.button} component={RouteLink} to={'/'} >
                  Click here to go to Home page
                </Button>
            </CardContent>
        );
    };

    if (buttonPressed) {
        return <RouteLink to={"/"} ></RouteLink>;
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
                         <Link href="mailto:nijobs@aefeup.pt">nijobs@aefeup.pt</Link>
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

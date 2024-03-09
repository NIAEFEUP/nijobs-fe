import React, { useEffect, useState } from "react";
import { CardContent, CircularProgress, makeStyles, Button, Link, Typography } from "@material-ui/core";
import { useMobile } from "../utils/media-queries";
import { useParams } from "react-router-dom";
import { validateApplication } from "../services/companyApplicationService";
import { getValidationMessage } from "../components/Apply/Company/CompanyApplicationUtils.js";
import { RouterLink } from "../utils";

const useStyles = (isMobile) => makeStyles((theme) => ({
    content: {
        padding: isMobile ? theme.spacing(2, 2) : theme.spacing(3, 3),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1em",
    },
    title: {
        fontWeight: 500,
    },
    text: {
        fontSize: theme.typography.body1,
        maxWidth: isMobile ? "100%" : "80%",
        textAlign: "center",

    },
    button: {
        background: theme.palette.primary.main,
        color: theme.palette.dark.contrastText,
        "&:hover": {
            background: theme.palette.secondary.main,
        },
    },


}));

const ValidationPage = () => {
    const successMessage = getValidationMessage("success");
    const isMobile = useMobile();
    const classes = useStyles(isMobile)();
    const { token } = useParams();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
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

    const getMessageCard = (error) => {

        const { title, text } = success ? successMessage : getValidationMessage(error);
        return (
            <CardContent className={classes.content}>
                <Typography variant="h5" className={classes.title} gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" gutterBottom align="center">
                    {text}
                    {!success ? "For more information contact us at " : ""}
                    <Link href={"mailto:nijobs@aefeup.pt"}> nijobs@aefeup.pt</Link>
                    !
                </Typography>

                <Button color="primary" variant="contained" className={classes.button} component={RouterLink} to="/">
                    {"Click here to go to Home page"}
                </Button>

            </CardContent>
        );
    };

    if (loading) {
        return (
            <CardContent className={classes.content}>
                <h2 className={classes.title}>Loading...</h2>
                <CircularProgress  />
            </CardContent>
        );
    } else {
        return  getMessageCard(error);
    }

};
export default ValidationPage;

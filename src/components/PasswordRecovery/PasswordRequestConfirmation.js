import React from "react";
import { CardHeader, CardContent, CardActions, Link, Typography, makeStyles } from "@material-ui/core";
import Constants from "../../utils/Constants";
import { RouterLink } from "../../utils";

const useStyles = makeStyles((theme) => ({
    content: {
        textAlgin: "justify",
    },
    actions: {
        margin: theme.spacing(1),
    },
    secondText: {
        marginTop: theme.spacing(2),
    },
}));

const PasswordRequestConfirmation = () => {
    const classes = useStyles();
    return (
        <>
            <CardHeader title="Request Submitted" />
            <CardContent className={classes.content}>
                <Typography variant="body2">
                    Request Submitted. If your email is registered you should receive an email shortly explaining the next steps.
                    {" "}
                    If not, please contact us:
                    {" "}
                    <Link color="secondary" href={`mailto:${Constants.CONTACT_US_EMAIL}`}>
                        {Constants.CONTACT_US_EMAIL}
                    </Link>
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <RouterLink
                    to="/"
                >
                Go to Homepage
                </RouterLink>
            </CardActions>
        </>
    );
};

export default PasswordRequestConfirmation;

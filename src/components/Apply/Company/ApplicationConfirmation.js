import React from "react";
import { RouterLink } from "../../../utils";
import { CardHeader, CardContent, CardActions, Link, Typography, makeStyles } from "@material-ui/core";
import Constants from "../../../utils/Constants";

const useStyles = makeStyles((theme) => ({
    content: {
        textAlign: "justify",
    },
    actions: {
        margin: theme.spacing(1),
    },
    secondText: {
        marginTop: theme.spacing(2),
    },
}));

const ApplicationConfirmation = () => {
    const classes = useStyles();
    return (
        <>
            <CardHeader title="Application Submitted" />
            <CardContent className={classes.content}>
                <Typography variant="body2">
                    Application Submitted: You should receive an email containing a confirmation link for your application.
                    Please confirm it within 10 minutes; otherwise, the link will expire. If you have not received an email,
                    please contact us at
                    {" "}
                    <Link color="secondary" href={`mailto:${Constants.CONTACT_US_EMAIL}`}>
                        {Constants.CONTACT_US_EMAIL}
                    </Link>
                </Typography>
                <Typography variant="body2" className={classes.secondText}>
                    {"Once your application is approved, you will receive an email. Then, you can log into NIJobs.  "}
                    Do not forget your password, you will need it on the first login.
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

export default ApplicationConfirmation;

import React from "react";
import { Card, CardHeader, CardContent, CardActions, Link, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    actions: {
        margin: theme.spacing(1),
    },
}));

const ApplicationConfirmation = () => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader title="Application Submitted" />
            <CardContent>
                <Typography variant="body2">
                Application Submitted, add meaningful message here
                </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Link
                    href="/"
                >
                Go to Homepage
                </Link>
            </CardActions>
        </Card>
    );
};

export default ApplicationConfirmation;

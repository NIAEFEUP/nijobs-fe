import { CardContent, makeStyles } from "@material-ui/core";
import React from "react";
import ApplicationsReviewWidget from "../components/Review/Applications/ApplicationsReviewWidget";

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3, 9),
        boxSizing: "content-box",
    },
}));

const ApplicationsReviewPage = () => {
    const classes = useStyles();
    return (
        <CardContent className={classes.content}>
            <ApplicationsReviewWidget />
        </CardContent>
    );
};

export default ApplicationsReviewPage;

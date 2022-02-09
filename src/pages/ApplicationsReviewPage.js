import { CardContent, makeStyles } from "@material-ui/core";
import React from "react";
import ApplicationsReviewWidget from "../components/Review/Applications/ApplicationsReviewWidget";
import { useMobile } from "../utils/media-queries";

const useStyles = (isMobile) => makeStyles((theme) => ({
    content: {
        padding: isMobile ? theme.spacing(2, 4) : theme.spacing(3, 9),
        boxSizing: "content-box",
    },
}));

const ApplicationsReviewPage = () => {
    const classes = useStyles(useMobile())();

    return (
        <CardContent className={classes.content}>
            <ApplicationsReviewWidget />
        </CardContent>
    );
};

export default ApplicationsReviewPage;

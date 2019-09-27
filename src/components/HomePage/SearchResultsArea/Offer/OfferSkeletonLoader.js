import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
} from "@material-ui/core";

import OfferCardTheme from "./OfferCardTheme";
import SubheaderSkeleton from "./OfferSkeleton/SubheaderSkeleton";
import ContentSkeleton from "./OfferSkeleton/ContentSkeleton";
import LogoSkeleton from "./OfferSkeleton/LogoSkeleton";

const useStyles = makeStyles(OfferCardTheme);

const OfferSkeletonLoader = () => {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <div className={classes.logo}>
                <LogoSkeleton />
            </div>
            <div className={classes.details}>
                <CardHeader
                    classes={{
                        root: classes.header,
                        title: classes.title,
                        subheader: classes.skeletonSubheader,
                    }}
                    subheader={<SubheaderSkeleton />}
                />
                <CardContent className={classes.content}>
                    <ContentSkeleton />
                </CardContent>
            </div>
        </Card>
    );
};

export default OfferSkeletonLoader;

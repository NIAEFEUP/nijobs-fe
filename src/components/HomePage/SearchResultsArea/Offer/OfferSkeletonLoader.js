import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles';

import OfferCardTheme from './OfferCardTheme';
import SubheaderSkeleton from './OfferSkeleton/SubheaderSkeleton';
import ContentSkeleton from './OfferSkeleton/ContentSkeleton';
import LogoSkeleton from './OfferSkeleton/LogoSkeleton';

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
                        subheader: classes.skeletonSubheader
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
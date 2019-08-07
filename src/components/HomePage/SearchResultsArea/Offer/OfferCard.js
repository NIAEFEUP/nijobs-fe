import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core';

import OfferSubHeader from './OfferSubHeader';
import OfferSkeletonLoader from './OfferSkeletonLoader';

import OfferCardTheme from './OfferCardTheme';

const logo = require('./ni.png');

const useStyles = makeStyles(OfferCardTheme);

const OfferCard = props => {

    const { loading, position, company, location, date, description } = props;
    const classes = useStyles();

    if(loading) {
        return (<OfferSkeletonLoader />);
    }

    return (
        <Card className={classes.card}>
            <CardMedia 
                className={classes.logo}
                image={logo}
                title={`${company} logo`}
            />
            <div className={classes.details}>
                <CardHeader
                    classes={{
                        root: classes.header,
                        title: classes.title,
                        subheader: classes.subheader
                    }}
                    title={position}
                    titleTypographyProps={{variant: 'h5'}}
                    subheader={
                        <OfferSubHeader 
                            company={company}
                            location={location}
                            date={date}
                        />
                    }
                    subheaderTypographyProps={{variant: 'caption'}}
                />
                <CardContent className={classes.content}>
                    <Typography 
                        variant="h6"
                        gutterBottom
                    >
                            Description
                    </Typography>
                    <Typography 
                        variant="body1"
                    >
                        {description}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
    
};

OfferCard.propTypes = {
    position: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    loading: PropTypes.bool
};

export default OfferCard;
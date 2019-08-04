import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import OfferCardTheme from './OfferCardTheme';
import OfferCardStyle from './OfferCard.module.css';

const logo = require('./ni.png');

const SubHeader = (props) => {
    const { company, location, date } = props;
    return (
        <React.Fragment>
            <div className={OfferCardStyle.jobInfo}>
                <Icon>
                location_city
                </Icon>
                <span className={OfferCardStyle.subheaderLabel}>
                    {company}
                </span>
                <Icon>
                place
                </Icon>
                <span className={OfferCardStyle.subheaderLabel}>
                    {location}
                </span>
            </div>
            <span>
                {date}
            </span>
        </React.Fragment>
    );
};

SubHeader.propTypes = {
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

class OfferCard extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        position: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }

    render() {

        const { classes } = this.props;

        const { position, company, location, date, description } = this.props;

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
                            <SubHeader 
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
    }
}

export default withStyles(OfferCardTheme)(OfferCard);
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

const logo = require('./ni.png');

class OfferCard extends Component {

    static styles = {
        card: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        },
        logo: {
            height: 100,
            width: 100,
            margin: '0 1em'
        },
        subheader: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '1em',
            paddingBottom: '0.5em',
            borderBottom: '1px solid #dfe1e5'
        },
        jobInfo: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            flex: 1
        },
        content: {
            paddingTop: 0
        }
    }

    static propTypes = {
        classes: PropTypes.object.isRequired
    }

    render() {

        const { classes } = this.props;

        const subheader = (
            <React.Fragment>
                <div className={classes.jobInfo}>
                    <Icon>
                        location_city
                    </Icon>
                    NIAEFEUP
                    <Icon>
                        place
                    </Icon>
                    Porto, Portugal
                </div>
                <span>
                    2 days ago
                </span>
            </React.Fragment>
        );

        return (
            <Card className={classes.card}>
                <CardMedia 
                    className={classes.logo}
                    image={logo}
                    title="Paella dish"
                />
                <div className={classes.details}>
                    <CardHeader
                        classes={{
                            root: classes.header,
                            subheader: classes.subheader
                        }}
                        title="Front-end developer"
                        titleTypographyProps={{variant: 'h4'}}
                        subheader={subheader}
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
                        We are looking for shit
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        );
    }
}

export default withStyles(OfferCard.styles)(OfferCard);
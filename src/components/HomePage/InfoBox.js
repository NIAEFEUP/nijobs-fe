import React, { Component } from 'react';
import PropTypes from 'prop-types';
import homePageStyles from './HomePage.module.css';

import Typography from '@material-ui/core/Typography';

class InfoBox extends Component {

    static propTypes = {
        info: PropTypes.string
    }

    render() {

        const {info} = this.props;

        return (
            <div 
                className={homePageStyles.infoBox}
            >
                <Typography
                    align='center'
                    variant="body1"
                    gutterBottom
                    color='secondary'
                >
                    {info} 
                </Typography>
            </div>
        );
    }
}

export default InfoBox;
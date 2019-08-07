import React from 'react';
import PropTypes from 'prop-types';
import homePageStyles from '../HomePage.module.css';

import {Typography} from '@material-ui/core';

const InfoBox = ({info}) => {

    return (
        <div className={homePageStyles.infoBox}>
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
};

InfoBox.propTypes = {
    info: PropTypes.string
};

export default InfoBox;
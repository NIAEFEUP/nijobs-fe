import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

class InfoBox extends Component {

    static propTypes = {
        info: PropTypes.string
    }

    

    render() {

        const {info} = this.props;

        return (
            <div>
                <Typography
                    align='center'
                    variant="h5"
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
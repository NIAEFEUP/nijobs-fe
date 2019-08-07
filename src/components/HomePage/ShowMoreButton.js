import React from 'react';
import PropTypes from 'prop-types';

import {IconButton} from '@material-ui/core';
import {KeyboardArrowDownRounded} from '@material-ui/icons';

const ShowMoreButton = ({className, onClick}) => {
    return (
        <div className={className}>
            <IconButton
                onClick={onClick}
            >
                <KeyboardArrowDownRounded
                    fontSize="large"
                />
            </IconButton>
        </div>
    );
};

ShowMoreButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export default ShowMoreButton;
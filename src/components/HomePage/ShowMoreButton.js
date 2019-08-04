import React from 'react';
import PropTypes from 'prop-types';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import IconButton from '@material-ui/core/IconButton';

const ShowMoreButton = props => {
    
    const { className, onClick } = props;
    return (
        <div className={className}>
            <IconButton
                onClick={onClick}
            >
                <KeyboardArrowDownIcon
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
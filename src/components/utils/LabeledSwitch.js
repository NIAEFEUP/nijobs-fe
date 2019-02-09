import React from 'react';
import PropTypes from 'prop-types';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const LabeledSwitch = ({label, name, value, handleChange, className}) => {
    
    return (
        <FormControlLabel
            className={className}
            control={
                <Switch
                    checked={value}
                    onChange={handleChange}
                    name={name}
                    value={value}
                    color='primary'
                />
            }
            label={label}
        />
    );
};
    
LabeledSwitch.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default LabeledSwitch;
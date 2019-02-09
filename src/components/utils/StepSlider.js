import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import Slider from '@material-ui/lab/Slider';

import { withStyles } from '@material-ui/core/styles';


const style = {
    root: {
        width: '200px',
    },
    slider: {
        padding: '22px 0px',
        marginLeft: '10px'
    },
};

class StepSlider extends Component {
    static propTypes = {
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        step: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        handleChange: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired,
        className: PropTypes.string,
    }

    render() {
        const { value, name, label, min, max, step, handleChange, classes, className } = this.props;
        return (
            <React.Fragment>
                <FormControlLabel
                    className={`${classes.root}, ${className}`}
                    labelPlacement='start'
                    control={

                        <Slider
                            classes={{
                                container: classes.slider
                            }}
                            value={value}
                            name={name}
                            min={min}
                            max={max}
                            step={step}
                            onChange={handleChange}
                        />
                    }
                    label={label}
                />
                <FormHelperText>
                    {value}
                </FormHelperText>
            </React.Fragment>
                
        );
    }
}

export default withStyles(style)(StepSlider);

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

import Slider from '@material-ui/lab/Slider';

import stepSliderStyle from "./StepSlider.module.css";


import { withStyles } from '@material-ui/core/styles';
import AppTheme from '../../AppTheme';


const style = {
    root: {
        padding: `0 ${AppTheme.spacing.unit*2}px`
    },
    slider: {
        padding: '22px 0px',
        marginLeft: '10px'
    },
    valueDisplay: {
        marginRight: AppTheme.spacing.unit*3,
    }
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
            <div className={stepSliderStyle.stepSlider}>
                <FormControlLabel
                    className={className}
                    labelPlacement='start'
                    control={
                        <React.Fragment>
                            <Typography 
                                id="value-display"
                                classes={{
                                    root: classes.valueDisplay
                                }}
                                style={{
                                    width: `${Math.floor(Math.log10(max)) + 1}ch`
                                }}
                            >
                                {value}
                            </Typography>
                            <Slider
                                classes={{
                                    root: classes.root,
                                    container: classes.slider
                                }}
                                value={value}
                                name={name}
                                min={min}
                                max={max}
                                step={step}
                                onChange={handleChange}
                                aria-labelledby="value-display"
                            />
                        </React.Fragment>
                    }
                    label={label}
                />
            </div>
                
        );
    }
}

export default withStyles(style)(StepSlider);

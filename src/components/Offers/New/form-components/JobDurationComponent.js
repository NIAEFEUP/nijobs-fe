import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { FormControl, FormHelperText, Slider } from "@material-ui/core";
import { JOB_MAX_DURATION, JOB_MIN_DURATION } from "../../../../reducers/searchOffersReducer";

const JobDurationComponent = ({ disabled, control }) => (
    <Controller
        name="jobDuration"
        render={(
            { field: { onChange, onBlur, name, value } },
        ) => {
            const lastValueText = `${value[1]}${value[1] === JOB_MAX_DURATION ? "+" : ""}`;

            return (
                <FormControl
                    margin="normal"
                    variant="outlined"
                    fullWidth
                >
                    <Slider
                        name={name}
                        value={value}
                        onChange={(_e, values) => onChange(values)}
                        onBlur={onBlur}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={JOB_MIN_DURATION}
                        max={JOB_MAX_DURATION}
                        disabled={disabled}
                    />
                    <FormHelperText>
                        { value[0] === value[1] ?
                            `Job duration: ${lastValueText} ${value[0] === 1 ? "month" : "months"}`
                            : `Job duration: ${value[0]} - ${lastValueText} months`}
                    </FormHelperText>
                </FormControl>
            );
        }}
        control={control}
    />
);

JobDurationComponent.propTypes = {
    disabled: PropTypes.bool,
    control: PropTypes.object.isRequired,
};

export default JobDurationComponent;

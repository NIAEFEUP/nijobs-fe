import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { FormControl, FormHelperText, Slider, makeStyles } from "@material-ui/core";
import { JOB_MAX_DURATION, JOB_MIN_DURATION } from "../../../../reducers/searchOffersReducer";

const useStyles = makeStyles({
    helperText: {
        marginLeft: 0,
    },
});

const JobDurationComponent = ({ disabled, control }) => {

    const styles = useStyles();

    return (
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
                            id={name}
                            value={value}
                            onChange={(_e, values) => onChange(values)}
                            onBlur={onBlur}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={JOB_MIN_DURATION}
                            max={JOB_MAX_DURATION}
                            disabled={disabled}
                        />
                        <FormHelperText className={styles.helperText}>
                            { value[0] === value[1] ?
                                `Job Duration: ${lastValueText} ${value[0] === 1 ? "month" : "months"}`
                                : `Job Duration: ${value[0]} - ${lastValueText} months`}
                        </FormHelperText>
                    </FormControl>
                );
            }}
            control={control}
        />
    );
};

JobDurationComponent.propTypes = {
    disabled: PropTypes.bool,
    control: PropTypes.object.isRequired,
};

export default JobDurationComponent;

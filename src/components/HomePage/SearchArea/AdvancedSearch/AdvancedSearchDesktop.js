import React from "react";
import PropTypes from "prop-types";
import {
    TextField,
    MenuItem,
    FormControl,
    // Typography,
    Slider,
    Collapse,
    FormControlLabel,
    Switch,
    // FormGroup,
    FormHelperText,
} from "@material-ui/core";

import JobTypes from "../JobTypes";
import useSearchAreaStyles from "../searchAreaStyle";
import MultiOptionAutocomplete from "./MultiOptionAutocomplete/MultiOptionAutocomplete";

const AdvancedSearchDesktop = ({
    open, minJobDuration, maxJobDuration,
    FieldsSelectorProps, TechsSelectorProps, JobTypeSelectorProps, JobDurationSwitchProps,
    JobDurationCollapseProps, JobDurationSwitchLabel, JobDurationSliderProps,
}) => {

    const classes = useSearchAreaStyles();

    return (
        <Collapse
            in={open}
            classes={{ wrapperInner: classes.advancedSearchContainer }}
        >
            <TextField
                className={classes.jobTypeSelector}
                {...JobTypeSelectorProps}
            >
                {JobTypes.map(({ value, label }) => (
                    <MenuItem
                        key={value}
                        value={value}
                    >
                        {label}
                    </MenuItem>
                ))}
            </TextField>
            <FormControlLabel
                className={classes.jobDurationSliderToggle}
                control={
                    <Switch
                        {...JobDurationSwitchProps}
                    />
                }
                label={JobDurationSwitchLabel}
            />
            <Collapse
                {...JobDurationCollapseProps}
                classes={{ wrapperInner: classes.mobileAdvancedSearchJobDuration }}
                className={classes.jobDurationSliderCollapse}
            >
                <FormControl
                    fullWidth
                    className={classes.durationSlider}
                >
                    <Slider
                        {...JobDurationSliderProps}
                    />
                    {/* <Typography
                        id="duration-label"
                        variant="caption"
                    >
                        {`Job Duration - ${minJobDuration}-${maxJobDuration} month(s)`}
                    </Typography> */}
                    <FormHelperText>
                        {`Job Duration - ${minJobDuration}-${maxJobDuration} month(s)`}
                    </FormHelperText>
                </FormControl>
            </Collapse>
            <MultiOptionAutocomplete
                {...FieldsSelectorProps}
                className={classes.fieldsSelector}
                chipWrapperProps={{
                    style: {
                        gridColumnStart: 1,
                        gridRowStart: 4,
                    },
                }}
            />
            <MultiOptionAutocomplete
                {...TechsSelectorProps}
                className={classes.techsSelector}
                chipWrapperProps={{
                    style: {
                        gridColumnStart: 2,
                        gridRowStart: 4,
                    },
                }}
                // threshold={MAX_FIELDS_CHIP}
            />
        </Collapse>
    );
};

AdvancedSearchDesktop.propTypes = {
    open: PropTypes.bool.isRequired,
};

export default AdvancedSearchDesktop;

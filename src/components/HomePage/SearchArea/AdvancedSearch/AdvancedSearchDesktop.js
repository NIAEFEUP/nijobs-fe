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
    FormHelperText,
    Button,
} from "@material-ui/core";

import JobTypes from "../JobTypes";
import useSearchAreaStyles from "../searchAreaStyle";
import MultiOptionAutocomplete from "./MultiOptionAutocomplete/MultiOptionAutocomplete";

const AdvancedSearchDesktop = ({
    open, resetAdvancedSearch, FieldsSelectorProps, TechsSelectorProps, JobTypeSelectorProps, JobDurationSwitchProps,
    JobDurationSliderText, JobDurationCollapseProps, JobDurationSwitchLabel, JobDurationSliderProps,
}) => {

    const classes = useSearchAreaStyles();

    return (
        <React.Fragment>
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
                        <FormHelperText>
                            {JobDurationSliderText}
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
            {open &&
                <div className={classes.resetBtnWrapper}>
                    <Button color="primary" onClick={resetAdvancedSearch}>Reset Advanced Fields</Button>
                </div>
            }
        </React.Fragment>
    );
};

AdvancedSearchDesktop.propTypes = {
    open: PropTypes.bool.isRequired,
};

export default AdvancedSearchDesktop;

import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
    TextField,
    MenuItem,
    FormControl,
    Slider,
    Collapse,
    FormControlLabel,
    Switch,
    FormHelperText,
    Button,
} from "@material-ui/core";

import JobOptions from "./JobOptions";
import useSearchAreaStyles from "../searchAreaStyle";
import MultiOptionAutocomplete from "./MultiOptionAutocomplete/MultiOptionAutocomplete";
import { AdvancedSearchControllerContext } from "../SearchArea";

const JobDurationCollapse = ({ className, JobDurationCollapseProps, JobDurationSliderProps, sliderText }) => (
    <Collapse
        {...JobDurationCollapseProps}
        className={className}
    >
        <FormControl fullWidth>
            <Slider {...JobDurationSliderProps} />
            <FormHelperText>
                {sliderText}
            </FormHelperText>
        </FormControl>
    </Collapse>
);

JobDurationCollapse.propTypes = {
    className: PropTypes.string,
    JobDurationCollapseProps: PropTypes.object.isRequired,
    JobDurationSliderProps: PropTypes.object.isRequired,
    sliderText: PropTypes.string.isRequired,
};

const AdvancedSearchDesktop = () => {

    const classes = useSearchAreaStyles();

    const {
        advancedOptions, resetAdvancedSearch, FieldsSelectorProps, TechsSelectorProps, JobTypeSelectorProps, JobDurationSwitchProps,
        ResetButtonProps, JobDurationSliderText, JobDurationCollapseProps, JobDurationSwitchLabel, JobDurationSliderProps,
    } = useContext(AdvancedSearchControllerContext);

    return (
        <React.Fragment>
            <Collapse
                in={advancedOptions}
                className={classes.advancedSearchOuterWrapper}
                classes={{ wrapperInner: classes.advancedSearchContainer }}
            >
                <TextField
                    className={classes.jobTypeSelector}
                    {...JobTypeSelectorProps}
                >
                    {JobOptions.map(({ value, label }) => (
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
                    control={<Switch {...JobDurationSwitchProps} />}
                    label={JobDurationSwitchLabel}
                />
                <JobDurationCollapse
                    className={classes.jobDurationSliderCollapse}
                    JobDurationCollapseProps={JobDurationCollapseProps}
                    JobDurationSliderProps={JobDurationSliderProps}
                    sliderText={JobDurationSliderText}
                />
                <MultiOptionAutocomplete
                    {...FieldsSelectorProps}
                    _id="fields_selector"
                    className={classes.fieldsSelector}
                    chipWrapperProps={{
                        className: "chip-wrapper",
                    }}
                />
                <MultiOptionAutocomplete
                    {...TechsSelectorProps}
                    _id="techs_selector"
                    className={classes.techsSelector}
                    chipWrapperProps={{
                        className: "chip-wrapper",
                    }}
                />
            </Collapse>
            {advancedOptions &&
                <div className={classes.resetBtnWrapper}>
                    <Button
                        {...ResetButtonProps}
                        _id="reset_btn"
                        color="primary"
                        onClick={resetAdvancedSearch}
                    >
                        Reset Advanced Fields
                    </Button>
                </div>
            }
        </React.Fragment>
    );
};

export default AdvancedSearchDesktop;

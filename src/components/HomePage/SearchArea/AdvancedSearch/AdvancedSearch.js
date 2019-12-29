import React from "react";
import PropTypes from "prop-types";
import {
    TextField,
    MenuItem,
    FormControl,
    Typography,
    Slider,
    Collapse,
    FormControlLabel,
    Switch,
} from "@material-ui/core";
import SliderValueTooltip from "./SliderValueTooltip";

import JobTypes from "../JobTypes";
import useSearchAreaStyles from "../searchAreaStyle";
import { INITIAL_JOB_DURATION } from "../../../../reducers/searchOffersReducer";

// TODO tornar este componente generico e extende-lo para versao desktop e mobile,
// que lhe passam funçoes de render cenas, este toma conta de business logic

const AdvancedSearch = ({ open, showJobDurationSlider, toggleShowJobDurationSlider, jobDuration, jobType, setJobType, setJobDuration }) => {

    const classes = useSearchAreaStyles();
    const [minJobDuration, maxJobDuration] = jobDuration;

    return (
        <Collapse
            in={open}
            classes={{ wrapperInner: classes.advancedSearchContainer }}
        >
            <FormControlLabel
                control={
                    <Switch checked={showJobDurationSlider} onChange={toggleShowJobDurationSlider} value="useJobDuration"/>
                }
                label="Filter Job Duration"
            />
            <TextField
                id="job_type"
                select
                label="Job Type"
                className={classes.jobTypeSelector}
                value={jobType ? jobType : ""}
                onChange={setJobType}
                helperText="Please select your job type"
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
            <Collapse
                in={showJobDurationSlider}
                classes={{ wrapperInner: classes.mobileAdvancedSearchJobDuration }}
                onEnter={() => {
                    setJobDuration(null, [INITIAL_JOB_DURATION, INITIAL_JOB_DURATION + 1]);
                }}
            >
                <FormControl
                    fullWidth
                    className={classes.durationSlider}
                >
                    <Slider
                        valueLabelDisplay="auto"
                        ValueLabelComponent={SliderValueTooltip}
                        value={jobDuration}
                        name="jobDuration"
                        min={1}
                        max={12}
                        step={1}
                        onChange={setJobDuration}
                    />
                    <Typography
                        id="duration-label"
                        variant="caption"
                    >
                        {`Job Duration - ${minJobDuration}-${maxJobDuration} month(s)`}
                    </Typography>
                </FormControl>
            </Collapse>
        </Collapse>
    );
};

AdvancedSearch.propTypes = {
    open: PropTypes.bool.isRequired,
};

export default AdvancedSearch;

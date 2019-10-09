import React, { useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { addSnackbar } from "../../../actions/notificationActions";
import { searchOffers } from "../../../actions/nijobsService";

import useToggle from "../../../hooks/useToggle";

import JOB_TYPES from "./jobTypes";

import {
    FormControl,
    Typography,
    Paper,
    Slider,
    TextField,
    MenuItem,
    Collapse,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import searchAreaStyle from "./SearchArea.module.css";

import SearchBar from "./SearchBar";
import ShowAdvancedOptionsButton from "./ShowAdvancedOptionsButton";
import SliderValueTooltip from "./SliderValueTooltip";

const INITIAL_JOB_TYPE = undefined;
const INITIAL_JOB_DURATION = 1;

const useStyles = makeStyles({
    wrapperInner: {
        display: "grid",
        "grid-template-columns": "1fr 1fr",
        "grid-template-rows": "1fr",
        "align-items": "center",
        "grid-gap": "1em",
    },
});

export const SearchArea = ({ addSnackbar, onSubmit, searchOffers }) => {

    const classes = useStyles();

    // Set initial form values
    const [searchValue, setSearchValue] = useState("");
    const [advancedOptions, toggleAdvancedOptions] = useToggle(false);
    const [jobType, setJobType] = useState(INITIAL_JOB_TYPE);
    const [jobDuration, setJobDuration] = useState(INITIAL_JOB_DURATION);

    const handleAdvancedOptionsButtonClick = () => {
        if (advancedOptions) {
            resetAdvancedFields();
        }
        toggleAdvancedOptions();
    };

    const resetAdvancedFields = () => {
        setJobType(INITIAL_JOB_TYPE);
        setJobDuration(INITIAL_JOB_DURATION);
    };

    const submitForm = (e) => {
        // mind the jobType value when passing value to api,
        // because for simple search, the initial jobType value will be undefined,
        // and should be treated as a filter, not a required field, just like jobDuration
        e.preventDefault();

        // TODO: Tinker filters later
        searchOffers({ value: searchValue });

        addSnackbar({
            message: `Search for: ${searchValue} :: Job type: ${jobType || ""} :: Job Duration: ${jobDuration}`,
            options: {
                variant: "info",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
            },
        });

        if (onSubmit) onSubmit();
    };

    const updateJobDuration = (_, val) => {
        setJobDuration(val);
    };

    const updateJobType = (value) => {
        setJobType(value.target.value);
    };

    return (
        <Paper
            className={searchAreaStyle.searchArea}
            elevation={8}
        >
            <form
                onSubmit={submitForm}
                autoComplete="off"
                id={"search_form"}
            >
                <SearchBar
                    className={searchAreaStyle.searchBar}
                    submitSearchForm={submitForm}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <Collapse
                    in={advancedOptions}
                    classes={{ wrapperInner: classes.wrapperInner }}
                >
                    <TextField
                        id="job_type"
                        select
                        label="Job Type"
                        className={searchAreaStyle.jobTypeSelector}
                        value={jobType}
                        onChange={updateJobType}
                        helperText="Please select your job type"
                    >
                        {JOB_TYPES.map(({ value, label }) => (
                            <MenuItem
                                key={value}
                                value={value}
                            >
                                {label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormControl
                        className={searchAreaStyle.durationSlider}
                    >
                        <Typography
                            id="duration-label"
                            variant="body2"
                        >
                            {`Job Duration - ${jobDuration} month(s)`}
                        </Typography>
                        <Slider
                            valueLabelDisplay="auto"
                            value={jobDuration}
                            ValueLabelComponent={SliderValueTooltip}
                            name="jobDuration"
                            min={1}
                            max={12}
                            step={1}
                            onChange={updateJobDuration}
                        />
                    </FormControl>
                </Collapse>
            </form>
            <ShowAdvancedOptionsButton
                onClick={handleAdvancedOptionsButtonClick}
                isOpen={advancedOptions}
            />
        </Paper>
    );
};

SearchArea.propTypes = {
    addSnackbar: PropTypes.func,
    onSubmit: PropTypes.func,
    searchOffers: PropTypes.func.isRequired,
};

export const mapStateToProps = () => ({
});

export const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
    searchOffers: (filters) => dispatch(searchOffers(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchArea);

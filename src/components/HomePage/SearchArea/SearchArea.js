import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { addSnackbar } from "../../../actions/notificationActions";
import { searchOffers } from "../../../actions/nijobsService";
import { setSearchValue, setJobDuration, setJobType, resetAdvancedSearchFields } from "../../../actions/searchOffersActions";
import { INITIAL_JOB_TYPE, INITIAL_JOB_DURATION } from "../../../reducers/searchOffersReducer";

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

import SearchBar from "./SearchBar";
import ShowAdvancedOptionsButton from "./ShowAdvancedOptionsButton";
import SliderValueTooltip from "./SliderValueTooltip";

import useSearchAreaStyles from "./searchAreaStyle";

export const SearchArea = ({ addSnackbar, onSubmit, searchOffers, searchValue, jobDuration, jobType,
    setSearchValue, setJobDuration, setJobType, resetAdvancedSearchFields }) => {

    const classes = useSearchAreaStyles();

    const [advancedOptions, toggleAdvancedOptions] = useToggle(false);

    if (!advancedOptions && (jobType !== INITIAL_JOB_TYPE || jobDuration !== INITIAL_JOB_DURATION))
        toggleAdvancedOptions();

    const handleAdvancedOptionsButtonClick = () => {
        if (advancedOptions) {
            resetAdvancedSearchFields();
        }
        toggleAdvancedOptions();
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

    return (
        <Paper
            className={classes.searchArea}
            elevation={8}
        >
            <form
                onSubmit={submitForm}
                autoComplete="off"
                id={"search_form"}
            >
                <SearchBar
                    className={classes.searchBar}
                    submitSearchForm={submitForm}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <Collapse
                    in={advancedOptions}
                    classes={{ wrapperInner: classes.advancedSearchContainer }}
                >
                    <TextField
                        id="job_type"
                        select
                        label="Job Type"
                        className={classes.jobTypeSelector}
                        value={jobType ? jobType : ""}
                        onChange={setJobType}
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
                        className={classes.durationSlider}
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
                            onChange={setJobDuration}
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
    searchValue: PropTypes.string.isRequired,
    jobDuration: PropTypes.number,
    jobType: PropTypes.object,
    setSearchValue: PropTypes.func.isRequired,
    setJobDuration: PropTypes.func.isRequired,
    setJobType: PropTypes.func.isRequired,
    resetAdvancedSearchFields: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ offerSearch }) => ({
    searchValue: offerSearch.searchValue,
    jobType: offerSearch.jobType,
    jobDuration: offerSearch.jobDuration,
});

export const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
    searchOffers: (filters) => dispatch(searchOffers(filters)),
    setSearchValue: (value) => dispatch(setSearchValue(value)),
    setJobDuration: (_, value) => dispatch(setJobDuration(value)),
    setJobType: (value) => dispatch(setJobType(value)),
    resetAdvancedSearchFields: () => dispatch(resetAdvancedSearchFields()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchArea);

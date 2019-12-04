import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    IconButton,
    Button,
    TextField,
    MenuItem,
    FormControl,
    Typography,
    Slider,
    FormGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControlLabel,
    Switch,
    Collapse,
    Chip } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import SearchBar from "../SearchBar";

import JobTypes from "../JobTypes";
import useSearchAreaStyles from "../searchAreaStyle";
import { INITIAL_JOB_DURATION } from "../../../../reducers/searchOffersReducer";

import Autocomplete from "@material-ui/lab/Autocomplete";


// TODO Needs separating this into other fields component logic
const fields = [
    { label: "Back-End", value: "BACK_END" },
    { label: "Front-End", value: "FRONT_END" },
    { label: "Dev-Ops", value: "DEVOPS" },
    { label: "Machine Learning", value: "ML" },
    { label: "Computer Vision", value: "COMPUTER_VISION" },
];

const AdvancedSearchMobile = ({ open, close, searchValue, submitForm, showJobDurationSlider, toggleShowJobDurationSlider,
    jobDuration, jobType, setSearchValue, setJobType, setJobDuration, resetAdvancedSearch }) => {

    const [shouldSubmitForm, setShouldSubmitForm] = useState(true);
    const [minJobDuration, maxJobDuration] = jobDuration;

    const handleResetClick = (e) => {
        e.preventDefault();
        setSearchValue("");
        resetAdvancedSearch();
    };
    const handleSearchClick = (e) => {
        e.preventDefault();
        close();
    };

    const handleCloseClick = (e) => {
        setShouldSubmitForm(false);
        handleResetClick(e);
        close();
    };

    const classes = useSearchAreaStyles();

    return (
        <Dialog
            fullScreen open={open}
            onEnter={() => setShouldSubmitForm(true)}
            onExited={() => {
                if (shouldSubmitForm)
                    submitForm();
            }}
        >
            <DialogTitle>
                <IconButton
                    aria-label="search"
                    onClick={handleCloseClick}
                    color="secondary"
                >
                    <ArrowBackIos />
                </IconButton>
                Advanced Search
            </DialogTitle>
            <DialogContent>
                <FormGroup>
                    <SearchBar
                        onEnterPress={handleSearchClick}
                        className={classes.searchBar}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        hideInputAdornment
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
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={fields.map((option) => option.label)}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    style={{ marginBottom: "1em" }}
                                    key={option}
                                    variant="outlined"
                                    label={option}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Fields"
                                placeholder="Fields"
                                margin="none"
                                fullWidth
                            />
                        )}
                    />
                    <FormControlLabel
                        control={
                            <Switch checked={showJobDurationSlider} onChange={toggleShowJobDurationSlider} value="useJobDuration"/>
                        }
                        label="Filter Job Duration"
                    />
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
                </FormGroup>
            </DialogContent>
            <DialogActions
                classes={{
                    root: classes.mobileAdvancedSearchActions,
                }}
            >
                <Button color="secondary" onClick={handleResetClick}>Reset</Button>
                <Button variant="contained" color="primary" onClick={handleSearchClick}>Search</Button>
            </DialogActions>
        </Dialog>
    );
};

AdvancedSearchMobile.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
};

export default AdvancedSearchMobile;

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
    DialogActions } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import SearchBar from "./SearchBar";

import JobTypes from "./JobTypes";
import useSearchAreaStyles from "./searchAreaStyle";

const AdvancedSearchMobile = ({ open, close, searchValue, submitForm,
    jobDuration, jobType, setSearchValue, setJobType, setJobDuration, resetAdvancedSearchFields }) => {

    const [shouldSubmitForm, setShouldSubmitForm] = useState(true);

    const handleResetClick = (e) => {
        e.preventDefault();
        resetAdvancedSearchFields();
    };
    const handleSearchClick = (e) => {
        e.preventDefault();
        close();
    };

    const handleCloseClick = (e) => {
        e.preventDefault();
        setShouldSubmitForm(false);
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
                    <FormControl
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
                            {`Job Duration - ${jobDuration} month(s)`}
                        </Typography>
                    </FormControl>
                </FormGroup>
            </DialogContent>
            <DialogActions>
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

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addSnackbar } from '../../../actions/notificationActions';

import JOB_TYPES from './jobTypes';

import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';

import { makeStyles } from '@material-ui/styles';
import searchAreaStyle from "./SearchArea.module.css";

import SearchBar from "./SearchBar";
import ShowAdvancedOptionsButton from './ShowAdvancedOptionsButton';
import SliderValueTooltip from './SliderValueTooltip';

const INITIAL_JOB_TYPE = "";
const INITIAL_JOB_DURATION = 1;

const useStyles = makeStyles({
    wrapperInner: {
        display: "grid",
        "grid-template-columns": "1fr 1fr",
        "grid-template-rows": "1fr",
        "align-items": "center",
        "grid-gap": "1em",
    }
});

function SearchArea(props) {

    const {addSnackbar, onSubmit} = props;
    const classes = useStyles();
    
    // Set initial form values
    const [searchValue, setSearchValue] = React.useState("");
    const [advancedSearch, setAdvancedSearch] = React.useState(false);
    const [jobType, setJobType] = React.useState(INITIAL_JOB_TYPE);
    const [jobDuration, setJobDuration] = React.useState(INITIAL_JOB_DURATION);
    
    const toggleAdvancedOptions = () => {
        if(advancedSearch) {
            resetAdvancedFields();
        }
        setAdvancedSearch(!advancedSearch);
    };

    const resetAdvancedFields = () => {
        setJobType(INITIAL_JOB_TYPE);
        setJobDuration(INITIAL_JOB_DURATION);
    };

    const submitForm = e => {
        e.preventDefault();

        addSnackbar({
            //mind the jobType.value || '' when passing value to api,
            //because for simple search, the initial jobType value will be an empty string, which has no atrribute .value
            message: `Search for: ${searchValue} :: Job type: ${jobType || ''} :: Job Duration: ${jobDuration}`,
            options: {
                variant: 'info',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            }
        });

        onSubmit();
    };

    const updateSearchValue = newVal => {
        setSearchValue(newVal);
    };
    
    const updateJobDuration = (_, val) => {
        setJobDuration(val);
    };

    const updateJobType = value => {
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
            >
                <SearchBar
                    className={searchAreaStyle.searchBar}
                    submitSearchForm={submitForm}
                    searchValue={searchValue}
                    updateSearchValue={updateSearchValue}
                />
                <Collapse 
                    in={advancedSearch}
                    classes={{
                        wrapperInner: classes.wrapperInner
                    }}    
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
                        {JOB_TYPES.map(({value, label}) => (
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
                            Job Duration
                        </Typography>
                        <Slider
                            valueLabelDisplay="auto"
                            value={jobDuration}
                            ValueLabelComponent={SliderValueTooltip}
                            name='jobDuration'
                            min={1}
                            max={12}
                            step={1}
                            onChange={updateJobDuration}
                        />
                    </FormControl>
                </Collapse>
            </form>
            <ShowAdvancedOptionsButton
                onClick={toggleAdvancedOptions}
                open={advancedSearch}
            />
        </Paper>
    );
}

SearchArea.propTypes = {
    addSnackbar: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
});

const mapActionsToProps = {addSnackbar};

export default connect(mapStateToProps, mapActionsToProps)(SearchArea);
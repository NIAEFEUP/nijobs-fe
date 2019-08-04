import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addSnackbar } from '../../actions/notificationActions';

import JOB_TYPES from './jobTypes';

import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';

import { makeStyles } from '@material-ui/styles';
import searchAreaStyle from "./SearchArea.module.css";

import SearchBar from "./SearchBar";

const INITIAL_JOB_TYPE = "";
const INITIAL_JOB_DURATION = 1;

const ShowAdvancedOptions = ({open, onClick}) => {
    return (
        <div className={searchAreaStyle.advancedSearchBtnWrapper}>
            <Fab
                color="primary"
                aria-label="Show More Options"
                onClick={onClick}
            >
                <Icon
                    fontSize="large"
                >
                    {open ? "keyboard_arrow_up" : "more_horiz"}
                </Icon>
            </Fab>
        </div>
    );
};

ShowAdvancedOptions.propTypes = {
    onClick: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    const popperRef = React.useRef(null);
    React.useEffect(() => {
        if (popperRef.current) {
            popperRef.current.update();
        }
    });
  
    return (
        <Tooltip
            PopperProps={{
                popperRef,
            }}
            open={open}
            enterTouchDelay={0}
            placement="bottom"
            title={value}
        >
            {children}
        </Tooltip>
    );
}
  
ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

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

        props.addSnackbar({
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

                {/* <AutoComplete
                    className={searchAreaStyle.tagSelector}
                    label='Tags'
                    name='tags'
                    value={state.tags}
                    handleChange={updateMultipleSelector('tags')}
                    isMulti
                    suggestions={suggestions}
                /> */}

                <Collapse 
                    in={advancedSearch}
                    classes={{
                        wrapperInner: classes.wrapperInner
                    }}    
                >
                    <React.Fragment>

                        {/* <AutoComplete 
                            className={searchAreaStyle.jobTypeSelector}
                            label='Job Type'
                            name='jobType'
                            value={state.jobType}
                            suggestions={JOB_TYPES}
                            handleChange={updateSelector('jobType')}
                        /> */}
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
                                ValueLabelComponent={ValueLabelComponent}
                                name='jobDuration'
                                min={1}
                                max={12}
                                step={1}
                                onChange={updateJobDuration}
                            />
                        </FormControl>
                    </React.Fragment>
                </Collapse>
        
                
            </form>
            <ShowAdvancedOptions
                onClick={toggleAdvancedOptions}
                open={advancedSearch}
            />
            
        </Paper>
    );
}

SearchArea.propTypes = {
    addSnackbar: PropTypes.func
};

const mapStateToProps = () => ({
});

const mapActionsToProps = {addSnackbar};

export default connect(mapStateToProps, mapActionsToProps)(SearchArea);
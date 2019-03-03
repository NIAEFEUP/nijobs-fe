import React, { Component } from 'react';
import searchAreaStyle from "./SearchArea.module.css";
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addSnackbar } from '../../actions/notificationActions';

// import LabeledSwitch from '../utils/LabeledSwitch';
import StepSlider from '../utils/StepSlider';

import SearchBar from "./SearchBar";

import JOB_TYPES from './jobTypes';
import AutoComplete from '../utils/AutoComplete';


import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';

const INITIAL_JOB_TYPE = "";
const INITIAL_JOB_DURATION = 1;

//just for testing -> In the future get option list from api in <CDM>
const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));

const SubmitSearchButton = ({submitSearch, className}) => {
    return (
        <FormControl
            className={className}
        >
            <Button
                variant="outlined"
                color="primary"
                onClick={submitSearch}
            >
                Search
            </Button>
        </FormControl>
    );
};

SubmitSearchButton.propTypes = {
    submitSearch: PropTypes.func.isRequired,
    className: PropTypes.string
};

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
                    {open ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                </Icon>
            </Fab>
        </div>
    );
};

ShowAdvancedOptions.propTypes = {
    onClick: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

class SearchArea extends Component {

    static propTypes = {
        addSnackbar: PropTypes.func
    }

    constructor(props) {
        super(props);

        // Set initial form values
        this.state = {
            searchValue: "",
            advancedSearch: false,
            jobType: INITIAL_JOB_TYPE,
            jobDuration: INITIAL_JOB_DURATION,
            tags: []
        };
    }

    
    toggleAdvancedOptions = () => {

        if(this.state.advancedSearch) {
            this.resetAdvancedFields();
        }

        this.setState(prevState => ({
            advancedSearch: !prevState.advancedSearch
        }));
    }

    resetAdvancedFields = () => {
        this.setState({
            jobType: INITIAL_JOB_TYPE,
            jobDuration: INITIAL_JOB_DURATION,
        });
    }

    render() {
        return (
            <Paper 
                className={searchAreaStyle.searchArea}
                elevation={8}
            >
                <form
                    onSubmit={this.submitForm}
                    autoComplete="off"
                >
                    <SearchBar
                        className={searchAreaStyle.searchBar}
                        submitSearchForm={this.submitForm}
                        searchValue={this.state.searchValue}
                        updateSearchValue={this.updateSearchValue}
                    />

                    <AutoComplete
                        className={searchAreaStyle.tagSelector}
                        label='Tags'
                        name='tags'
                        value={this.state.tags}
                        handleChange={this.updateMultipleSelector('tags')}
                        isMulti
                        suggestions={suggestions}
                    />

                    <SubmitSearchButton
                        submitSearch={this.submitForm}
                        className={searchAreaStyle.submitBtn}
                    />


                    {this.state.advancedSearch ? 
                        <React.Fragment>
                            {/* <LabeledSwitch
                                label='Advanced'
                                name='advancedSearch'
                                value={this.state.advancedSearch}
                                handleChange={this.updateSwitch('advancedSearch')}
                            /> */}

                            <AutoComplete 
                                className={searchAreaStyle.jobTypeSelector}
                                label='Job Type'
                                name='jobType'
                                value={this.state.jobType}
                                suggestions={JOB_TYPES}
                                handleChange={this.updateSelector('jobType')}
                            />
                            <StepSlider 
                                className={searchAreaStyle.durationSlider}
                                value={this.state.jobDuration}
                                name='jobDuration'
                                min={1}
                                max={12}
                                step={1}
                                label='Duration (Months)'
                                handleChange={this.updateSlider('jobDuration')}
                            />
                        </React.Fragment>
                        : null
                    }
         
                    
                </form>
                <ShowAdvancedOptions
                    onClick={this.toggleAdvancedOptions}
                    open={this.state.advancedSearch}
                />
                
            </Paper>
        );
    }

    submitForm = e => {
        e.preventDefault();
        
        const { searchValue, jobType, jobDuration, tags} = this.state;

        const tagsList = tags.map(tag => tag.value);

        this.props.addSnackbar({
            //mind the jobType.value || '' when passing value to api,
            //because for simple search, the initial jobType value will be an empty string, which has no atrribute .value
            message: `Search for: ${searchValue} :: Job type: ${jobType.value || ''} :: Job Duration: ${jobDuration} :: Tags: ${tagsList.join(', ')}`,
            options: {
                variant: 'info',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            }
        });
    }

    updateSearchValue = newVal => {
        this.setState({
            searchValue: newVal
        });
    }

    updateSwitch = name => event => {
        
        this.setState({
            [name]: event.target.checked
        });
    }
    
    updateSelector = name => value => {
        
        this.setState({
            [name]: value
        });
    }

    updateMultipleSelector = name => newValues => {
        
        this.setState({
            [name]: newValues
        });
    }

    updateSlider = name => (event, value) => {
        
        this.setState({
            [name]: value
        });
    }

    
}

const mapStateToProps = () => ({
});

const mapActionsToProps = {addSnackbar};

export default connect(mapStateToProps, mapActionsToProps)(SearchArea);
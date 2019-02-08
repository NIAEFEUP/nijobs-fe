import React, { Component } from 'react';
import searchAreaStyle from "./SearchArea.module.css";
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addSnackbar } from '../../actions/notificationActions';

import LabeledSwitch from '../utils/LabeledSwitch';
import StepSlider from '../utils/StepSlider';

import SearchBar from "./SearchBar";
import OutlinedSelector from '../utils/OutlinedSelector';
// import TagSelector from './TagSelector';

import JOB_TYPES from './jobTypes';
import AutoComplete from './AutoComplete';

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
            jobType: "",
            jobDuration: 1,
            // tags: []
        };
    }
    
    render() {
        return (
            <div className={searchAreaStyle.searchArea}>
                <form
                    onSubmit={this.submitForm}
                    autoComplete="off"
                >
                    <SearchBar 
                        submitSearchForm={this.submitForm}
                        searchValue={this.state.searchValue}
                        updateSearchValue={this.updateSearchValue}
                    />
                    <AutoComplete
                        label='Tags'
                    />

                    <LabeledSwitch
                        label='Advanced Search'
                        name='advancedSearch'
                        value={this.state.advancedSearch}
                        handleChange={this.updateSwitch('advancedSearch')}
                    />

                    <OutlinedSelector 
                        label='Job Type'
                        name='jobType'
                        value={this.state.jobType}
                        options={JOB_TYPES}
                        handleChange={this.updateSelector('jobType')}
                    />
                    <StepSlider 
                        value={this.state.jobDuration}
                        name='jobDuration'
                        min={1}
                        max={12}
                        step={1}
                        label='Job Duration (Months)'
                        handleChange={this.updateSlider('jobDuration')}
                    />
                    
                </form>
            </div>
        );
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
    
    updateSelector = name => event => {
        
        this.setState({
            [name]: event.target.value
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

    submitForm = e => {
        e.preventDefault();

        const { searchValue, jobType, jobDuration} = this.state;
        this.props.addSnackbar({
            message: `Search for: ${searchValue} :: Job type: ${jobType} :: Job Duration: ${jobDuration}`,
            options: {
                variant: 'info',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            }
        });
    }
}

const mapStateToProps = () => ({
});

const mapActionsToProps = {addSnackbar};

export default connect(mapStateToProps, mapActionsToProps)(SearchArea);
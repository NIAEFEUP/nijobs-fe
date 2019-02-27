import React, { Component } from 'react';
import searchAreaStyle from "./SearchArea.module.css";
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addSnackbar } from '../../actions/notificationActions';

import LabeledSwitch from '../utils/LabeledSwitch';
import StepSlider from '../utils/StepSlider';

import SearchBar from "./SearchBar";
import OutlinedSelector from '../utils/OutlinedSelector';

import JOB_TYPES from './jobTypes';
import AutoComplete from '../utils/AutoComplete';


import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ShowMoreButton from './ShowMoreButton';


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
            tags: []
        };
    }
    
    toggleAdvancedOptions = () => {
        this.setState(prevState => ({
            advancedSearch: !prevState.advancedSearch
        }));
    }

    render() {
        return (
            <div className={searchAreaStyle.searchArea}>
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
                        suggestions={suggestions}
                    />

                    <SubmitSearchButton
                        submitSearch={this.submitForm}
                        className={searchAreaStyle.submitBtn}
                    />

                    


                    {this.state.advancedSearch ? 
                        <React.Fragment>
                            <LabeledSwitch
                                label='Advanced'
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
                                label='Duration (Months)'
                                handleChange={this.updateSlider('jobDuration')}
                            />
                        </React.Fragment>
                        : null
                    }
                    

                    

                    
                    
                </form>
                <ShowMoreButton 
                    onClick={this.toggleAdvancedOptions}
                    className={searchAreaStyle.advancedSearchBtn}
                />
            </div>
        );
    }

    submitForm = e => {
        e.preventDefault();
        
        const { searchValue, jobType, jobDuration, tags} = this.state;

        const tagsList = tags.map(tag => tag.value);

        this.props.addSnackbar({
            message: `Search for: ${searchValue} :: Job type: ${jobType} :: Job Duration: ${jobDuration} :: Tags: ${tagsList.join(', ')}`,
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

    
}

const mapStateToProps = () => ({
});

const mapActionsToProps = {addSnackbar};

export default connect(mapStateToProps, mapActionsToProps)(SearchArea);
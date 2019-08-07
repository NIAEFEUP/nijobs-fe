import React from 'react';
import PropTypes from 'prop-types';

import {
    TextField,
    InputAdornment,
    IconButton,
} from '@material-ui/core';

import {Search} from '@material-ui/icons';

function SearchBar(props) {

    const {searchValue, setSearchValue, className, submitSearchForm} = props;
    
    const handleChange = e => {
        setSearchValue(e.target.value);
    };

    const handleButtonClick = e => {
        e.preventDefault();
        submitSearchForm(e);
    };

    return (
        <TextField
            label="Search"
            name="search"
            margin="dense"
            value={searchValue}
            onChange={handleChange}
            className={className}
            InputProps={{
                "endAdornment": 
    <InputAdornment position="end">
        <IconButton
            aria-label="search"
            onClick={handleButtonClick}
            color="secondary"
        >
            <Search />
        </IconButton>
    </InputAdornment>
                  
            }}
        />
    );
}

SearchBar.propTypes = {
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    className: PropTypes.string,
    submitSearchForm: PropTypes.func.isRequired
};

export default SearchBar;


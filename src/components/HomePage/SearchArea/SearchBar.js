import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';

function SearchBar(props) {

    const {searchValue, updateSearchValue, className, submitSearchForm} = props;
    
    const handleChange = e => {
        updateSearchValue(e.target.value);
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
    updateSearchValue: PropTypes.func.isRequired,
    className: PropTypes.string,
    submitSearchForm: PropTypes.func.isRequired
};

export default SearchBar;


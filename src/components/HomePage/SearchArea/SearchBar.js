import React from "react";
import PropTypes from "prop-types";

import {
    TextField,
    InputAdornment,
    IconButton,
} from "@material-ui/core";

import { Search } from "@material-ui/icons";

const SearchBar = ({ searchValue, setSearchValue, className, submitSearchForm, hideInputAdornment, onEnterPress }) => {

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        submitSearchForm(e);
    };

    const handleEnterPressSearchBar = (e) => {
        if (e.key === "Enter") onEnterPress(e);
    };

    return (
        <TextField
            label="Search"
            name="search"
            margin="dense"
            value={searchValue}
            onChange={handleChange}
            className={className}
            InputProps={!hideInputAdornment ? ({
                "endAdornment":
                <InputAdornment position="end">
                    <IconButton
                        aria-label="search"
                        onClick={handleButtonClick}
                        color="secondary"
                        size="small"
                    >
                        <Search />
                    </IconButton>
                </InputAdornment>,
            }) : ({})}
            inputProps={{
                onKeyPress: handleEnterPressSearchBar,
            }}
        />
    );
};

SearchBar.propTypes = {
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    className: PropTypes.string,
    submitSearchForm: PropTypes.func,
    onEnterPress: PropTypes.func,
    hideInputAdornment: PropTypes.bool,
};

export default SearchBar;

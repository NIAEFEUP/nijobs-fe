import React from "react";
import PropTypes from "prop-types";

import {
    TextField,
} from "@material-ui/core";


const SearchBar = ({ searchValue, setSearchValue, className, onEnterPress }) => {

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleEnterPress = (e) => {
        if (e.key === "Enter") onEnterPress(e);
    };

    return (
        <TextField
            id="search_bar"
            label="Search"
            name="search"
            margin="dense"
            value={searchValue}
            onChange={handleChange}
            className={className}
            inputProps={onEnterPress ? ({
                onKeyPress: handleEnterPress,
            }) : ({})}
        />

    );
};

SearchBar.propTypes = {
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    className: PropTypes.string,
    onEnterPress: PropTypes.func,
};

export default SearchBar;

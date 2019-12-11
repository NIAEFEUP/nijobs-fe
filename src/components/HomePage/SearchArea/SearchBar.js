import React from "react";
import PropTypes from "prop-types";

import {
    TextField,
    InputAdornment,
    IconButton,
} from "@material-ui/core";

import { Close, MoreHoriz } from "@material-ui/icons";

const SearchBar = ({ searchValue, setSearchValue, className,
    handleAdvancedOptionsButtonClick, advancedOptions, hideInputAdornment, onEnterPress }) => {

    const handleChange = (e) => {
        setSearchValue(e.target.value);
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
                        size="small"
                        aria-label="Toggle Advanced Search"
                        onClick={handleAdvancedOptionsButtonClick}
                        color="secondary"
                    >
                        {advancedOptions ? <Close data-icon="Close" fontSize="small"/> : <MoreHoriz data-icon="MoreHoriz"/>}
                    </IconButton>
                </InputAdornment>,
            }) : ({})}
            inputProps={onEnterPress ? ({
                onKeyPress: handleEnterPressSearchBar,
            }) : ({})}
        />
    );
};

SearchBar.propTypes = {
    searchValue: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    className: PropTypes.string,
    handleAdvancedOptionsButtonClick: PropTypes.func.isRequired,
    advancedOptions: PropTypes.bool.isRequired,
    onEnterPress: PropTypes.func,
    hideInputAdornment: PropTypes.bool,
};

export default SearchBar;

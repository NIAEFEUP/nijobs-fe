import React from "react";
import PropTypes from "prop-types";

import {
    TextField,
    InputAdornment,
    IconButton,
    Badge,
    Tooltip,
} from "@material-ui/core";

import { FilterList } from "@material-ui/icons";

import useSearchAreaStyles from "./searchAreaStyle";
import clsx from "clsx";


const SearchBar = ({ searchValue, setSearchValue, className,
    handleAdvancedOptionsButtonClick, advancedOptions, advancedOptionsActive, hideInputAdornment, onEnterPress }) => {

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleEnterPressSearchBar = (e) => {
        if (e.key === "Enter") onEnterPress(e);
    };

    const classes = useSearchAreaStyles();
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
                        <Badge color="secondary" variant="dot" invisible={!advancedOptionsActive}>
                            <Tooltip
                                title={advancedOptions ? "Hide Advanced Search" : "Show Advanced Search" }
                                placement="top"
                            >
                                <FilterList
                                    className={clsx(
                                        classes.advancedSearchToggle,
                                        {
                                            [classes.advancedSearchToggleOpen]: advancedOptions,
                                        }
                                    )}
                                    data-icon="FilterList"
                                />
                            </Tooltip>
                            {/* {advancedOptions ?
                                <Tooltip title="Hide Advanced Search" placement="top">
                                    <Close data-icon="Close" fontSize="small"/>
                                </Tooltip>
                                :
                                <Tooltip title="Show Advanced Search" placement="top">
                                    <FilterList data-icon="FilterList"/>
                                </Tooltip>
                            } */}
                        </Badge>
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

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    IconButton,
    Button,
    TextField,
    MenuItem,
    FormControl,
    Slider,
    FormGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControlLabel,
    Switch,
    Collapse,
    FormHelperText,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import SearchBar from "../SearchBar";
import MultiOptionAutocomplete from "./MultiOptionAutocomplete/MultiOptionAutocomplete";

import JobTypes from "../JobTypes";
import useSearchAreaStyles from "../searchAreaStyle";


// const MAX_FIELDS_CHIP = 3;


const AdvancedSearchMobile = ({ open, close, searchValue, submitForm,
    setSearchValue, FieldsSelectorProps, TechsSelectorProps, resetAdvancedSearch, JobDurationSliderText,
    JobTypeSelectorProps, JobDurationSwitchProps, JobDurationCollapseProps, JobDurationSwitchLabel, JobDurationSliderProps,
}) => {

    const [shouldSubmitForm, setShouldSubmitForm] = useState(true);

    const handleResetClick = (e) => {
        e.preventDefault();
        setSearchValue("");

        resetAdvancedSearch();
    };
    const handleSearchClick = (e) => {
        e.preventDefault();
        close();
    };

    const handleCloseClick = () => {
        setShouldSubmitForm(false);
        close();
    };

    const classes = useSearchAreaStyles();

    return (
        <Dialog
            fullScreen open={open}
            onEnter={() => setShouldSubmitForm(true)}
            onExited={() => {
                if (shouldSubmitForm)
                    submitForm();
            }}
        >
            <DialogTitle>
                <IconButton
                    aria-label="search"
                    onClick={handleCloseClick}
                    color="secondary"
                >
                    <ArrowBackIos />
                </IconButton>
                Advanced Search
            </DialogTitle>
            <DialogContent>
                <FormGroup>
                    <SearchBar
                        onEnterPress={handleSearchClick}
                        className={classes.searchBar}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        hideInputAdornment
                    />
                    <TextField
                        className={classes.jobTypeSelector}
                        {...JobTypeSelectorProps}
                    >
                        {JobTypes.map(({ value, label }) => (
                            <MenuItem
                                key={value}
                                value={value}
                            >
                                {label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <MultiOptionAutocomplete
                        {...FieldsSelectorProps}
                    />
                    <MultiOptionAutocomplete
                        {...TechsSelectorProps}
                        // threshold={MAX_FIELDS_CHIP}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                margin="normal"
                                {...JobDurationSwitchProps}
                            />
                        }
                        label={JobDurationSwitchLabel}
                    />
                    <Collapse
                        classes={{ wrapperInner: classes.mobileAdvancedSearchJobDuration }}
                        {...JobDurationCollapseProps}
                    >
                        <FormControl
                            fullWidth
                            className={classes.durationSlider}
                        >
                            <Slider
                                margin="normal"
                                {...JobDurationSliderProps}
                            />
                            <FormHelperText>
                                {JobDurationSliderText}
                            </FormHelperText>
                        </FormControl>
                    </Collapse>
                </FormGroup>
            </DialogContent>
            <DialogActions
                classes={{
                    root: classes.mobileAdvancedSearchActions,
                }}
            >
                <Button color="secondary" onClick={handleResetClick}>Reset</Button>
                <Button variant="contained" color="primary" onClick={handleSearchClick}>Search</Button>
            </DialogActions>
        </Dialog>
    );
};

AdvancedSearchMobile.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
};

export default AdvancedSearchMobile;

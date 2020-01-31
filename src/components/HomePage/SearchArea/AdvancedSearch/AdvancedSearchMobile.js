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
    setSearchValue, FieldsSelectorProps, TechsSelectorProps, resetAdvancedSearch, JobDurationSliderText, ResetButtonProps,
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

    const handleExit = () => shouldSubmitForm && submitForm();

    const classes = useSearchAreaStyles();

    return (
        <Dialog
            fullScreen
            open={open}
            onEnter={() => setShouldSubmitForm(true)}
            onExited={handleExit}
        >
            <DialogTitle>
                <IconButton
                    aria-label="back"
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
                        _id="fields_selector"
                    />
                    <MultiOptionAutocomplete
                        {...TechsSelectorProps}
                        _id="techs_selector"
                        // threshold={MAX_FIELDS_CHIP}
                    />
                    <FormControlLabel
                        className={classes.jobDurationSliderToggleMobile}
                        control={
                            <Switch {...JobDurationSwitchProps}/>
                        }
                        label={JobDurationSwitchLabel}
                    />
                    <Collapse
                        {...JobDurationCollapseProps}
                    >
                        <FormControl
                            fullWidth
                            className={classes.durationSlider}
                        >
                            <Slider {...JobDurationSliderProps}/>
                            <FormHelperText>
                                {JobDurationSliderText}
                            </FormHelperText>
                        </FormControl>
                    </Collapse>
                </FormGroup>
            </DialogContent>
            <DialogActions classes={{ root: classes.mobileAdvancedSearchActions  }}>
                <Button
                    {...ResetButtonProps}
                    _id="reset_btn"
                    color="secondary"
                    onClick={handleResetClick}
                >
                    Reset
                </Button>
                <Button
                    _id="search_btn"
                    variant="contained"
                    color="primary"
                    onClick={handleSearchClick}
                >
                       Search
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AdvancedSearchMobile.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
    submitForm: PropTypes.func.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    resetAdvancedSearch: PropTypes.func.isRequired,
    FieldsSelectorProps: PropTypes.object.isRequired,
    TechsSelectorProps: PropTypes.object.isRequired,
    JobTypeSelectorProps: PropTypes.object.isRequired,
    JobDurationSwitchProps: PropTypes.object.isRequired,
    ResetButtonProps: PropTypes.object.isRequired,
    JobDurationSliderText: PropTypes.string.isRequired,
    JobDurationCollapseProps: PropTypes.object.isRequired,
    JobDurationSwitchLabel: PropTypes.string.isRequired,
    JobDurationSliderProps: PropTypes.object.isRequired,
};

export default AdvancedSearchMobile;

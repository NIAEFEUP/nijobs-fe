import React, { useContext, useState } from "react";
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
import { NavigateBefore } from "@material-ui/icons";
import SearchBar from "../SearchBar";
import MultiOptionAutocomplete from "../../../utils/form/MultiOptionAutocomplete";

import JobOptions from "../../../utils/offers/JobOptions";
import useSearchAreaStyles from "../searchAreaStyle";
import { AdvancedSearchControllerContext } from "../SearchArea";
import useSession from "../../../../hooks/useSession";

const JobDurationCollapse = ({ className, JobDurationCollapseProps, JobDurationSliderProps, sliderText }) => (
    <Collapse
        {...JobDurationCollapseProps}
        className={className}
    >
        <FormControl fullWidth>
            <Slider {...JobDurationSliderProps} />
            <FormHelperText>
                {sliderText}
            </FormHelperText>
        </FormControl>
    </Collapse>
);

JobDurationCollapse.propTypes = {
    className: PropTypes.string,
    JobDurationCollapseProps: PropTypes.object.isRequired,
    JobDurationSliderProps: PropTypes.object.isRequired,
    sliderText: PropTypes.string.isRequired,
};

const JobTypeSelector = ({ className, JobTypeSelectorProps }) => (
    <TextField
        className={className}
        {...JobTypeSelectorProps}
    >
        {JobOptions.map(({ value, label }) => (
            <MenuItem
                key={value}
                value={value}
            >
                {label}
            </MenuItem>
        ))}
    </TextField>
);

JobTypeSelector.propTypes = {
    className: PropTypes.string,
    JobTypeSelectorProps: PropTypes.object.isRequired,
};

const AdvancedSearchMobile = () => {

    const [shouldSubmitForm, setShouldSubmitForm] = useState(true);

    const { advancedOptions, toggleAdvancedOptions, searchValue, submitForm,
        setSearchValue, FieldsSelectorProps, TechsSelectorProps, resetAdvancedSearch, JobDurationSliderText, ResetButtonProps,
        JobTypeSelectorProps, JobDurationSwitchProps, JobDurationCollapseProps, JobDurationSwitchLabel, ShowHiddenSwitchLabel,
        JobDurationSliderProps, onMobileClose, ShowHiddenSwitchProps,
    } = useContext(AdvancedSearchControllerContext);

    const handleResetClick = (e) => {
        e.preventDefault();
        setSearchValue("");

        resetAdvancedSearch();
    };
    const handleSearchClick = (e) => {
        e.preventDefault();
        toggleAdvancedOptions();
    };

    const handleCloseClick = () => {
        setShouldSubmitForm(false);
        toggleAdvancedOptions();
    };

    const handleExit = () => {
        if (shouldSubmitForm) submitForm();
        if (onMobileClose) onMobileClose();
    };

    const { data,
        isValidating,
        error,
        isLoggedIn,
    } = useSession();
    const sessionData = (!isValidating && !error && isLoggedIn) ? data : null;

    const classes = useSearchAreaStyles();

    return (
        <Dialog
            fullScreen
            open={advancedOptions}
            onEnter={() => setShouldSubmitForm(true)}
            onExited={handleExit}
        >
            <DialogTitle>
                <IconButton
                    aria-label="back"
                    onClick={handleCloseClick}
                    color="secondary"
                >
                    <NavigateBefore />
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
                    <JobTypeSelector
                        JobTypeSelectorProps={JobTypeSelectorProps}
                    />
                    <MultiOptionAutocomplete
                        {...FieldsSelectorProps}
                        _id="fields_selector"
                    />
                    <MultiOptionAutocomplete
                        {...TechsSelectorProps}
                        _id="techs_selector"
                    />
                    <FormControlLabel
                        className={classes.jobDurationSliderToggleMobile}
                        control={
                            <Switch {...JobDurationSwitchProps} />
                        }
                        label={JobDurationSwitchLabel}
                    />
                    <JobDurationCollapse
                        className={classes.jobDurationSliderCollapse}
                        JobDurationCollapseProps={JobDurationCollapseProps}
                        JobDurationSliderProps={JobDurationSliderProps}
                        sliderText={JobDurationSliderText}
                    />
                    {sessionData?.isAdmin &&
                    <FormControlLabel
                        className={classes.showHiddenToggle}
                        control={<Switch {...ShowHiddenSwitchProps} />}
                        label={ShowHiddenSwitchLabel}
                    />
                    }
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
    searchValue: PropTypes.string,
    submitForm: PropTypes.func,
    setSearchValue: PropTypes.func,
    resetAdvancedSearch: PropTypes.func,
    FieldsSelectorProps: PropTypes.object,
    TechsSelectorProps: PropTypes.object,
    JobTypeSelectorProps: PropTypes.object,
    JobDurationSwitchProps: PropTypes.object,
    ResetButtonProps: PropTypes.object,
    JobDurationSliderText: PropTypes.string,
    JobDurationCollapseProps: PropTypes.object,
    JobDurationSwitchLabel: PropTypes.string,
    JobDurationSliderProps: PropTypes.object,
    onMobileClose: PropTypes.func,
    ShowHiddenSwitchProps: PropTypes.object,
    ShowHiddenSwitchLabel: PropTypes.string,
};

export default AdvancedSearchMobile;

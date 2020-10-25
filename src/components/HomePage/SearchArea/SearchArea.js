import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { searchOffers } from "../../../services/offerSearchService";
import {
    setSearchValue,
    setJobDuration,
    setJobType,
    resetAdvancedSearchFields,
    setFields,
    setShowJobDurationSlider,
    setTechs,
} from "../../../actions/searchOffersActions";
import { INITIAL_JOB_TYPE, INITIAL_JOB_DURATION } from "../../../reducers/searchOffersReducer";

import { Paper } from "@material-ui/core";
import SearchBar from "./SearchBar";
import SubmitSearchButton from "./SubmitSearchButton";

import useSearchAreaStyles from "./searchAreaStyle";
import { useMobile } from "../../../utils/media-queries";
import useAdvancedSearch from "./AdvancedSearch/useAdvancedSearch";
import AbstractAdvancedSearch from "./AdvancedSearch/AbstractAdvancedSearch";
import AdvancedOptionsToggle from "./AdvancedOptionsToggle";

export const SearchArea = ({ onSubmit, searchOffers, searchValue,
    minJobDuration = INITIAL_JOB_DURATION, maxJobDuration = INITIAL_JOB_DURATION + 1, jobType = INITIAL_JOB_TYPE,
    fields, techs, showJobDurationSlider, setShowJobDurationSlider,
    setSearchValue, setJobDuration, setJobType, setFields, setTechs, resetAdvancedSearchFields }) => {

    const classes = useSearchAreaStyles();

    const toggleShowJobDurationSlider = () => setShowJobDurationSlider(!showJobDurationSlider);

    const {
        advancedOptions,
        advancedOptionsActive,
        toggleAdvancedOptions,
        resetAdvancedSearch,
        JobTypeSelectorProps,
        FieldsSelectorProps,
        TechsSelectorProps,
        JobDurationSwitchProps,
        JobDurationCollapseProps,
        JobDurationSwitchLabel,
        JobDurationSliderProps,
        JobDurationSliderText,
        ResetButtonProps,
    } = useAdvancedSearch({
        minJobDuration,
        maxJobDuration,
        setJobDuration,
        showJobDurationSlider,
        toggleShowJobDurationSlider,
        jobType,
        setJobType,
        fields,
        setFields,
        techs,
        setTechs,
        resetAdvancedSearchFields,
    });

    const submitForm = (e) => {
        // mind the jobType value when passing value to api,
        // because for simple search, the initial jobType value will be undefined,
        // and should be treated as a filter, not a required field, just like jobDuration
        if (e) e.preventDefault();

        // console.log("SEARCH SUBMITTED:");
        // console.log(searchValue, minJobDuration, maxJobDuration, jobType, fields);

        // TODO: Tinker filters later
        searchOffers({ value: searchValue });

        if (onSubmit) onSubmit();
    };

    return (
        <Paper
            className={classes.searchArea}
            elevation={8}
        >
            <form
                onSubmit={submitForm}
                autoComplete="off"
                id={"search_form"}
            >
                <SearchBar
                    className={classes.searchBar}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onEnterPress={submitForm}
                />
                <AdvancedOptionsToggle
                    advancedOptions={advancedOptions}
                    advancedOptionsActive={advancedOptionsActive}
                    handleAdvancedOptionsButtonClick={toggleAdvancedOptions}
                />
                <AbstractAdvancedSearch
                    mobile={useMobile()}
                    open={advancedOptions}
                    close={toggleAdvancedOptions}
                    submitForm={submitForm}
                    searchValue={searchValue}
                    showJobDurationSlider={showJobDurationSlider}
                    toggleShowJobDurationSlider={toggleShowJobDurationSlider}
                    minJobDuration={minJobDuration}
                    maxJobDuration={maxJobDuration}
                    jobType={jobType}
                    fields={fields}
                    setSearchValue={setSearchValue}
                    setJobType={setJobType}
                    setJobDuration={setJobDuration}
                    setFields={setFields}
                    FieldsSelectorProps={FieldsSelectorProps}
                    TechsSelectorProps={TechsSelectorProps}
                    JobTypeSelectorProps={JobTypeSelectorProps}
                    JobDurationSwitchProps={JobDurationSwitchProps}
                    JobDurationCollapseProps={JobDurationCollapseProps}
                    JobDurationSwitchLabel={JobDurationSwitchLabel}
                    JobDurationSliderText={JobDurationSliderText}
                    JobDurationSliderProps={JobDurationSliderProps}
                    ResetButtonProps={ResetButtonProps}
                    resetAdvancedSearch={resetAdvancedSearch}
                />
            </form>
            <SubmitSearchButton
                onClick={submitForm}
            />
        </Paper>
    );
};

SearchArea.propTypes = {
    onSubmit: PropTypes.func,
    searchOffers: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
    minJobDuration: PropTypes.number,
    maxJobDuration: PropTypes.number,
    jobType: PropTypes.string,
    setSearchValue: PropTypes.func.isRequired,
    setJobDuration: PropTypes.func.isRequired,
    setJobType: PropTypes.func.isRequired,
    resetAdvancedSearchFields: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    techs: PropTypes.array.isRequired,
    showJobDurationSlider: PropTypes.bool.isRequired,
    setFields: PropTypes.func.isRequired,
    setTechs: PropTypes.func.isRequired,
    setShowJobDurationSlider: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ offerSearch }) => ({
    searchValue: offerSearch.searchValue,
    jobType: offerSearch.jobType,
    minJobDuration: offerSearch.jobDuration[0],
    maxJobDuration: offerSearch.jobDuration[1],
    fields: offerSearch.fields,
    techs: offerSearch.techs,
    showJobDurationSlider: offerSearch.filterJobDuration,
});

export const mapDispatchToProps = (dispatch) => ({
    searchOffers: (filters) => dispatch(searchOffers(filters)),
    setSearchValue: (value) => dispatch(setSearchValue(value)),
    setJobDuration: (_, value) => dispatch(setJobDuration(...value)),
    setJobType: (e) => dispatch(setJobType(e.target.value)),
    setFields: (fields) => dispatch(setFields(fields)),
    setTechs: (techs) => dispatch(setTechs(techs)),
    setShowJobDurationSlider: (val) => dispatch(setShowJobDurationSlider(val)),
    resetAdvancedSearchFields: () => dispatch(resetAdvancedSearchFields()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchArea);

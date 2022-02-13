import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { searchOffers } from "../../../services/offerService";
import {
    setSearchValue,
    setJobDuration,
    setJobType,
    resetAdvancedSearchFields,
    setFields,
    setShowJobDurationSlider,
    setTechs,
    setSubmitNumber,
} from "../../../actions/searchOffersActions";
import { INITIAL_JOB_TYPE, INITIAL_JOB_DURATION } from "../../../reducers/searchOffersReducer";

import { Paper } from "@material-ui/core";
import SearchBar from "./SearchBar";
import SubmitSearchButton from "./SubmitSearchButton";

import useSearchAreaStyles from "./searchAreaStyle";
import { useDesktop } from "../../../utils/media-queries";
import useAdvancedSearch from "./AdvancedSearch/useAdvancedSearch";
import AdvancedOptionsToggle from "./AdvancedOptionsToggle";
import AdvancedSearchMobile from "./AdvancedSearch/AdvancedSearchMobile";
import AdvancedSearchDesktop from "./AdvancedSearch/AdvancedSearchDesktop";
import useComponentController from "../../../hooks/useComponentController";

export const AdvancedSearchControllerContext = React.createContext({});

export const AdvancedSearchController = ({
    enableAdvancedSearchDefault, showJobDurationSlider, setShowJobDurationSlider, jobMinDuration,
    jobMaxDuration, setJobDuration, jobType, setJobType, fields, setFields, technologies, setTechs,
    resetAdvancedSearchFields, onSubmit, searchValue, setSearchValue, searchOffers, onMobileClose,
    submitNumber, setSubmitNumber,
}) => {

    const advancedSearchProps = useAdvancedSearch({
        enableAdvancedSearchDefault,
        jobMinDuration,
        jobMaxDuration,
        setJobDuration,
        showJobDurationSlider,
        setShowJobDurationSlider,
        jobType,
        setJobType,
        fields,
        setFields,
        technologies,
        setTechs,
        resetAdvancedSearchFields,
    });

    const submitForm = useCallback((e) => {
        if (e) e.preventDefault();
        searchOffers({ value: searchValue,
            jobMinDuration: showJobDurationSlider && jobMinDuration,
            jobMaxDuration: showJobDurationSlider && jobMaxDuration,
            jobType,
            fields,
            technologies,
        });
        setSubmitNumber(submitNumber + 1);

        if (onSubmit) onSubmit();
    }, [
        fields, jobMaxDuration, jobMinDuration, jobType, onSubmit, searchOffers, searchValue,
        setSubmitNumber, showJobDurationSlider, submitNumber, technologies,
    ]);

    return {
        ...advancedSearchProps,
        submitForm,
        controllerOptions: {
            initialValue: {
                ...advancedSearchProps,
                submitForm,
                onMobileClose,
                searchValue,
                setSearchValue,
            },
        },
    };
};

export const SearchArea = ({ onSubmit, searchOffers, searchValue, submitNumber, setSubmitNumber,
    jobMinDuration = INITIAL_JOB_DURATION, jobMaxDuration = INITIAL_JOB_DURATION + 1, jobType = INITIAL_JOB_TYPE,
    fields, technologies, showJobDurationSlider, setShowJobDurationSlider, advanced: enableAdvancedSearchDefault = false,
    setSearchValue, setJobDuration, setJobType, setFields, setTechs, resetAdvancedSearchFields, onMobileClose }) => {

    const classes = useSearchAreaStyles();
    const {
        advancedOptions,
        advancedOptionsActive,
        toggleAdvancedOptions,
        submitForm,
        ContextProvider,
        contextProviderProps,
    } = useComponentController(
        AdvancedSearchController,
        {
            enableAdvancedSearchDefault, showJobDurationSlider, setShowJobDurationSlider, jobMinDuration,
            jobMaxDuration, setJobDuration, jobType, setJobType, fields, setFields, technologies, setTechs,
            resetAdvancedSearchFields, onSubmit, searchValue, setSearchValue, searchOffers, onMobileClose,
            submitNumber, setSubmitNumber,
        },
        AdvancedSearchControllerContext
    );

    return (
        <ContextProvider {...contextProviderProps}>
            <Paper
                className={classes.searchArea}
                elevation={8}
            >
                <form
                    aria-label="Search Area"
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
                    {!useDesktop() ?
                        <AdvancedSearchMobile />
                        :
                        <AdvancedSearchDesktop />
                    }
                </form>
                <SubmitSearchButton
                    onClick={submitForm}
                />
            </Paper>
        </ContextProvider>
    );
};

SearchArea.propTypes = {
    onSubmit: PropTypes.func,
    searchOffers: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
    jobMinDuration: PropTypes.number,
    jobMaxDuration: PropTypes.number,
    jobType: PropTypes.string,
    setSubmitNumber: PropTypes.func,
    setSearchValue: PropTypes.func.isRequired,
    setJobDuration: PropTypes.func.isRequired,
    setJobType: PropTypes.func.isRequired,
    resetAdvancedSearchFields: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired,
    technologies: PropTypes.array.isRequired,
    showJobDurationSlider: PropTypes.bool.isRequired,
    setFields: PropTypes.func.isRequired,
    setTechs: PropTypes.func.isRequired,
    setShowJobDurationSlider: PropTypes.func.isRequired,
    onMobileClose: PropTypes.func,
    advanced: PropTypes.bool,
};

export const mapStateToProps = ({ offerSearch }) => ({
    submitNumber: offerSearch.submitNumber,
    searchValue: offerSearch.searchValue,
    jobType: offerSearch.jobType,
    jobMinDuration: offerSearch.jobDuration[0],
    jobMaxDuration: offerSearch.jobDuration[1],
    fields: offerSearch.fields,
    technologies: offerSearch.technologies,
    showJobDurationSlider: offerSearch.filterJobDuration,
});

export const mapDispatchToProps = (dispatch) => ({
    searchOffers: (filters) => dispatch(searchOffers(filters)),
    setSubmitNumber: (submitNumber) => dispatch((setSubmitNumber(submitNumber))),
    setSearchValue: (value) => dispatch(setSearchValue(value)),
    setJobDuration: (_, value) => dispatch(setJobDuration(...value)),
    setJobType: (e) => dispatch(setJobType(e.target.value)),
    setFields: (fields) => dispatch(setFields(fields)),
    setTechs: (technologies) => dispatch(setTechs(technologies)),
    setShowJobDurationSlider: (val) => dispatch(setShowJobDurationSlider(val)),
    resetAdvancedSearchFields: () => dispatch(resetAdvancedSearchFields()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchArea);

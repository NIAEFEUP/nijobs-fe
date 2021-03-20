import React, { useCallback } from "react";
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
import AdvancedOptionsToggle from "./AdvancedOptionsToggle";
import AdvancedSearchMobile from "./AdvancedSearch/AdvancedSearchMobile";
import AdvancedSearchDesktop from "./AdvancedSearch/AdvancedSearchDesktop";
import useComponentController from "../../../hooks/useComponentController";

export const AdvancedSearchControllerContext = React.createContext({});

const AdvancedSearchController = ({
    enableAdvancedSearchDefault, showJobDurationSlider, setShowJobDurationSlider, jobMinDuration, jobMaxDuration, setJobDuration, jobType,
    setJobType, fields, setFields, technologies, setTechs, resetAdvancedSearchFields, onSubmit, searchValue, searchOffers, onMobileClose,
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
        // mind the jobType value when passing value to api,
        // because for simple search, the initial jobType value will be undefined,
        // and should be treated as a filter, not a required field, just like jobDuration
        if (e) e.preventDefault();

        // console.log("SEARCH SUBMITTED:");
        // console.log(searchValue, jobMinDuration, jobMaxDuration, jobType, fields);

        // TODO: Tinker filters later
        searchOffers({ value: searchValue, jobMinDuration, jobMaxDuration, jobType, fields, technologies });

        if (onSubmit) onSubmit();
    }, [fields, jobMaxDuration, jobMinDuration, jobType, onSubmit, searchOffers, searchValue, technologies]);

    return {
        ...advancedSearchProps,
        submitForm,
        controllerOptions: {
            initialValue: {
                ...advancedSearchProps,
                submitForm,
                onMobileClose,
            },
        },
    };
};

export const SearchArea = ({ onSubmit, searchOffers, searchValue,
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
            resetAdvancedSearchFields, onSubmit, searchValue, searchOffers, onMobileClose,
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
                    {useMobile() ?
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
    setSearchValue: (value) => dispatch(setSearchValue(value)),
    setJobDuration: (_, value) => dispatch(setJobDuration(...value)),
    setJobType: (e) => dispatch(setJobType(e.target.value)),
    setFields: (fields) => dispatch(setFields(fields)),
    setTechs: (technologies) => dispatch(setTechs(technologies)),
    setShowJobDurationSlider: (val) => dispatch(setShowJobDurationSlider(val)),
    resetAdvancedSearchFields: () => dispatch(resetAdvancedSearchFields()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchArea);

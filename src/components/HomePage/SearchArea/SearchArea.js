import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { SearchResultsConstants } from "../SearchResultsArea/SearchResultsWidget/SearchResultsUtils";
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
import { useDesktop } from "../../../utils/media-queries";
import useAdvancedSearch from "./AdvancedSearch/useAdvancedSearch";
import AdvancedOptionsToggle from "./AdvancedOptionsToggle";
import AdvancedSearchMobile from "./AdvancedSearch/AdvancedSearchMobile";
import AdvancedSearchDesktop from "./AdvancedSearch/AdvancedSearchDesktop";
import useComponentController from "../../../hooks/useComponentController";
import useOffersSearcher from "../SearchResultsArea/SearchResultsWidget/useOffersSearcher";

import useSearchParams from "./useUrlSearchParams";

export const AdvancedSearchControllerContext = React.createContext({});

export const AdvancedSearchController = ({
    enableAdvancedSearchDefault, showJobDurationSlider, setShowJobDurationSlider, jobMinDuration,
    jobMaxDuration, setJobDuration, jobType, setJobType, fields, setFields, technologies, setTechs,
    resetAdvancedSearchFields, onSubmit, searchValue, setSearchValue, onMobileClose,
}) => {

    const {
        queryParams,
        setJobType: actualSetJobType,
        setJobDuration: actualSetJobDuration,
        setFields: actualSetFields,
        setShowJobDurationSlider: actualSetShowJobDurationSlider,
        setTechs: actualSetTechs,
        resetAdvancedSearchFields: actualResetAdvancedSearchFields,
        setSearchValue: setUrlSearchValue,
    } = useSearchParams({
        setJobDuration,
        setShowJobDurationSlider,
        setJobType,
        setFields,
        setTechs,
        resetAdvancedSearchFields,
    });

    const advancedSearchProps = useAdvancedSearch({
        enableAdvancedSearchDefault,
        jobMinDuration,
        jobMaxDuration,
        setJobDuration: actualSetJobDuration,
        showJobDurationSlider,
        setShowJobDurationSlider: actualSetShowJobDurationSlider,
        jobType,
        setJobType: actualSetJobType,
        fields,
        setFields: actualSetFields,
        technologies,
        setTechs: actualSetTechs,
        resetAdvancedSearchFields: actualResetAdvancedSearchFields,
    });

    const { search: searchOffers } = useOffersSearcher({
        value: searchValue,
        jobMinDuration: showJobDurationSlider && jobMinDuration,
        jobMaxDuration: showJobDurationSlider && jobMaxDuration,
        jobType,
        fields,
        technologies,
    });

    const submitForm = useCallback((e, updateUrl = true) => {
        if (e) e.preventDefault();
        searchOffers(SearchResultsConstants.INITIAL_LIMIT);

        if (updateUrl) setUrlSearchValue(searchValue);

        if (onSubmit) onSubmit();
    }, [onSubmit, searchOffers, searchValue, setUrlSearchValue]);

    useEffect(() => {
        if (queryParams.jobMinDuration && queryParams.jobMaxDuration) {
            setShowJobDurationSlider(true);
            setJobDuration(null, [
                parseInt(queryParams.jobMinDuration, 10),
                parseInt(queryParams.jobMaxDuration, 10),
            ]);
        }

        if (queryParams.jobType) setJobType(queryParams.jobType);
        if (queryParams.fields) setFields(queryParams.fields);
        if (queryParams.technologies) setTechs(queryParams.technologies);

        if (queryParams.searchValue) {
            setSearchValue(queryParams.searchValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

export const SearchArea = ({ onSubmit, searchValue,
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
            resetAdvancedSearchFields, onSubmit, searchValue, setSearchValue, onMobileClose,
        },
        AdvancedSearchControllerContext
    );
    
    return (
        <ContextProvider {...contextProviderProps}>
            <Paper
                className={classes.searchArea}
                elevation={8}
                data-testid="search-area-paper"
            >
                <form
                    aria-label="Search Area"
                    onSubmit={submitForm}
                    autoComplete="off"
                    id="search_form"
                    data-testid="search_form"
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
                        <AdvancedSearchMobile aria-label="Advanced Search Mobile" />
                        :
                        <AdvancedSearchDesktop aria-label="Advanced Search Desktop" />
                    }
                </form>
                <SubmitSearchButton
                    onClick={submitForm}
                    searchHasUserInput={searchValue !== "" || advancedOptionsActive}
                />
            </Paper>
        </ContextProvider>
    );
};

SearchArea.propTypes = {
    onSubmit: PropTypes.func,
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
    setSearchValue: (value) => dispatch(setSearchValue(value)),
    setJobDuration: (_, value) => dispatch(setJobDuration(...value)),
    setJobType: (jobType) => dispatch(setJobType(jobType)),
    setFields: (fields) => dispatch(setFields(fields)),
    setTechs: (technologies) => dispatch(setTechs(technologies)),
    setShowJobDurationSlider: (val) => dispatch(setShowJobDurationSlider(val)),
    resetAdvancedSearchFields: () => dispatch(resetAdvancedSearchFields()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchArea);

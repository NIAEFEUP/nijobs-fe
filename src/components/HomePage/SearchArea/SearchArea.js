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
    setLoadUrlFromFilters,
    hideOffer,
    setShowHidden,
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

import { ensureArray } from "../../../utils";

export const AdvancedSearchControllerContext = React.createContext({});

export const AdvancedSearchController = ({
    enableAdvancedSearchDefault, showJobDurationSlider, setShowJobDurationSlider, jobMinDuration,
    jobMaxDuration, setJobDuration, jobType, setJobType, fields, setFields, technologies, setTechs,
    resetAdvancedSearchFields, onSubmit, searchValue, setSearchValue, onMobileClose,
    loadUrlFromFilters, setLoadUrlFromFilters, showHidden, setShowHidden,
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
        setUrlFilters,
        setShowHidden: actualSetShowHidden,
    } = useSearchParams({
        setJobDuration,
        setShowJobDurationSlider,
        setJobType,
        setFields,
        setTechs,
        resetAdvancedSearchFields,
        setShowHidden,
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
        hideOffer,
        showHidden,
        setShowHidden: actualSetShowHidden,
    });

    const { search: searchOffers } = useOffersSearcher({
        value: searchValue,
        jobMinDuration: showJobDurationSlider && jobMinDuration,
        jobMaxDuration: showJobDurationSlider && jobMaxDuration,
        jobType,
        fields,
        technologies,
        showHidden,
    });

    const submitForm = useCallback((e, updateUrl = true) => {
        if (e) e.preventDefault();
        searchOffers(SearchResultsConstants.INITIAL_LIMIT);

        if (updateUrl) setUrlSearchValue(searchValue);

        if (onSubmit) onSubmit();
    }, [onSubmit, searchOffers, searchValue, setUrlSearchValue]);

    useEffect(() => {
        if (loadUrlFromFilters) {
            setUrlFilters(
                jobMinDuration,
                jobMaxDuration,
                fields,
                technologies,
                jobType,
                searchValue,
            );
            setLoadUrlFromFilters(false);
            submitForm(null, false);
        } else {
            setShowJobDurationSlider(!!queryParams.jobMinDuration && !!queryParams.jobMaxDuration);
            setJobDuration(null, [
                parseInt(queryParams.jobMinDuration, 10),
                parseInt(queryParams.jobMaxDuration, 10),
            ]);

            setJobType(queryParams.jobType);
            setFields(ensureArray(queryParams.fields ?? []));
            setTechs(ensureArray(queryParams.technologies ?? []));

            setSearchValue(queryParams.searchValue);
        }
        setShowHidden(queryParams.showHidden === "false");

        setSearchValue(queryParams.searchValue);
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
    setSearchValue, setJobDuration, setJobType, setFields, setTechs, resetAdvancedSearchFields, onMobileClose,
    loadUrlFromFilters, setLoadUrlFromFilters, showHidden, setShowHidden }) => {

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
            hideOffer, loadUrlFromFilters, setLoadUrlFromFilters, showHidden, setShowHidden,
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
                    searchHasUserInput={
                        (searchValue !== "" && searchValue !== undefined)
                        || advancedOptionsActive
                    }
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
    setLoadUrlFromFilters: PropTypes.func.isRequired,
    loadUrlFromFilters: PropTypes.bool,
    resetAdvancedSearchFields: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired,
    technologies: PropTypes.array.isRequired,
    showJobDurationSlider: PropTypes.bool.isRequired,
    setFields: PropTypes.func.isRequired,
    setTechs: PropTypes.func.isRequired,
    setShowJobDurationSlider: PropTypes.func.isRequired,
    onMobileClose: PropTypes.func,
    showHidden: PropTypes.bool,
    setShowHidden: PropTypes.func,
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
    loadUrlFromFilters: offerSearch.loadUrlFromFilters,
    showHidden: offerSearch.showHidden,
});

export const mapDispatchToProps = (dispatch) => ({
    setSearchValue: (value) => dispatch(setSearchValue(value)),
    setJobDuration: (_, value) => dispatch(setJobDuration(...value)),
    setJobType: (jobType) => dispatch(setJobType(jobType)),
    setFields: (fields) => dispatch(setFields(fields)),
    setTechs: (technologies) => dispatch(setTechs(technologies)),
    setShowJobDurationSlider: (val) => dispatch(setShowJobDurationSlider(val)),
    setShowHidden: (val) => dispatch(setShowHidden(val)),
    resetAdvancedSearchFields: () => dispatch(resetAdvancedSearchFields()),
    setLoadUrlFromFilters: (value) => dispatch(setLoadUrlFromFilters(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchArea);

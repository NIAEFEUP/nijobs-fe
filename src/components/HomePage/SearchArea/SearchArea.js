import React, { useCallback, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";

import { useLocation, useHistory } from "react-router-dom";
import qs from "qs";

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

import { throttle } from "lodash";

export const AdvancedSearchControllerContext = React.createContext({});

export const AdvancedSearchController = ({
    enableAdvancedSearchDefault, showJobDurationSlider, setShowJobDurationSlider, jobMinDuration,
    jobMaxDuration, setJobDuration, jobType, setJobType, fields, setFields, technologies, setTechs,
    resetAdvancedSearchFields, onSubmit, searchValue, setSearchValue, onMobileClose,
}) => {

    // FIXME: mock useLocation and useHistory in tests
    const location = useLocation();

    /* const location = {
        search: "",
    }; */

    const history = useHistory();

    /* const history = {
        replace: (_unused) => {},
    }; */

    const queryParams = useMemo(() => qs.parse(location.search, {
        ignoreQueryPrefix: true,
    }), [location]);

    // need to throttle down calling 'history.replace' because
    // too many invocations might cause the browser to stop responding
    // value of 350 derived from https://github.com/PoorBillyPilgrim/artcrawl-digital-exhibit/issues/20#issue-761626379
    // according to this 1000/3 is the lower bound for the 'wait' value
    const changeURLFilters = useCallback(throttle((location, history, queryParams, changes) => {
        const newQueryParams = {
            ...queryParams,
            ...changes,
        };

        history.replace({
            ...location, search: qs.stringify(newQueryParams, {
                skipNulls: true,
                arrayFormat: "repeat", // to match what gets sent to the API
            }),
        });
    }, 350), []);

    const clearURLFilters = useCallback(
        throttle(
            (location, history) => history.replace({ ...location, search: "" }),
            350
        ), []);

    // destructure input here so mapDispatchToProps.setJobType is 'normalized' with respect to the other dispatch functions
    const actualSetJobType = useCallback(({ target: { value: jobType } }) => {
        changeURLFilters(location, history, queryParams, { jobType });

        setJobType(jobType);
    }, [changeURLFilters, location, history, queryParams, setJobType]);

    const actualSetJobDuration = useCallback((unused, duration) => {

        const [jobMinDuration, jobMaxDuration] = duration;

        changeURLFilters(location, history, queryParams, { jobMinDuration, jobMaxDuration });

        setJobDuration(unused, duration);
    }, [changeURLFilters, location, history, queryParams, setJobDuration]);

    const actualSetShowJobDurationSlider = useCallback((showJobDurationSlider) => {
        if (!showJobDurationSlider)
            changeURLFilters(location, history, queryParams, { jobMinDuration: null, jobMaxDuration: null });

        setShowJobDurationSlider(showJobDurationSlider);
    }, [changeURLFilters, history, location, queryParams, setShowJobDurationSlider]);

    const actualSetFields = useCallback((fields) => {

        changeURLFilters(location, history, queryParams, { fields });

        setFields(fields);
    }, [changeURLFilters, history, location, queryParams, setFields]);

    const actualSetTechs = useCallback((technologies) => {

        changeURLFilters(location, history, queryParams, { technologies });

        setTechs(technologies);
    }, [changeURLFilters, history, location, queryParams, setTechs]);

    const actualResetAdvancedSearchFields = useCallback(() => {
        clearURLFilters(location, history);

        resetAdvancedSearchFields();
    }, [clearURLFilters, history, location, resetAdvancedSearchFields]);

    const firstRender = useRef(true);
    useEffect(() => {

        if (!firstRender.current) return;

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

        if (queryParams.searchValue) setSearchValue(queryParams.searchValue);

        firstRender.current = false;
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

    const submitForm = useCallback((e) => {
        if (e) e.preventDefault();
        searchOffers(SearchResultsConstants.INITIAL_LIMIT);

        changeURLFilters(location, history, queryParams, { searchValue });

        if (onSubmit) onSubmit();
    }, [changeURLFilters, history, location, onSubmit, queryParams, searchOffers, searchValue]);

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

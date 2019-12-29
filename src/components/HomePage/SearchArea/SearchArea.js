import React, { useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { searchOffers } from "../../../actions/nijobsService";
import { setSearchValue, setJobDuration, setJobType, resetAdvancedSearchFields } from "../../../actions/searchOffersActions";
import { INITIAL_JOB_TYPE, INITIAL_JOB_DURATION } from "../../../reducers/searchOffersReducer";

import useToggle from "../../../hooks/useToggle";

import { Paper } from "@material-ui/core";
import SearchBar from "./SearchBar";
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import AdvancedSearchMobile from "./AdvancedSearch/AdvancedSearchMobile";
import SubmitSearchButton from "./SubmitSearchButton";

import useSearchAreaStyles from "./searchAreaStyle";
import { useMobile } from "../../../utils/media-queries";

export const SearchArea = ({ onSubmit, searchOffers, searchValue,
    minJobDuration = INITIAL_JOB_DURATION, maxJobDuration = INITIAL_JOB_DURATION + 1, jobType = INITIAL_JOB_TYPE,
    setSearchValue, setJobDuration, setJobType, resetAdvancedSearchFields }) => {

    const classes = useSearchAreaStyles();

    const [advancedOptions, toggleAdvancedOptions] = useToggle(false);
    const [showJobDurationSlider, setShowJobDurationSlider] = useState(false);
    const toggleShowJobDurationSlider = () => setShowJobDurationSlider(!showJobDurationSlider);
    // const advancedSettingsChanged = jobType !== INITIAL_JOB_TYPE
    //     || minJobDuration !== null
    //     || maxJobDuration !== null;

    // if (!useMobile() && !advancedOptions && advancedSettingsChanged)
    //     toggleAdvancedOptions();

    const resetAdvancedSearch = () => {
        setShowJobDurationSlider(false);
        resetAdvancedSearchFields();
    };

    const handleAdvancedOptionsButtonClick = () => {
        if (advancedOptions) {
            resetAdvancedSearch();
        }
        toggleAdvancedOptions();
    };

    const submitForm = (e) => {
        // mind the jobType value when passing value to api,
        // because for simple search, the initial jobType value will be undefined,
        // and should be treated as a filter, not a required field, just like jobDuration
        if (e) e.preventDefault();

        // TODO: Tinker filters later
        searchOffers({ value: searchValue });

        if (onSubmit) onSubmit();
    };

    // TODO Make the advancedSearch button be gray, and primary/secondary, if there are changes (i.e. jobDuration !== INITIAL_JOB_DURATION)
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
                    handleAdvancedOptionsButtonClick={handleAdvancedOptionsButtonClick}
                    advancedOptions={advancedOptions}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                {/* These components (mobile/nonMobile advanced search) should be loaded lazily via React.Lazy() when possible */}
                {useMobile() ?
                    <AdvancedSearchMobile
                        open={advancedOptions}
                        close={toggleAdvancedOptions}
                        submitForm={submitForm}
                        searchValue={searchValue}
                        showJobDurationSlider={showJobDurationSlider}
                        toggleShowJobDurationSlider={toggleShowJobDurationSlider}
                        jobDuration={[minJobDuration, maxJobDuration]}
                        jobType={jobType}
                        setSearchValue={setSearchValue}
                        setJobType={setJobType}
                        setJobDuration={setJobDuration}
                        resetAdvancedSearch={resetAdvancedSearch}
                    />
                    :
                    <AdvancedSearch
                        open={advancedOptions}
                        showJobDurationSlider={showJobDurationSlider}
                        toggleShowJobDurationSlider={toggleShowJobDurationSlider}
                        jobDuration={[minJobDuration, maxJobDuration]}
                        jobType={jobType}
                        setJobDuration={setJobDuration}
                        setJobType={setJobType}
                    />
                }
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
};

export const mapStateToProps = ({ offerSearch }) => ({
    searchValue: offerSearch.searchValue,
    jobType: offerSearch.jobType,
    minJobDuration: offerSearch.jobDuration[0],
    maxJobDuration: offerSearch.jobDuration[1],
});

export const mapDispatchToProps = (dispatch) => ({
    searchOffers: (filters) => dispatch(searchOffers(filters)),
    setSearchValue: (value) => dispatch(setSearchValue(value)),
    setJobDuration: (_, value) => dispatch(setJobDuration(...value)),
    setJobType: (e) => dispatch(setJobType(e.target.value)),
    resetAdvancedSearchFields: () => dispatch(resetAdvancedSearchFields()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchArea);

import { useCallback, useMemo } from "react";

import qs from "qs";
import { useLocation, useHistory } from "react-router-dom";

import { throttle } from "lodash";

const HISTORY_REPLACE_THROTTLE_DELAY_MS = 350;

/**
 * Injects into the Redux 'setXXXX' functions the ability to change the browser URL to reflect the specified change.
 */
export default ({
    setJobDuration,
    setShowJobDurationSlider,
    setJobType,
    setFields,
    setTechs,
    setSearchValue,
    resetAdvancedSearchFields,
} = {}) => {

    const location = useLocation();
    const history = useHistory();

    const queryParams = useMemo(() => qs.parse(location.search, {
        ignoreQueryPrefix: true,
    }), [location]);

    // need to throttle down calling 'history.replace' because
    // too many invocations might cause the browser to stop responding
    // value of 350 derived from https://github.com/PoorBillyPilgrim/artcrawl-digital-exhibit/issues/20#issue-761626379
    // according to this 1000/3 is the lower bound for the 'wait' value
    const changeURLFilters = useCallback(throttle((location, queryParams, changes) => {
        const newQueryParams = {
            ...queryParams,
            ...changes,
        };

        history.replace({
            ...location, search: `?${qs.stringify(newQueryParams, {
                skipNulls: true,
                arrayFormat: "brackets",
            })}`,
        });
    }, HISTORY_REPLACE_THROTTLE_DELAY_MS), [history]);

    const clearURLFilters = useCallback(
        throttle(
            (location) => history.replace({ ...location, search: "" }),
            HISTORY_REPLACE_THROTTLE_DELAY_MS
        ), [history]);

    // destructure input here so mapDispatchToProps.setJobType is 'normalized' with respect to the other dispatch functions
    const actualSetJobType = useCallback(({ target: { value: jobType } }) => {
        changeURLFilters(location, queryParams, { jobType });

        if (setJobType)
            setJobType(jobType);

    }, [changeURLFilters, location, queryParams, setJobType]);

    const actualSetJobDuration = useCallback((unused, duration) => {

        const [jobMinDuration, jobMaxDuration] = duration;

        changeURLFilters(location, queryParams, { jobMinDuration, jobMaxDuration });

        if (setJobDuration)
            setJobDuration(unused, duration);

    }, [changeURLFilters, location, queryParams, setJobDuration]);

    const actualSetShowJobDurationSlider = useCallback((showJobDurationSlider) => {
        if (!showJobDurationSlider)
            changeURLFilters(location, queryParams, { jobMinDuration: null, jobMaxDuration: null });

        if (setShowJobDurationSlider)
            setShowJobDurationSlider(showJobDurationSlider);

    }, [changeURLFilters, location, queryParams, setShowJobDurationSlider]);

    const actualSetFields = useCallback((fields) => {

        changeURLFilters(location, queryParams, { fields });

        if (setFields)
            setFields(fields);

    }, [changeURLFilters, location, queryParams, setFields]);

    const actualSetTechs = useCallback((technologies) => {

        changeURLFilters(location, queryParams, { technologies });

        if (setTechs)
            setTechs(technologies);

    }, [changeURLFilters, location, queryParams, setTechs]);

    const actualSetSearchValue = useCallback((searchValue) => {

        changeURLFilters(location, queryParams, { searchValue });

        if (setSearchValue)
            setSearchValue(searchValue);

    }, [changeURLFilters, location, queryParams, setSearchValue]);

    const actualResetAdvancedSearchFields = useCallback(() => {
        clearURLFilters(location);

        if (resetAdvancedSearchFields)
            resetAdvancedSearchFields();

    }, [clearURLFilters, location, resetAdvancedSearchFields]);

    return {
        queryParams,
        changeURLFilters,
        setJobType: actualSetJobType,
        setJobDuration: actualSetJobDuration,
        setFields: actualSetFields,
        setShowJobDurationSlider: actualSetShowJobDurationSlider,
        setTechs: actualSetTechs,
        setSearchValue: actualSetSearchValue,
        resetAdvancedSearchFields: actualResetAdvancedSearchFields,
    };
};

import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

const ResetableFilter = React.forwardRef(({
    activeFilters = {}, setActiveFilters, id, initialValue = null, filterUI: FilterUI,
    onChange: afterChange, filtersContext, setFiltersContext, ...props
}, ref) => {

    const [value, setValue] = useState(initialValue);
    const [hasUncommitedChanges, setHasUncommitedChanges] = useState(false);

    const onChange = (newValue) => {
        setValue(newValue);
        if (!newValue || newValue.length === 0) { // If no value chosen, disregard filter
            setActiveFilters((filters) => {
                // eslint-disable-next-line no-unused-vars
                const { [id]: keyToBeRemoved, ...newFilters } = filters;
                return newFilters;
            });
        }
        setHasUncommitedChanges(true);
        if (afterChange) afterChange(newValue, filtersContext, setFiltersContext);
    };

    const onCommitChange = useCallback(
        () => {
            setHasUncommitedChanges(false);
        }, []
    );
    useEffect(() => {
        if (!hasUncommitedChanges && !activeFilters[id] && value !== initialValue) { // If filter is reset, clear
            setValue(initialValue);
        }
    }, [activeFilters, hasUncommitedChanges, id, initialValue, value]);

    return (
        <FilterUI
            id={id}
            ref={ref}
            onChange={onChange}
            onCommitChange={onCommitChange}
            value={value}
            setValue={setValue}
            setActiveFilters={setActiveFilters}
            initialValue={initialValue}
            filtersContext={filtersContext}
            setFiltersContext={setFiltersContext}
            {...props}
        />
    );
});

ResetableFilter.displayName = "ResetableFilter";

ResetableFilter.propTypes = {
    setActiveFilters: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};
export default ResetableFilter;

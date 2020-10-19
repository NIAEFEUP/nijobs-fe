import { isAfter, isBefore, isEqual, parseISO } from "date-fns";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { ColumnPropTypes } from "../PropTypes";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { getFieldValue } from "../utils";
import ResetableFilter from "./ResetableFilter";

const MODE_COMPARE_FN = Object.freeze({
    isBefore: isBefore,
    isAfter: isAfter,
    is: isEqual,
});

const comparator = (mode, rowDate, selectedDate) => MODE_COMPARE_FN[mode](parseISO(rowDate), selectedDate);

// TODO:
// - Date to only after DAte from(if exists)

const DateFilter = React.forwardRef(({
    value, onChange, onCommitChange, className, id, setActiveFilters, column, columns, label, mode, minDate,
}, ref) => {

    const handleChange = (date) => {
        onChange(date);
    };

    useEffect(() => {
        if (value) {
            setActiveFilters((filters) => ({
                ...filters,
                [id]: (rows) => rows.filter((row) => comparator(mode, getFieldValue(row, column, columns), value)),
            }));
            onCommitChange();
        }
    }, [column, columns, id, mode, onCommitChange, setActiveFilters, value]);

    return (
        <KeyboardDatePicker
            ref={ref}
            className={className}
            value={value}
            label={label}
            variant="inline"
            onChange={handleChange}
            autoOk
            format="yyyy-MM-dd"
            minDate={minDate}
        />
    );
});

DateFilter.displayName = "DateFilter";

DateFilter.propTypes = {
    className: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    setActiveFilters: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
    columns: PropTypes.objectOf(ColumnPropTypes),
    mode: PropTypes.oneOf(Object.keys(MODE_COMPARE_FN)),
};

const ResetableDateFilter = React.forwardRef((props, ref) => (
    <ResetableFilter
        ref={ref}
        filterUI={DateFilter}
        initialValue={null}
        {...props}
    />));

ResetableDateFilter.displayName = "ResetableDateFilter";

export default ResetableDateFilter;

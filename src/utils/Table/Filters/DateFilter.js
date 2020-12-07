import { isAfter, isBefore, isSameDay, parseISO } from "date-fns";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { KeyboardDatePicker } from "@material-ui/pickers";
import { getFieldValue } from "../utils";
import ResetableFilter from "./ResetableFilter";

const MODE_COMPARE_FN = Object.freeze({
    isBefore: isBefore,
    isAfter: isAfter,
    is: isSameDay,
});

const comparator = (mode, rowDate, selectedDate) => MODE_COMPARE_FN[mode](parseISO(rowDate), selectedDate);

const DateFilter = React.forwardRef(({
    value, onChange, onCommitChange, className, id, setActiveFilters, column, label, mode, filtersContext, restrictMinDate = false,
}, ref) => {

    const handleChange = (date) => {
        onChange(date);
    };

    useEffect(() => {
        if (value) {
            setActiveFilters((filters) => ({
                ...filters,
                [id]: (rows) => Object.entries(rows)
                    .filter(([, row]) =>
                        // eslint-disable-next-line max-len
                        // console.log("value", value, "\n", "row val:", getFieldValue(row, column), "\n", isEqual(parseISO(format(value, "yyyy-MM-dd")), getFieldValue(row, column)));
                        // eslint-disable-next-line max-len
                        // console.log(row, getFieldValue(row, column), value, comparator(mode, getFieldValue(row, column), value), comparator("is", getFieldValue(row, column), value));
                        comparator(mode, getFieldValue(row, column), value)
                        || comparator("is", getFieldValue(row, column), value) // OR equal

                    )
                    .reduce((filtered, [key, row]) => {
                        filtered[key] = row; return filtered;
                    }, {}),
            }));
            onCommitChange();
        }
    }, [column, id, mode, onCommitChange, setActiveFilters, value]);

    return (
        <KeyboardDatePicker
            ref={ref}
            className={className}
            value={value}
            label={label}
            id={id}
            name={id}
            variant="inline"
            onChange={handleChange}
            autoOk
            format="yyyy-MM-dd"
            minDate={restrictMinDate && filtersContext.minDate}
            initialFocusedDate={restrictMinDate && filtersContext.minDate}
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
    mode: PropTypes.oneOf(Object.keys(MODE_COMPARE_FN)),
    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
    onCommitChange: PropTypes.func.isRequired,
    filtersContext: PropTypes.shape({
        minDate: PropTypes.instanceOf(Date),
    }).isRequired,
    restrictMinDate: PropTypes.bool,
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

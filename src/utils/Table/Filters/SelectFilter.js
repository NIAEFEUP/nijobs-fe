import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { MenuItem, TextField } from "@material-ui/core";
import { getFieldValue } from "../utils";
import ResetableFilter from "./ResetableFilter";

const SelectFilter = React.forwardRef(({
    value, className, label, setActiveFilters, onChange, onCommitChange, id, options, column,
}, ref) => {

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    useEffect(() => {
        if (value.length !== 0) {
            setActiveFilters((filters) => ({
                ...filters,
                [id]: (rows) => Object.entries(rows)
                    .filter(([, row]) => value.includes(getFieldValue(row, column)))
                    .reduce((filtered, [key, row]) => {
                        filtered[key] = row; return filtered;
                    }, {}),
            }));
            onCommitChange();
        }
    }, [column, id, onCommitChange, setActiveFilters, value]);

    return (
        <TextField
            ref={ref}
            className={className}
            select
            label={label}
            id={id}
            SelectProps={{
                multiple: true,
            }}
            value={value}
            onChange={handleChange}
            InputLabelProps={{
                style: { left: "initial", top: "initial" },
            }}
        >
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
});

SelectFilter.displayName = "SelectFilter";

SelectFilter.propTypes = {
    className: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    setActiveFilters: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    column: PropTypes.string.isRequired,
};

const ResetableSelectFilter = React.forwardRef((props, ref) => (
    <ResetableFilter
        ref={ref}
        filterUI={SelectFilter}
        initialValue={[]}
        {...props}
    />));

ResetableSelectFilter.displayName = "ResetableSelectFilter";

export default ResetableSelectFilter;

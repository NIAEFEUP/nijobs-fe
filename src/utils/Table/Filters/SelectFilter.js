import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MenuItem, TextField } from "@material-ui/core";
import { getFieldValue } from "../utils";
import { ColumnPropTypes } from "../PropTypes";

const SelectFilter = React.forwardRef(({ className, label, setActiveFilters, id, options, column, columns }, ref) => {

    const [values, setValues] = useState([]);

    const handleChange = (event) => {
        setValues(event.target.value);
    };

    useEffect(() => {
        if (values.length === 0) { // If no value chosen, disregard filter
            setActiveFilters((filters) => {
                // eslint-disable-next-line no-unused-vars
                const { [id]: keyToBeRemoved, ...newFilters } = filters;
                return newFilters;
            });
        } else {
            setActiveFilters((filters) => ({
                ...filters,
                [id]: (rows) => rows.filter((row) => values.includes(getFieldValue(row, column, columns))),
            }));
        }
    }, [column, columns, id, setActiveFilters, values]);

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
            value={values}
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
    columns: PropTypes.objectOf(ColumnPropTypes),
};

export default SelectFilter;

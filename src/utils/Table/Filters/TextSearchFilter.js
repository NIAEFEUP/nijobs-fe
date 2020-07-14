import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { getFieldValue } from "../utils";
import { ColumnPropTypes } from "../PropTypes";

const TextSearchFilter = React.forwardRef(({ className, label, setActiveFilters, id, column, columns }, ref) => {

    const [query, setQuery] = useState("");

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        if (query.length === 0) { // If no value chosen, disregard filter
            setActiveFilters((filters) => {
                // eslint-disable-next-line no-unused-vars
                const { [id]: keyToBeRemoved, ...newFilters } = filters;
                return newFilters;
            });
        } else {
            const searchRegex = new RegExp(`.*${query}.*`);
            setActiveFilters((filters) => ({
                ...filters,
                [id]: (rows) => rows.filter((row) => searchRegex.test(getFieldValue(row, column, columns))),
            }));
        }
    }, [column, columns, id, query, setActiveFilters]);

    return (
        <TextField
            ref={ref}
            className={className}
            label={label}
            id={id}
            value={query}
            onChange={handleChange}
            InputLabelProps={{
                style: { left: "initial", top: "initial" },
            }}
        />
    );
});

TextSearchFilter.displayName = "TextSearchFilter";

TextSearchFilter.propTypes = {
    className: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    setActiveFilters: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
    columns: PropTypes.objectOf(ColumnPropTypes),
};

export default TextSearchFilter;

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { getFieldValue } from "../utils";
import { ColumnPropTypes } from "../PropTypes";
import ResetableFilter from "./ResetableFilter";

const TextSearchFilter = React.forwardRef(({
    value, onChange, onCommitChange, className, label, setActiveFilters, id, column, columns, placeholder,
}, ref) => {

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    useEffect(() => {

        if (value.length) {
            const searchRegex = new RegExp(`.*${value}.*`);
            setActiveFilters((filters) => ({
                ...filters,
                [id]: (rows) => rows.filter((row) => searchRegex.test(getFieldValue(row, column, columns))),
            }));
            onCommitChange();
        }
    }, [column, columns, id, value, setActiveFilters, onCommitChange]);

    return (
        <TextField
            ref={ref}
            className={className}
            label={label}
            id={id}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
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
    placeholder: PropTypes.string.isRequired,
    setActiveFilters: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
    columns: PropTypes.objectOf(ColumnPropTypes),
};

const ResetableTextFilter = React.forwardRef((props, ref) => (
    <ResetableFilter
        ref={ref}
        filterUI={TextSearchFilter}
        initialValue={""}
        {...props}
    />));

ResetableTextFilter.displayName = "ResetableTextFilter";

export default ResetableTextFilter;

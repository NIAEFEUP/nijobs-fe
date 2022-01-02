import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { MenuItem, TextField } from "@material-ui/core";
import JobOptions from "../../../utils/offers/JobOptions";

const JobTypeComponent = ({ disabled, errors, requestErrors, control }) => (
    <Controller
        name="jobType"
        render={(
            { field: { onChange, onBlur, name, value } },
        ) => (
            <TextField
                name={name}
                fullWidth
                id="job_type"
                select
                label="Job Type"
                value={value ? value : ""}
                onChange={onChange}
                onBlur={onBlur}
                variant="outlined"
                disabled={disabled}
                error={!!errors?.jobType || !!requestErrors.jobType}
                helperText={
                    `${errors.jobType?.message || requestErrors.jobType?.message || ""}`
                }
            >
                {JobOptions.map(({ value, label }) => (
                    <MenuItem
                        key={value}
                        value={value}
                    >
                        {label}
                    </MenuItem>
                ))}
            </TextField>
        )}
        control={control}
    />
);

JobTypeComponent.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    requestErrors: PropTypes.object,
    control: PropTypes.object.isRequired,
};

export default JobTypeComponent;

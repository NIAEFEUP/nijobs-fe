import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { KeyboardDatePicker } from "@material-ui/pickers";

const JobStartDateComponent = ({ disabled, errors, requestErrors, control }) => (
    <Controller
        name="jobStartDate"
        render={(
            { field: { onChange, onBlur, name, value } },
        ) => (
            <KeyboardDatePicker
                margin="dense"
                value={value}
                label="Job Start Date"
                id="startDate-input"
                name={name}
                onChange={(_, value) => (onChange(value))}
                onBlur={onBlur}
                variant="inline"
                autoOk
                disabled={disabled}
                format="yyyy-MM-dd"
                minDate={Date.now()}
                error={!!errors?.jobStartDate || !!requestErrors.jobStartDate}
                helperText={
                    `${errors.jobStartDate?.message ||
                        requestErrors.jobStartDate?.message || " "}`
                }
            />)}
        control={control}
    />
);

JobStartDateComponent.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    requestErrors: PropTypes.object,
    control: PropTypes.object.isRequired,
};

export default JobStartDateComponent;

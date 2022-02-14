import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";


const OwnerComponent = ({ disabled, errors, requestErrors, control }) => (
    <Controller
        name="owner"
        render={(
            { field: { onChange, onBlur, ref, name, value } },
        ) => (
            <TextField
                name={name}
                value={value}
                label="Owner ID"
                id="owner"
                error={!!errors.owner || !!requestErrors.owner}
                inputRef={ref}
                onBlur={onBlur}
                onChange={onChange}
                helperText={
                    `${errors.owner?.message || requestErrors.owner?.message || ""}`
                }
                fullWidth
                disabled={disabled}
            />)}
        control={control}
    />
);

OwnerComponent.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    requestErrors: PropTypes.object,
    control: PropTypes.object.isRequired,
};

export default OwnerComponent;

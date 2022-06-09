import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

const ApplyURLComponent = ({ disabled, errors, requestErrors, control }) => (
    <Controller
        name="applyURL"
        render={(
            { field: { onChange, onBlur, ref, name, value } },
        ) => (
            <TextField
                name={name}
                value={value}
                label="Application URL"
                id="applyURL"
                error={!!errors?.applyURL || !!requestErrors.applyURL}
                inputRef={ref}
                onBlur={onBlur}
                onChange={onChange}
                helperText={
                    `${errors.applyURL?.message ||
                    requestErrors.applyURL?.message || "Ensure your URL starts with http(s)"}`
                }
                fullWidth
                disabled={disabled} // TODO: Fix Vertical Alignment
            />)}
        control={control}
    />
);

ApplyURLComponent.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    requestErrors: PropTypes.object,
    control: PropTypes.object.isRequired,
};

export default ApplyURLComponent;

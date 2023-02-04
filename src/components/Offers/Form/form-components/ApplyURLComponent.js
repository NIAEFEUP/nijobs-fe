import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

const ApplyURLComponent = ({ disabled, errors, requestErrors, control, classes }) => (
    <>
        <Typography variant="h6">
            One Click Application
        </Typography>
        <Controller
            name="applyURL"
            render={(
                { field: { onChange, onBlur, ref, name, value } },
            ) => (
                <TextField
                    name={name}
                    className={classes.applyURLInput}
                    value={value}
                    label="Application URL"
                    id="applyURL"
                    error={!!errors?.applyURL || !!requestErrors.applyURL}
                    inputRef={ref}
                    onBlur={onBlur}
                    onChange={onChange}
                    helperText={
                        `${errors.applyURL?.message ||
                        requestErrors.applyURL?.message || "Ensure your URL starts with 'http(s):' or is a valid email."}`
                    }
                    fullWidth
                    disabled={disabled}
                />)}
            control={control}
        />
    </>
);

ApplyURLComponent.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    requestErrors: PropTypes.object,
    control: PropTypes.object.isRequired,
    classes: PropTypes.shape({
        applyURLInput: PropTypes.string.isRequired,
    }),
};

export default ApplyURLComponent;

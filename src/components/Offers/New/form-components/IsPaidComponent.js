import React from "react";
import { Controller } from "react-hook-form";
import { MenuItem, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { PAID_OPTIONS } from "../CreateOfferForm";


const IsPaidComponent = ({ disabled, errors, requestErrors, control }) => (

    <Controller
        name="isPaid"
        render={(
            { field: { onChange, onBlur, name, value } },
        ) => (
            <TextField
                name={name}
                fullWidth
                id="is-paid"
                select
                label="Compensation"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                variant="outlined"
                disabled={disabled}
                error={!!errors?.isPaid || !!requestErrors.isPaid}
                helperText={
                    `${errors.isPaid?.message || requestErrors.isPaid?.message || " "}`
                }
            >
                {PAID_OPTIONS.map(({ value, label }) => (
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

IsPaidComponent.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    requestErrors: PropTypes.object,
    control: PropTypes.object.isRequired,
};

export default IsPaidComponent;

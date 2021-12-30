import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

const VacanciesComponent = ({ disabled, errors, requestErrors, control }) => (
    <Controller
        name="vacancies"
        render={(
            { field: { onChange, onBlur, name, ref, value } },
        ) => (
            <TextField
                name={name}
                value={value}
                label="Vacancies"
                id="vacancies"
                disabled={disabled}
                error={!!errors?.vacancies || !!requestErrors.vacancies}
                helperText={
                    `${errors.vacancies?.message ||
                                requestErrors.vacancies?.message || ""}`
                }
                inputRef={ref}
                onChange={(_e) => {
                    let value = _e.target.value.replace(/[^0-9]/g, "");
                    value = value ? Number.parseInt(value, 10) : "";
                    onChange(value);
                }}
                onBlur={onBlur}
            />)}
        control={control}
    />
);

VacanciesComponent.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    requestErrors: PropTypes.object,
    control: PropTypes.object.isRequired,
};

export default VacanciesComponent;

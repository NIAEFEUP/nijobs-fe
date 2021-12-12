import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import LocationPicker from "../../../utils/LocationPicker";


const LocationComponent = ({ disabled, errors, requestErrors, control }) => (
    <Controller
        name="location"
        render={(
            { field: { onChange, onBlur, name, value } },
        ) => (
            <LocationPicker
                value={value}
                onChange={(_e, value) => onChange(value)}
                onBlur={onBlur}
                name={name}
                error={errors.location || requestErrors.location}
                disabled={disabled}
            />
        )}
        control={control}
    />
);

LocationComponent.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    requestErrors: PropTypes.object,
    control: PropTypes.object.isRequired,
};

export default LocationComponent;

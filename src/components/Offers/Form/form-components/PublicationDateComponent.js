import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Tooltip } from "@material-ui/core";
import { Info } from "@material-ui/icons";

const PublicationDateComponent = ({ disabled, errors, requestErrors, control, datePickerProps }) => (
    <>
        <Controller
            name="publishDate"
            render={(
                { field: { onChange, onBlur, name, value } },
            ) => (
                <KeyboardDatePicker
                    margin="dense"
                    value={value}
                    label="Publication Date *"
                    id={name}
                    name={name}
                    disabled={disabled}
                    onChange={(_, value) => onChange(value)}
                    onBlur={onBlur}
                    variant="inline"
                    autoOk
                    format="yyyy-MM-dd"
                    minDate={Date.now()}
                    error={!!errors?.publishDate || !!requestErrors?.publishDate }
                    helperText={errors.publishDate?.message ||
                                    requestErrors.publishDate?.message || " "}
                    {...datePickerProps}
                />)}
            control={control}
        />
        <Tooltip
            title="The offer will only be visible after this date"
            placement="top"
        >
            <Info fontSize="small" />
        </Tooltip>
    </>
);

PublicationDateComponent.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    requestErrors: PropTypes.object,
    control: PropTypes.object.isRequired,
    datePickerProps: PropTypes.object,
};

export default PublicationDateComponent;

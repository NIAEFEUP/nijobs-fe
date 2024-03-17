import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Tooltip } from "@material-ui/core";
import { Info } from "@material-ui/icons";

const PublicationEndDateComponent = ({
    fields, disabled, errors, requestErrors, control, datePickerProps, showInfoTooltip = true,
}) => (
    <>
        <Controller
            name="publishEndDate"
            render={(
                { field: { onChange, onBlur, name, value } },
            ) => (
                <KeyboardDatePicker
                    margin="dense"
                    value={value}
                    label="Publication End Date *"
                    id={name}
                    name={name}
                    disabled={disabled}
                    onChange={(_, value) => {
                        const date = new Date(value);
                        // KeybaordDatePicker defaults its date to midnight. It makes more sense to consider the last hour of the day
                        // The offer is available between day x (00:00) and day y (23:59)
                        date.setHours(23, 59, 59, 0);
                        onChange(date);
                    }}
                    onBlur={onBlur}
                    variant="inline"
                    autoOk
                    format="yyyy-MM-dd"
                    minDate={fields?.publishDate}
                    error={!!errors?.publishEndDate ||
                        !!requestErrors?.publishEndDate}
                    helperText={errors?.publishEndDate?.message ||
                        requestErrors?.publishEndDate?.message || " "}
                    {...datePickerProps}
                />)}
            control={control}
        />
        {showInfoTooltip ?
            <Tooltip
                title="The offer will only be visible until this date"
                placement="top"
            >
                <Info fontSize="small" />
            </Tooltip>

            : ""
        }
    </>
);

PublicationEndDateComponent.propTypes = {
    fields: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    requestErrors: PropTypes.object,
    control: PropTypes.object.isRequired,
    datePickerProps: PropTypes.object,
    showInfoTooltip: PropTypes.bool,
};

export default PublicationEndDateComponent;

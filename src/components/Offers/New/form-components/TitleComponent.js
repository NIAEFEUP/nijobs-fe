import React from "react";
import { Controller } from "react-hook-form";
import { CreateOfferConstants } from "../CreateOfferUtils";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";


const TitleComponent = ({ disabled, errors, requestErrors, control }) => (
    <Controller
        name="title"
        render={(
            { field: { onChange, onBlur, ref, name, value } },
        ) => (
            <TextField
                name={name}
                value={value}
                label="Offer Title"
                id="title"
                error={!!errors.title || !!requestErrors.title}
                inputRef={ref}
                onBlur={onBlur}
                onChange={onChange}
                helperText={
                    `${value?.length}/${CreateOfferConstants.title.maxLength} 
                                        ${errors.title?.message || requestErrors.title?.message || ""}`
                }
                variant="outlined"
                margin="dense"
                fullWidth
                disabled={disabled}
            />)}
        control={control}
    />
);

TitleComponent.propTypes = {
    disabled: PropTypes.bool,
    errors: PropTypes.object,
    requestErrors: PropTypes.object,
    control: PropTypes.object.isRequired,
};

export default TitleComponent;

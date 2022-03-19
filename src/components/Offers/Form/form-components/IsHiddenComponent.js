import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel, Tooltip } from "@material-ui/core";
import { Info } from "@material-ui/icons";

const IsHiddenComponent = ({ disabled, control }) => (
    <>
        <FormControlLabel
            label="Hide offer"
            disabled={disabled}
            control={
                <Controller
                    name="isHidden"
                    render={(
                        { field: { onChange, onBlur, name, value } },
                    ) => (
                        <Checkbox
                            checked={value}
                            onChange={onChange}
                            name={name}
                            onBlur={onBlur}
                            disabled={disabled}
                        />
                    )}
                    control={control}
                />
            }
        />
        <Tooltip
            title="If the offer is hidden, users won't be able to see it"
            placement="top"
        >
            <Info fontSize="small" />
        </Tooltip>
    </>
);

IsHiddenComponent.propTypes = {
    disabled: PropTypes.bool,
    control: PropTypes.object.isRequired,
};

export default IsHiddenComponent;

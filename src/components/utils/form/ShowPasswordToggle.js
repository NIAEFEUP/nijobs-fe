import React from "react";
import PropTypes from "prop-types";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
    IconButton,
    Tooltip,
    FormControl,
} from "@material-ui/core";

const ShowPasswordToggle = ({ showPassword, toggleShowPassword, className }) => (
    <FormControl>
        <Tooltip
            title={showPassword ? "Hide Password" : "Show Password"}
            aria-label={showPassword ? "Hide Password" : "Show Password"}
            className={className}
        >
            <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
            >
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </Tooltip>
    </FormControl>
);

ShowPasswordToggle.propTypes = {
    showPassword: PropTypes.bool.isRequired,
    toggleShowPassword: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default ShowPasswordToggle;

import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const NextButton = ({ disabled, onClick, type, label }) => (
    <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={disabled}
        type={type}
    >
        {label}
    </Button>
);

NextButton.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(["submit", "button"]),
    label: PropTypes.oneOf(["Finish", "Next"]),
};

export default NextButton;

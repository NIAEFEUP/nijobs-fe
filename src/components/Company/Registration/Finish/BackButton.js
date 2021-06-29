import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const BackButton = ({ disabled, onClick }) => (
    <Button
        disabled={disabled}
        onClick={onClick}
        type="button"
    >
        Back
    </Button>
);

BackButton.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

export default BackButton;

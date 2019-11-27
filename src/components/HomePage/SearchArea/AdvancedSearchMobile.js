import React from "react";
import PropTypes from "prop-types";
import { IconButton, Button } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";


const AdvancedSearchMobile = ({ close, submitSearchForm }) => {
    const handleButtonClick = (e) => {
        e.preventDefault();
        submitSearchForm(e);
    };

    return (
        <div>
            <IconButton
                aria-label="search"
                onClick={close}
                color="secondary"
            >
                <ArrowBackIos />
            </IconButton>
        mobilerooo optioooons
            <Button onClick={handleButtonClick}>Search</Button>
        </div>
    );
};

AdvancedSearchMobile.propTypes = {
    close: PropTypes.func.required,
    submitSearchForm: PropTypes.func.required,
};

export default AdvancedSearchMobile;

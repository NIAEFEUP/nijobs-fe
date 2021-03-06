import React from "react";
import PropTypes from "prop-types";

import { Fab } from "@material-ui/core";
import { Close, MoreHoriz } from "@material-ui/icons";

const ShowAdvancedOptionsButton = ({ isOpen, onClick }) => (
    <div>
        <Fab
            color="primary"
            aria-label="Show More Options"
            onClick={onClick}
        >
            {isOpen ? <Close /> : <MoreHoriz fontSize="large" />}
        </Fab>
    </div>
);

ShowAdvancedOptionsButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default ShowAdvancedOptionsButton;

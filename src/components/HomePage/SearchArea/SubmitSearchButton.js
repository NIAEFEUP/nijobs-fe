import React from "react";
import PropTypes from "prop-types";

import { Fab } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import useSearchAreaStyle from "./searchAreaStyle";

const ShowAdvancedOptionsButton = ({ onClick, searchHasUserInput }) => {
    const classes = useSearchAreaStyle();
    return (
        <div className={classes.submitSearchButtonWrapper}>
            <Fab
                color="primary"
                aria-label="Search"
                onClick={onClick}
                variant="extended"
            >
                { searchHasUserInput ? <Search /> : <span>Show All</span> }
            </Fab>
        </div>
    );
};

ShowAdvancedOptionsButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    searchHasUserInput: PropTypes.bool.isRequired,
};

export default ShowAdvancedOptionsButton;

import React from "react";
import PropTypes from "prop-types";

import { Fab } from "@material-ui/core";

import useSearchAreaStyle from "./searchAreaStyle";

const SubmitSearchButton = ({ onClick, searchHasUserInput }) => {
    const classes = useSearchAreaStyle();
    return (
        <div className={classes.submitSearchButtonWrapper}>
            <Fab
                color="primary"
                aria-label="Search"
                variant="extended"
                onClick={onClick}
            >
                <span>
                    {searchHasUserInput
                        ? "Search"
                        : "Show All"}
                </span>
            </Fab>
        </div>
    );
};

SubmitSearchButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    searchHasUserInput: PropTypes.bool.isRequired,
};

export default SubmitSearchButton;

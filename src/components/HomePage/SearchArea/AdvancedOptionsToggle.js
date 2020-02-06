import React from "react";
import PropTypes from "prop-types";

import useSearchAreaStyles from "./searchAreaStyle";

import {
    IconButton,
    Badge,
    Tooltip,
} from "@material-ui/core";
import TuneRoundedIcon from "@material-ui/icons/TuneRounded";

const AdvancedOptionsToggle = ({ advancedOptions, advancedOptionsActive, handleAdvancedOptionsButtonClick }) => {
    const classes = useSearchAreaStyles();
    return (
        <IconButton
            className={classes.advancedSearchToggle}
            aria-label="Toggle Advanced Search"
            onClick={handleAdvancedOptionsButtonClick}
            color={advancedOptions ? "primary" : "secondary"}
            variant="contained"
        >
            <Tooltip
                title={advancedOptions ? "Hide Advanced Search" : "Show Advanced Search"}
                placement="top"
            >
                <Badge color="secondary" variant="dot" invisible={!advancedOptionsActive}>
                    <TuneRoundedIcon data-icon="TuneRoundedIcon" />
                </Badge>
            </Tooltip>
        </IconButton>
    );
};

AdvancedOptionsToggle.propTypes = {
    advancedOptions: PropTypes.bool.isRequired,
    advancedOptionsActive: PropTypes.bool.isRequired,
    handleAdvancedOptionsButtonClick: PropTypes.func.isRequired,
};

export default React.memo(AdvancedOptionsToggle);

import React from "react";
import PropTypes from "prop-types";
import {
    IconButton,
    TableCell,
} from "@material-ui/core";
import { RowPropTypes } from "../../../utils/Table/PropTypes";
import { ExpandMore, ExpandLess } from "@material-ui/icons";


const ActionButtons = ({ /* row, */isCollapseOpen, toggleCollapse }) => (
    <IconButton
        aria-label="More Actions"
        // edge="end"
        onClick={(e) => {
            e.stopPropagation(); toggleCollapse();
        }}
    >
        {!isCollapseOpen ? <ExpandMore /> : <ExpandLess />}
    </IconButton>
);

ActionButtons.propTypes = {
    // row: RowPropTypes,
    isCollapseOpen: PropTypes.bool.isRequired,
    toggleCollapse: PropTypes.func.isRequired,
};

const RowActionsContainer = ({
    row, isCollapseOpen, toggleCollapse,
}) => (
    <ActionButtons
        row={row}
        isCollapseOpen={isCollapseOpen}
        toggleCollapse={toggleCollapse}
    />
);

RowActionsContainer.propTypes = {
    row: RowPropTypes,
    isCollapseOpen: PropTypes.bool.isRequired,
    toggleCollapse: PropTypes.func.isRequired,
};

const BaseRowActions = ({
    row, isCollapseOpen, toggleCollapse,
}) => (
    <TableCell align="center">
        <RowActionsContainer
            row={row}
            isCollapseOpen={isCollapseOpen}
            toggleCollapse={toggleCollapse}
        />
    </TableCell>
);

BaseRowActions.propTypes = {
    isCollapseOpen: PropTypes.bool.isRequired,
    toggleCollapse: PropTypes.func.isRequired,
    row: RowPropTypes,
};

export const RowActions = BaseRowActions;

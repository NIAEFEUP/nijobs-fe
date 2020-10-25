import React from "react";
import PropTypes from "prop-types";
import { TableBody, TableCell, Checkbox, TableRow } from "@material-ui/core";
import { RowPropTypes } from "./PropTypes";

const generateTableCellFromField = (id, fieldId, fieldOptions, labelId) => {

    if (typeof fieldOptions.value === "function") {
        return fieldOptions.value();
    } else {
        return (
            <TableCell
                key={fieldId}
                id={id === 0 ? labelId : undefined}
                align={fieldOptions.align || "right"}
            >
                {fieldOptions.value}
            </TableCell>
        );
    }
};

const TableContent = ({ rows, handleSelect, isRowSelected, RowActions, submitUndoableAction, RowActionsProps }) => (
    <TableBody>
        {Object.entries(rows).map(([key, { fields }]) => {
            const labelId = `table-checkbox-${key}`;
            return (
                <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    onClick={(e) => handleSelect(e, key)}
                    key={key}
                    selected={isRowSelected(key)}
                >
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={isRowSelected(key)}
                            inputProps={{ "aria-labelledby": labelId }}
                        />
                    </TableCell>
                    {Object.entries(fields).map(([fieldId, fieldOptions], i) => (
                        generateTableCellFromField(i, fieldId, fieldOptions, labelId)
                    ))}
                    {RowActions &&
                    <RowActions
                        row={{ key, fields }}
                        submitUndoableAction={submitUndoableAction}
                        {...RowActionsProps}
                    />}

                </TableRow>
            );
        })}
    </TableBody>
);

TableContent.propTypes = {
    rows: PropTypes.objectOf(RowPropTypes),
    RowActions: PropTypes.elementType,
    handleSelect: PropTypes.func.isRequired,
    isRowSelected: PropTypes.func.isRequired,
    submitUndoableAction: PropTypes.func,
};

export default TableContent;

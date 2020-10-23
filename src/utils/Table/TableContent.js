import React from "react";
import PropTypes from "prop-types";
import { TableBody, TableCell, Checkbox, TableRow } from "@material-ui/core";
import { RowPropTypes } from "./PropTypes";

const generateTableCellFromField = (field, i, labelId) => {

    if (typeof field.value === "function") {
        return field.value();
    } else {
        return (
            <TableCell
                key={field.value}
                id={i === 0 ? labelId : undefined}
                align={field.align || "right"}
            >
                {field.value}
            </TableCell>
        );
    }
};

const TableContent = ({ rows, handleSelect, isRowSelected, RowActions, submitUndoableAction, addRow, removeRow }) => (
    <TableBody>
        {rows.map((row, index) => {
            const { key, fields } = row;
            const labelId = `table-checkbox-${index}`;
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
                    {fields.map((field, i) => (
                        generateTableCellFromField(field, i, labelId)

                    ))}
                    {RowActions &&
                    <RowActions
                        row={row}
                        submitUndoableAction={submitUndoableAction}
                        addRow={addRow}
                        removeRow={removeRow}
                    />}

                </TableRow>
            );
        })}
    </TableBody>
);

TableContent.propTypes = {
    rows: PropTypes.arrayOf(RowPropTypes),
    RowActions: PropTypes.elementType,
    handleSelect: PropTypes.func.isRequired,
    isRowSelected: PropTypes.func.isRequired,
    submitUndoableAction: PropTypes.func,
};

export default TableContent;

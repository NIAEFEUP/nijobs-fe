import React from "react";
import { TableCell } from "@material-ui/core";

export const getFieldValue = (row, column) => row.fields[column].value;

export const alphabeticalSorter = (isAscendingMode) => (a, b) => {
    if (a.field < b.field) return isAscendingMode ? -1 : 1;
    if (a.field > b.field) return isAscendingMode ? 1 : -1;
    return 0;
};

export const generateTableCellFromField = (id, fieldId, fieldOptions, labelId) => {
    const customComponent = fieldOptions?.customComponent;
    if (typeof fieldOptions.value === "function") {
        return fieldOptions.value();
    } else {
        if (customComponent) {
            return (
                <TableCell
                    key={fieldId}
                    id={id === 0 ? `${labelId}-label` : undefined}
                    align={fieldOptions.align || "right"}
                >
                    {customComponent}
                </TableCell>
            );
        } else {
            return (
                <TableCell
                    key={fieldId}
                    id={id === 0 ? `${labelId}-label` : undefined}
                    align={fieldOptions.align || "right"}
                >
                    {fieldOptions.value}
                </TableCell>
            );
        }
    }
};

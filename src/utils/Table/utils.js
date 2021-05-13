import React from "react";
import { TableCell } from "@material-ui/core";

export const getFieldValue = (row, column) => row.fields[column].value;

export const alphabeticalSorter = (isAscendingMode) => (a, b) => {
    if (a.field < b.field) return isAscendingMode ? -1 : 1;
    if (a.field > b.field) return isAscendingMode ? 1 : -1;
    return 0;
};

export const generateTableCellFromField = (id, fieldId, fieldOptions, labelId) => {

    if (typeof fieldOptions.value === "function") {
        return fieldOptions.value();
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
};

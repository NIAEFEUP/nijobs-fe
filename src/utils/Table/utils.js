import React from "react";
import { TableCell, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

export const getFieldValue = (row, column) => row.fields[column].value;

export const alphabeticalSorter = (isAscendingMode) => (a, b) => {
    if (a.field < b.field) return isAscendingMode ? -1 : 1;
    if (a.field > b.field) return isAscendingMode ? 1 : -1;
    return 0;
};

const useStyles = makeStyles({
    fieldLink: {
        color: "initial",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
            textUnderlineOffset: 2,
        },
    },
});

export const GenerateTableCellFromField = (id, fieldId, fieldOptions, labelId, extended = false) => {
    const classes = useStyles();

    const linkDestination = fieldOptions?.linkDestination;
    if (typeof fieldOptions.value === "function") {
        return fieldOptions.value();
    } else {
        return (
            <TableCell
                key={fieldId}
                id={id === 0 ? `${labelId}-label` : undefined}
                align={fieldOptions.align || "right"}
            >
                <div style={{ marginBlock: extended && "20px" }}>
                    {fieldOptions?.linkDestination ?
                        <Link to={linkDestination} className={classes.fieldLink}>
                            {fieldOptions?.value}
                        </Link> : fieldOptions.value}
                </div>
            </TableCell>
        );
    }
};

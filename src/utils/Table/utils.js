import React, { useState } from "react";
import { TableCell, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import OfferEndDateQuickEdit from "../../components/Offers/Edit/OfferEndDateQuickEdit";

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

export const GenerateTableCellFromField = (id, fieldId, fieldOptions, labelId) => {
    const [colValue, setColValue] = useState(fieldOptions?.value);
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

                {fieldOptions?.linkDestination ?
                    <Link to={linkDestination} className={classes.fieldLink}>
                        {colValue}
                    </Link> : ""}

                {fieldId === "publishEndDate"
                    ? <OfferEndDateQuickEdit 
                        offerId={labelId.split("-")[2]} 
                        setOfferId={setColValue}
                        dateValue={colValue}
                      />
                    : colValue}
            </TableCell>
        );
    }
};

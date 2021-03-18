import React from "react";
import PropTypes from "prop-types";
import { TableBody, TableCell, Checkbox, TableRow, Collapse, makeStyles } from "@material-ui/core";
import { RowFields, RowPayload, RowPropTypes } from "./PropTypes";
import useToggle from "../../hooks/useToggle";

const useStyles = makeStyles((theme) => ({
    rowDetails: {
        padding: theme.spacing(2),
    },
}));

<<<<<<< HEAD
const RenderTableRow = ({
=======
const CompanyApplicationRow = ({
>>>>>>> Refactored some Tables Components and created simple table for offers
    rowKey, fields, payload, rowProps, handleSelect, isRowSelected, RowActions,
    submitUndoableAction, RowActionsProps, context, RowComponent, RowCollapseComponent,
}) => {
    const [open, toggleOpen] = useToggle(false);
    const labelId = `table-checkbox-${rowKey}`;

    const classes = useStyles();

    return (
        <>
            <TableRow
                hover
                tabIndex={-1}
                onClick={(e) => handleSelect(e, rowKey)}
                key={rowKey}
                selected={isRowSelected(rowKey)}
                data-testid="application-row"
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={isRowSelected(rowKey)}
                        inputProps={{ "aria-labelledby": `${labelId}-label` }}
                    />
                </TableCell>
<<<<<<< HEAD
                <RowComponent rowKey={rowKey} labelId={labelId} />
=======
                {/* Object.entries(fields).map(([fieldId, fieldOptions], i) => (
                    generateTableCellFromField(i, fieldId, fieldOptions, labelId)
                ))*/
                    <RowComponent rowKey={rowKey} labelId={labelId} />
                }
>>>>>>> Refactored some Tables Components and created simple table for offers
                {RowActions &&
                    <RowActions
                        row={{ key: rowKey, fields, payload, ...rowProps }}
                        submitUndoableAction={submitUndoableAction}
                        isCollapseOpen={open}
                        toggleCollapse={toggleOpen}
                        context={context}
                        {...RowActionsProps}
                    />
                }
            </TableRow>
            {!!RowCollapseComponent &&
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={Object.keys(fields).length + 2}>
                    <Collapse in={open} timeout="auto" unmountOnExit className={classes.rowDetails}>
<<<<<<< HEAD
=======
                        {/* <Typography variant="subtitle2">
                            {payload.email}
                        </Typography>
                        <div className={classes.payloadSection}>
                            <Typography variant="body1">
                            Motivation
                            </Typography>
                            <Typography variant="body2">
                                {payload.motivation}
                            </Typography>
                        </div>

                        {fields.state.value === ApplicationStateLabel.REJECTED &&
                            <div className={classes.payloadSection}>
                                <Divider />
                                <Typography variant="body1">
                                    {`Reject Reason (Rejected at ${payload.rejectedAt})`}
                                </Typography>
                                <Typography variant="body2">
                                    {payload.rejectReason}
                                </Typography>
                            </div>
                        } */}
>>>>>>> Refactored some Tables Components and created simple table for offers
                        <RowCollapseComponent rowKey={rowKey} />
                    </Collapse>
                </TableCell>
            </TableRow>
            }
        </>
    );
};

RenderTableRow.propTypes = {
    rowKey: PropTypes.string.isRequired,
    fields: RowFields.isRequired,
    payload: RowPayload.isRequired,     // Need to check what to do with this propTypes (specific to Company Applications)
    rowProps: PropTypes.object.isRequired,
    handleSelect: PropTypes.func.isRequired,
    isRowSelected: PropTypes.func.isRequired,
    RowActions: PropTypes.elementType.isRequired,
    submitUndoableAction: PropTypes.func.isRequired,
    context: PropTypes.object,
    RowActionsProps: PropTypes.object,
<<<<<<< HEAD
    RowComponent: PropTypes.elementType.isRequired,
    RowCollapseComponent: PropTypes.elementType,
=======
    RowComponent: PropTypes.node.isRequired,
    RowCollapseComponent: PropTypes.node,
>>>>>>> Refactored some Tables Components and created simple table for offers
};

const TableContent = ({ rows, handleSelect, isRowSelected, RowActions, submitUndoableAction,
    RowActionsProps, emptyMessage, numColumns, context, RowComponent, RowCollapseComponent,
}) => (
    <TableBody>
        {Object.keys(rows).length === 0 ?
            <TableRow>
                <TableCell align="center" colSpan={numColumns + 1 /* This should depend whether this is selectable or not*/}>
                    {emptyMessage}
                </TableCell>
            </TableRow>
            : Object.entries(rows).map(([key, { fields, payload, ...rowProps }]) => (
                <RenderTableRow
                    key={key}
                    rowKey={key}
                    fields={fields}
                    payload={payload}
                    rowProps={rowProps}
                    handleSelect={handleSelect}
                    isRowSelected={isRowSelected}
                    RowActions={RowActions}
                    submitUndoableAction={submitUndoableAction}
                    RowActionsProps={RowActionsProps}
                    context={context}
                    RowComponent={RowComponent}
                    RowCollapseComponent={RowCollapseComponent}
                />
            ))}
    </TableBody>
);

TableContent.propTypes = {
    rows: PropTypes.objectOf(RowPropTypes),
    RowActions: PropTypes.elementType,
    RowActionsProps: PropTypes.object,
    handleSelect: PropTypes.func.isRequired,
    isRowSelected: PropTypes.func.isRequired,
    submitUndoableAction: PropTypes.func,
    emptyMessage: PropTypes.string,
    numColumns: PropTypes.number.isRequired,
    context: PropTypes.object,
<<<<<<< HEAD
    RowComponent: PropTypes.elementType.isRequired,
    RowCollapseComponent: PropTypes.elementType,
=======
    RowComponent: PropTypes.node.isRequired,
    RowCollapseComponent: PropTypes.node,
>>>>>>> Refactored some Tables Components and created simple table for offers
};

export default TableContent;

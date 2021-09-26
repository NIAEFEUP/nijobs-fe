import React from "react";
import PropTypes from "prop-types";
import { TableCell, Checkbox, TableRow as MUITableRow, Collapse, makeStyles } from "@material-ui/core";
import { RowFields, RowPayload, RowPropTypes } from "./PropTypes";
import useToggle from "../../hooks/useToggle";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    rowDetails: {
        padding: theme.spacing(2),
    },
}));

const TableRow = ({
    rowKey, fields, payload, rowProps, handleSelect, isRowSelected, RowActions,
    submitUndoableAction, RowActionsProps, context, RowContent, RowCollapseComponent, isSelectableTable,
}) => {
    const [open, toggleOpen] = useToggle(false);
    const labelId = `table-checkbox-${rowKey}`;

    const classes = useStyles();

    return (
        <>
            <MUITableRow
                hover
                tabIndex={-1}
                onClick={(e) => handleSelect(e, rowKey)}
                key={rowKey}
                selected={isRowSelected(rowKey)}
                data-testid="application-row"
            >
                {isSelectableTable &&
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={isRowSelected(rowKey)}
                        inputProps={{ "aria-labelledby": `${labelId}-label` }}
                    />
                </TableCell>}
                <RowContent rowKey={rowKey} labelId={labelId} />
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
            </MUITableRow>
            {!!RowCollapseComponent &&
            <MUITableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={Object.keys(fields).length + 2}>
                    <Collapse in={open} timeout="auto" unmountOnExit className={classes.rowDetails}>
                        <RowCollapseComponent rowKey={rowKey} />
                    </Collapse>
                </TableCell>
            </MUITableRow>
            }
        </>
    );
};

TableRow.propTypes = {
    rowKey: PropTypes.string.isRequired,
    fields: RowFields.isRequired,
    payload: RowPayload,     // Need to check what to do with this propTypes (specific to Company Applications)
    rowProps: PropTypes.object.isRequired,
    handleSelect: PropTypes.func.isRequired,
    isRowSelected: PropTypes.func.isRequired,
    RowActions: PropTypes.elementType,
    submitUndoableAction: PropTypes.func.isRequired,
    context: PropTypes.object,
    RowActionsProps: PropTypes.object,
    RowContent: PropTypes.elementType.isRequired,
    RowCollapseComponent: PropTypes.elementType,
    isSelectableTable: PropTypes.bool,
};

const TableContent = ({ rows, handleSelect, isRowSelected, RowActions, submitUndoableAction,
    RowActionsProps, emptyMessage, numColumns, context, RowContent, RowCollapseComponent, isSelectableTable, isLoading, error,
}) => {
    if (isLoading) {
        const rowsArray = [0, 1, 2, 3, 4];
        const iterableColArray = [];
        for (let idx = 0; idx < numColumns + (isSelectableTable ? 1 : 0); idx++) {
            iterableColArray.push({ key: idx });
        }
        return (
            rowsArray.map((rowIdx) => (
                <MUITableRow data-testid={`tableCellSkeleton-${rowIdx}`} key={rowIdx}>
                    {iterableColArray.map((element) => (
                        <TableCell
                            key={element.key}
                            align="right"
                        >
                            <Skeleton variant="rect" height={30} />
                        </TableCell>
                    ))}
                </MUITableRow>

            ))
        );
    } else if ((Object.keys(rows).length === 0) || error) {
        return (
            <MUITableRow>
                <TableCell align="center" colSpan={numColumns + (isSelectableTable ? 1 : 0)}>
                    {emptyMessage}
                </TableCell>
            </MUITableRow>
        );
    } else {
        return (
            Object.entries(rows).map(([key, { fields, payload, ...rowProps }]) => (
                <TableRow
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
                    RowContent={RowContent}
                    RowCollapseComponent={RowCollapseComponent}
                    isSelectableTable={isSelectableTable}
                />
            ))
        );
    }
};

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
    RowContent: PropTypes.elementType.isRequired,
    RowCollapseComponent: PropTypes.elementType,
    isSelectableTable: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
};

export default TableContent;

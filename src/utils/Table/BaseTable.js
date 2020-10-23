import React, { useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { Button, Paper, Table, TableContainer, TablePagination } from "@material-ui/core";
import { UndoableActions } from "../UndoableActionsHandlerProvider";
import TableContent from "./TableContent";
import TableHeader from "./TableHeader";
import TableToolbar from "./TableToolbar";
import { ColumnPropTypes, RowPropTypes } from "./PropTypes";

const BaseTable = ({
    title,
    columns,
    rows,
    setRows,
    numSelected,
    selectedRows,
    // setSelectedItems,
    filterable = false,
    filters,
    hasActiveFilters = false,
    setActiveFilters,
    sortable = false,
    stickyHeader,
    order,
    orderBy,
    handleOrderBy,
    handleSelectAll,
    handleSelect,
    isRowSelected,
    onPageChange,
    RowActions,
    MultiRowActions,
    rowsPerPage: initialRowsPerPage = 10,
    TableToolbarProps = {},
}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        onPageChange();
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        onPageChange();
    };

    const addRow = useCallback(
        (row) => {
            setRows((rows) => ([
                ...rows,
                row,
            ]));
        },
        [setRows],
    );

    const removeRow = useCallback(
        (rowId) => {
            setRows((rows) =>
                // eslint-disable-next-line no-unused-vars
                rows.filter((row) => row.key !== rowId)
            );
        },
        [setRows],
    );

    const { submitAction } = useContext(UndoableActions);

    const onDone = () => console.log("The timeout passed and the action has been done");
    const onCancelled = () => console.log("The action has been cancelled, do something in UI to simulate undo");

    const testUndo = () => {
        submitAction(
            Math.random().toString(36).substring(7),
            "This action was executed",
            onDone,
            onCancelled,
            5000
        );
    };
    return (
        <>
            <Button onClick={testUndo}>Generate Action</Button>
            <TableToolbar
                selectedRows={selectedRows}
                title={title || ""}
                numSelected={numSelected}
                filterable={filterable}
                filters={filters}
                hasActiveFilters={hasActiveFilters}
                setActiveFilters={setActiveFilters}
                MultiRowActions={MultiRowActions}
                {...TableToolbarProps}
            />
            <TableContainer component={Paper} style={{ maxHeight: "51vh" }}>
                <Table stickyHeader={stickyHeader}>
                    <TableHeader
                        columns={columns}
                        handleSelectAllClick={handleSelectAll(page, rowsPerPage)}
                        checkboxIndeterminate={numSelected > 0 && numSelected < rowsPerPage}
                        allChecked={rows.length > 0 && numSelected === rowsPerPage}
                        sortable={sortable}
                        order={order}
                        orderBy={orderBy}
                        handleOrderBy={handleOrderBy}
                    />
                    <TableContent
                        rows={rows.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)}
                        addRow={addRow}
                        removeRow={removeRow}
                        handleSelect={handleSelect}
                        isRowSelected={isRowSelected}
                        submitUndoableAction={submitAction}
                        RowActions={RowActions}
                    />
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length} // TODO change this to have total number of rows, even the ones not fetched yet
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                backIconButtonProps={{ color: "secondary" }}
                nextIconButtonProps={{ color: "secondary" }}
            />
        </>
    );
};

BaseTable.propTypes = {
    title: PropTypes.string,
    rows: PropTypes.arrayOf(RowPropTypes),
    setRows: PropTypes.func.isRequired,
    columns: PropTypes.objectOf(ColumnPropTypes),
    sortable: PropTypes.bool,
    hasActiveFilters: PropTypes.bool,
    stickyHeader: PropTypes.bool,
    order: PropTypes.oneOf(["asc", "desc"]),
    orderBy: PropTypes.number,
    handleOrderBy: PropTypes.func,
    RowActions: PropTypes.elementType,
    MultiRowActions: PropTypes.elementType,
    rowsPerPage: PropTypes.number,
    filterable: PropTypes.bool,
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            render: PropTypes.elementType.isRequired,
            id: PropTypes.string.isRequired,
        })
    ),
    setActiveFilters: PropTypes.func,
    numSelected: PropTypes.number,
    selectedRows: PropTypes.arrayOf(RowPropTypes),
    handleSelectAll: PropTypes.func,
    handleSelect: PropTypes.func,
    isRowSelected: PropTypes.func,
    onPageChange: PropTypes.func,
    TableToolbarProps: PropTypes.shape({
        activeFilters: PropTypes.object,
    }),
};

export default BaseTable;

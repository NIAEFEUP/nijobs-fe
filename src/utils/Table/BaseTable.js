import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Paper, Table, TableContainer, TablePagination } from "@material-ui/core";
import { UndoableActions } from "../UndoableActionsHandlerProvider";
import TableContent from "./TableContent";
import TableHeader from "./TableHeader";
import TableToolbar from "./TableToolbar";
import { ColumnPropTypes, RowPropTypes } from "./PropTypes";

const BaseTable = ({
    title,
    columns,
    rows,
    numSelected,
    selectedRows,
    filterable = false,
    filters,
    filtersContext,
    setFiltersContext,
    activeFilters,
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
    RowActionsProps,
    MultiRowActions,
    emptyMessage = "No rows to show",
    rowsPerPage: initialRowsPerPage = 10,
    TableToolbarProps = {},
    context,
    RowComponent,
    RowCollapseComponent,
}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);

    // Reset page every time filters change
    useEffect(() => {
        setPage(0);
    }, [activeFilters]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        onPageChange();
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        onPageChange();
    };

    const { submitAction } = useContext(UndoableActions);

    const numRowsCurrentPage = Object.keys(rows).length < rowsPerPage ? Object.keys(rows).length :
        Object.keys(rows).slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).length;

    return (
        <>
            <TableToolbar
                selectedRows={selectedRows}
                title={title || ""}
                numSelected={numSelected}
                filterable={filterable}
                filters={filters}
                filtersContext={filtersContext}
                setFiltersContext={setFiltersContext}
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
                        checkboxIndeterminate={numSelected > 0 && numSelected < numRowsCurrentPage}
                        allChecked={Object.keys(rows).length > 0 && numSelected === numRowsCurrentPage}
                        sortable={sortable}
                        order={order}
                        orderBy={orderBy}
                        handleOrderBy={handleOrderBy}
                    />
                    <TableContent
                        numColumns={Object.keys(columns).length}
                        rows={Object.entries(rows)
                            .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                            .reduce((rows, [key, row]) => ({ ...rows, [key]: row }), {})}
                        handleSelect={handleSelect}
                        isRowSelected={isRowSelected}
                        submitUndoableAction={submitAction}
                        RowActions={RowActions}
                        RowActionsProps={RowActionsProps}
                        emptyMessage={emptyMessage}
                        context={context}
                        RowComponent={RowComponent}
                        RowCollapseComponent={RowCollapseComponent}
                    />
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={Object.keys(rows).length} // TODO change this to have total number of rows, even the ones not fetched yet
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
    rows: PropTypes.objectOf(RowPropTypes),
    columns: PropTypes.objectOf(ColumnPropTypes),
    sortable: PropTypes.bool,
    activeFilters: PropTypes.object,
    hasActiveFilters: PropTypes.bool,
    stickyHeader: PropTypes.bool,
    order: PropTypes.oneOf(["asc", "desc"]),
    orderBy: PropTypes.string,
    handleOrderBy: PropTypes.func,
    RowActions: PropTypes.elementType,
    RowActionsProps: PropTypes.object,
    MultiRowActions: PropTypes.elementType,
    rowsPerPage: PropTypes.number,
    filterable: PropTypes.bool,
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            render: PropTypes.elementType.isRequired,
            id: PropTypes.string.isRequired,
        })
    ),
    filtersContext: PropTypes.object.isRequired,
    setFiltersContext: PropTypes.func.isRequired,
    emptyMessage: PropTypes.string,
    setActiveFilters: PropTypes.func,
    numSelected: PropTypes.number,
    selectedRows: PropTypes.arrayOf(PropTypes.string),
    handleSelectAll: PropTypes.func,
    handleSelect: PropTypes.func,
    isRowSelected: PropTypes.func,
    onPageChange: PropTypes.func,
    TableToolbarProps: PropTypes.shape({
        activeFilters: PropTypes.object,
    }),
    context: PropTypes.object,
    RowComponent: PropTypes.node,
    RowCollapseComponent: PropTypes.node,
};

export default BaseTable;

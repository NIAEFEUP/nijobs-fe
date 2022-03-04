import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, Paper, Table, TableContainer, TablePagination } from "@material-ui/core";
import { UndoableActions } from "../UndoableActionsHandlerProvider";
import TableContent from "./TableContent";
import TableHeader from "./TableHeader";
import TableToolbar from "./TableToolbar";
import { ColumnPropTypes, RowPropTypes } from "./PropTypes";
import { useMobile } from "../media-queries";
import { flow } from "lodash";

const useStyles = (hasMaxheight) => makeStyles(() => ({
    tableContainer: {
        ...(hasMaxheight ? {
            maxHeight: "51vh",
        } : {}),
    },
}));

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
    RowContent,
    RowCollapseComponent,
    isSelectableTable,
    isLoading,
    error,
    hasMaxHeight = false,
    mobileColumns,
    hideMobileTitle = true,
}) => {
    const isMobile = useMobile();
    const classes = useStyles(hasMaxHeight)();

    const headerCols = isMobile ? flow([
        Object.entries,
        (arr) => arr.filter(([colKey, _]) => mobileColumns.includes(colKey)),
        Object.fromEntries,
    ])(columns) : columns;

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
                hideMobileTitle={hideMobileTitle}
                isMobile={isMobile}
                {...TableToolbarProps}
            />
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table stickyHeader={stickyHeader}>
                    <TableHeader
                        columns={headerCols}
                        handleSelectAllClick={handleSelectAll(page, rowsPerPage)}
                        checkboxIndeterminate={numSelected > 0 && numSelected < numRowsCurrentPage}
                        allChecked={Object.keys(rows).length > 0 && numSelected === numRowsCurrentPage}
                        sortable={sortable}
                        order={order}
                        orderBy={orderBy}
                        handleOrderBy={handleOrderBy}
                        isSelectableTable={isSelectableTable && !isMobile}
                        isMobile={isMobile}
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
                        RowContent={RowContent}
                        RowCollapseComponent={RowCollapseComponent}
                        isSelectableTable={isSelectableTable && !isMobile}
                        isLoading={isLoading}
                        error={error}
                        rowsPerPage={rowsPerPage}
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
                {
                    ...(!hasMaxHeight && {
                        SelectProps: {
                            inputProps: {
                                "aria-label": "Rows per page",
                            },
                            native: true,
                        },
                    })
                }
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
    RowContent: PropTypes.elementType.isRequired,
    RowCollapseComponent: PropTypes.elementType,
    isSelectableTable: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
    hasMaxHeight: PropTypes.bool,
    mobileColumns: PropTypes.array.isRequired,
    hideMobileTitle: PropTypes.bool,
};

export default BaseTable;

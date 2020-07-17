import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
    Table,
    TablePagination,
    TableContainer,
    Paper,
} from "@material-ui/core";

import { RowPropTypes, ColumnPropTypes } from "./PropTypes";
import TableToolbar from "./TableToolbar";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

const SelectableTable = ({
    title,
    columns,
    rows,
    // setSelectedItems,
    filterable = false,
    filters,
    setActiveFilters,
    sortable = false,
    stickyHeader,
    order,
    orderBy,
    handleOrderBy,
    RowActions,
    MultiRowActions,
    rowsPerPage: initialRowsPerPage = 10,
}) => {
    const [selected, setSelected] = useState({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);

    const isRowSelected = useCallback(
        // eslint-disable-next-line no-prototype-builtins
        (rowKey) => selected.hasOwnProperty(rowKey),
        [selected],
    );

    const resetSelected = () => {
        setSelected({});
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        resetSelected();
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        resetSelected();
    };

    const handleSelect = (event, name) => {

        if (isRowSelected(name)) {
            // eslint-disable-next-line no-unused-vars
            const { [name]: keyToDelete, ...newSelected } = selected;
            setSelected(newSelected);
        } else {
            setSelected((selected) => ({ ...selected, [name]: true }));
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = { ...selected };
            rows
                .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                .forEach(({ key }) => {
                    newSelected[key] = true;
                });
            setSelected(newSelected);
            return;
        }
        resetSelected();
    };

    const numSelected = Object.keys(selected).length;

    return (
        <>
            <TableToolbar
                selectedRows={rows.filter((r) => isRowSelected(r.key))}
                title={title || ""}
                numSelected={numSelected}
                filterable={filterable}
                filters={filters}
                setActiveFilters={setActiveFilters}
                MultiRowActions={MultiRowActions}
            />
            <TableContainer component={Paper} style={{ maxHeight: "51vh" }}>
                <Table stickyHeader={stickyHeader}>
                    <TableHeader
                        columns={columns}
                        handleSelectAllClick={handleSelectAllClick}
                        checkboxIndeterminate={numSelected > 0 && numSelected < rowsPerPage}
                        allChecked={rows.length > 0 && numSelected === rowsPerPage}
                        sortable={sortable}
                        order={order}
                        orderBy={orderBy}
                        handleOrderBy={handleOrderBy}
                    />
                    <TableContent
                        rows={rows.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)}
                        handleSelect={handleSelect}
                        isRowSelected={isRowSelected}
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

SelectableTable.propTypes = {
    title: PropTypes.string,
    rows: PropTypes.arrayOf(RowPropTypes),
    columns: PropTypes.objectOf(ColumnPropTypes),
    sortable: PropTypes.bool,
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
};

export default SelectableTable;

import React, { useState, useCallback, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
    Table,
    TablePagination,
    TableContainer,
    Paper,
    Button,
} from "@material-ui/core";

import { RowPropTypes, ColumnPropTypes } from "./PropTypes";
import TableToolbar from "./TableToolbar";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import { UndoableActions } from "../../utils/UndoableActionsHandlerProvider";


const SelectableTable = (props) => {

    const {
        title,
        columns,
        rows,
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
        RowActions,
        MultiRowActions,
        rowsPerPage: initialRowsPerPage = 10,
        TableToolbarProps = {},
    } = props;

    const [selected, setSelected] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);

    const isRowSelected = useCallback(
        // eslint-disable-next-line no-prototype-builtins
        (rowKey) => selected.hasOwnProperty(rowKey),
        [selected],
    );

    useEffect(() => {
        setSelectedRows(rows.filter((r) => isRowSelected(r.key)));
    }, [isRowSelected, rows]);

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
};

export default SelectableTable;

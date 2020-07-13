import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    TableBody,
    Checkbox,
    TablePagination,
    TableContainer,
    Paper,
} from "@material-ui/core";

import { RowPropTypes, ColumnPropTypes } from "./PropTypes";
import TableToolbar from "./TableToolbar";

const generateTableCellFromField = (field, i, labelId) => {

    if (typeof field.value === "function") {
        return field.value();
    } else {
        return (
            <TableCell
                key={field.value}
                id={i === 0 ? labelId : undefined}
                align={field.align || "right"}
            >
                {field.value}
            </TableCell>
        );
    }
};

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
    rowsPerPage: initialRowsPerPage = 10,
}) => {
    const [selected, setSelected] = useState({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);

    const isSelected = useCallback(
        // eslint-disable-next-line no-prototype-builtins
        (row) => selected.hasOwnProperty(row),
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

        if (isSelected(name)) {
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
                title={title || ""}
                numSelected={numSelected}
                filterable={filterable}
                filters={filters}
                setActiveFilters={setActiveFilters}
            />
            <TableContainer component={Paper} style={{ maxHeight: "51vh" }}>
                <Table
                    stickyHeader={stickyHeader}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={numSelected > 0 && numSelected < rowsPerPage}
                                    checked={rows.length > 0 && numSelected === rowsPerPage}
                                    onChange={handleSelectAllClick}
                                    inputProps={{ "aria-label": "select all desserts" }}
                                />
                            </TableCell>
                            {Object.entries(columns).map(([key, props], i) => (
                                <TableCell
                                    key={key}
                                    align={props.align}
                                    padding={props.disablePadding ? "none" : "default"}
                                >
                                    <TableSortLabel
                                        hideSortIcon={!sortable || props.disableSorting}
                                        disabled={!sortable || props.disableSorting}
                                        active={orderBy === i}
                                        direction={orderBy === i ? order : "asc"}
                                        onClick={() => handleOrderBy(key, i)}
                                    >
                                        {props.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                            .map((row, index) => {
                                const { key, fields } = row;
                                const labelId = `table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        onClick={(e) => handleSelect(e, key)}
                                        key={key}
                                        selected={isSelected(key)}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected(key)}
                                                inputProps={{ "aria-labelledby": labelId }}
                                            />
                                        </TableCell>
                                        {fields.map((field, i) => (
                                            generateTableCellFromField(field, i, labelId)

                                        ))}
                                        {RowActions && <RowActions row={row} index={index}/>}

                                    </TableRow>
                                );
                            })}
                    </TableBody>
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

import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    TableBody,
    IconButton,
    Checkbox,
} from "@material-ui/core";

import { Check, Clear, MoreHoriz } from "@material-ui/icons";

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
    columns,
    rows,
    // setSelectedItems,
    sortable = false,
    stickyHeader,
    order,
    orderBy,
    handleOrderBy,
}) => {
    const [selected, setSelected] = useState({});

    const isSelected = useCallback(
        // eslint-disable-next-line no-prototype-builtins
        (row) => selected.hasOwnProperty(row),
        [selected],
    );

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
            const newSelected = {};
            rows.forEach(({ key }) => {
                newSelected[key] = true;
            });
            setSelected(newSelected);
            return;
        }
        setSelected({});
    };

    const numSelected = Object.keys(selected).length;

    return (
        <Table
            stickyHeader={stickyHeader}
        >
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rows.length}
                            checked={rows.length > 0 && numSelected === rows.length}
                            onChange={handleSelectAllClick}
                            inputProps={{ "aria-label": "select all desserts" }}
                        />
                    </TableCell>
                    {columns.map((column, i) => (
                        <TableCell
                            key={column.key}
                            align={column.align}
                            padding={column.disablePadding ? "none" : "default"}
                        >
                            <TableSortLabel
                                hideSortIcon={!sortable || column.disableSorting}
                                disabled={column.disableSorting}
                                active={orderBy === i}
                                direction={orderBy === i ? order : "asc"}
                                onClick={() => handleOrderBy(i)}
                            >
                                {column.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(({ key, fields }, index) => {
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
                            <TableCell align="right">
                                <IconButton aria-label="accept">
                                    <Check />
                                </IconButton>
                                <IconButton aria-label="reject">
                                    <Clear />
                                </IconButton>
                                <IconButton aria-label="more actions" edge="end">
                                    <MoreHoriz />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

SelectableTable.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            fields: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
                    align: PropTypes.oneOf(["left", "center", "right", "inherit", "justify"]),
                }),
            ).isRequired,
        })
    ),
    columns: PropTypes.arrayOf(
        PropTypes.shape(
            {
                key: PropTypes.string.isRequired,
                align: PropTypes.oneOf(["left", "center", "right", "inherit", "justify"]),
                disablePadding: PropTypes.bool,
                label: PropTypes.string.isRequired,
            },
        )
    ),
    sortable: PropTypes.bool,
    stickyHeader: PropTypes.bool,
    order: PropTypes.oneOf(["asc", "desc"]),
    orderBy: PropTypes.number,
    handleOrderBy: PropTypes.func,
};

export default SelectableTable;

import React from "react";
import PropTypes from "prop-types";
import { TableHead, TableRow, TableCell, Checkbox, makeStyles, TableSortLabel } from "@material-ui/core";
import { ColumnPropTypes } from "./PropTypes";

const useStyles = makeStyles((theme) => ({
    columnLabel: {
        color: "white",
        // eslint-disable-next-line max-len
        "&:active, &:hover, &.MuiTableSortLabel-active, &.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon": {
            color: "white",
        },
    },
    checkbox: {
        color: "white",
        "&:checked": {
            color: "white",
        },
    },
    headRow: {
        backgroundColor: theme.palette.primary.main,
    },
}));

const TableHeader = ({
    columns,
    handleSelectAllClick,
    allChecked,
    checkboxIndeterminate,
    sortable,
    order,
    orderBy,
    handleOrderBy,
}) => {
    const classes = useStyles();
    return (
        <TableHead>
            <TableRow>
                <TableCell
                    padding="checkbox"
                    classes={{ head: classes.headRow }}
                >
                    <Checkbox
                        indeterminate={checkboxIndeterminate}
                        checked={allChecked}
                        onChange={handleSelectAllClick}
                        inputProps={{ "aria-label": "select all applications on current page" }}
                        color="default"
                        classes={{ root: classes.checkbox }}
                    />
                </TableCell>
                {Object.entries(columns).map(([key, { align, disablePadding, disableSorting, label }], i) => (
                    <TableCell
                        key={key}
                        align={align}
                        padding={disablePadding ? "none" : "default"}
                        classes={{
                            head: classes.headRow,
                        }}
                        className={classes.columnLabel}
                    >
                        <TableSortLabel
                            hideSortIcon={!sortable || disableSorting}
                            disabled={!sortable || disableSorting}
                            active={orderBy === i}
                            direction={orderBy === i ? order : "asc"}
                            onClick={() => handleOrderBy(key, i)}
                            classes={{ root: classes.columnLabel }}
                        >
                            {label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

TableHeader.propTypes = {
    columns: PropTypes.objectOf(ColumnPropTypes),
    sortable: PropTypes.bool,
    order: PropTypes.oneOf(["asc", "desc"]),
    orderBy: PropTypes.number,
    handleOrderBy: PropTypes.func,
    handleSelectAllClick: PropTypes.func,
    allChecked: PropTypes.bool,
    checkboxIndeterminate: PropTypes.bool,
};

export default TableHeader;

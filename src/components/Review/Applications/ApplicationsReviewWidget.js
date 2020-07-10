import React from "react";
// import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Table,
    TableContainer,
    Paper,
    TableCell,
    TableBody,
    TableRow,
    Button,
    TableSortLabel,
    TableHead,
    // TableSortLabel,
} from "@material-ui/core";

const generateRowData = (name, date, status) => ({ name, date, status });

const demoRows = [
    generateRowData("Natixis", "2020-06-23", "REJECTED"),
    generateRowData("Fraunhofer", "2020-04-13", "PENDING"),
    generateRowData("Critical Software", "2019-12-23", "PENDING"),
    generateRowData("BLIP", "2020-02-02", "PENDING"),
    generateRowData("KPMG", "2020-04-23", "PENDING"),
];

const columns = [
    { id: "name", align: "left", disablePadding: true, label: "Company Name" },
    { id: "date", align: "right", disablePadding: false, label: "Requested At" },
    { id: "status", align: "right", disablePadding: false, label: "Status" },
    { id: "actions", align: "right", disablePadding: false, label: "Actions" },
];

const ApplicationsReviewWidget = () => (
    <Dialog
        open
        fullScreen
    >
        <DialogTitle>
            Applications Review
        </DialogTitle>
        <DialogContent>
            <TableContainer component={Paper} style={{ width: "60%" }}>
                <Table
                    stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    padding={column.disablePadding ? "none" : "default"}
                                    // sortDirection={orderBy === column.id ? order : false}
                                >
                                    <TableSortLabel >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {demoRows.map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.name}
                                >
                                    <TableCell component="th" id={labelId} scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.date}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.status}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button>Actions Buttons</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

            </TableContainer>
        </DialogContent>
    </Dialog>
);

ApplicationsReviewWidget.propTypes = {

};

export default ApplicationsReviewWidget;

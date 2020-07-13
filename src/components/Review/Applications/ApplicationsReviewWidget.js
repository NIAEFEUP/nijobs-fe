import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TableCell,
    IconButton,
    FormControlLabel,
    Checkbox,
    Switch,
} from "@material-ui/core";
import { Check, Clear, MoreHoriz } from "@material-ui/icons";

import { RowPropTypes } from "../../../utils/Table/PropTypes";
import FilterableTable from "../../../utils/Table/FilterableTable";
import { SortableSelectableTable } from "../../../utils/Table/SortableSelectableTable";

const demoRows = [
    { key: "1nat", fields: [{ value: "Natixis", align: "left" }, { value: "2020-06-23" }, { value: "REJECTED" }] },
    { key: "1fra", fields: [{ value: "Fraunhofer", align: "left" }, { value: "2020-04-13" }, { value: "PENDING" }] },
    { key: "1cs", fields: [{ value: "Critical Software", align: "left" }, { value: "2019-12-23" }, { value: "PENDING" }] },
    { key: "1blp", fields: [{ value: "BLIP", align: "left" }, { value: "2020-02-02" }, { value: "APPROVED" }] },
    { key: "1kp", fields: [{ value: "KPMG", align: "left" }, { value: "2020-04-23" }, { value: "PENDING" }] },
    { key: "2fra", fields: [{ value: "Fraunhofer", align: "left" }, { value: "2020-04-13" }, { value: "PENDING" }] },
    { key: "2cs", fields: [{ value: "Critical Software", align: "left" }, { value: "2019-12-23" }, { value: "PENDING" }] },
    { key: "2nat", fields: [{ value: "Natixis", align: "left" }, { value: "2020-06-23" }, { value: "REJECTED" }] },
    { key: "2blp", fields: [{ value: "BLIP", align: "left" }, { value: "2020-02-02" }, { value: "PENDING" }] },
    { key: "2kp", fields: [{ value: "KPMG", align: "left" }, { value: "2020-04-23" }, { value: "PENDING" }] },
    { key: "3fra", fields: [{ value: "Fraunhofer", align: "left" }, { value: "2020-04-13" }, { value: "PENDING" }] },
    { key: "3kp", fields: [{ value: "KPMG", align: "left" }, { value: "2020-04-23" }, { value: "PENDING" }] },
    { key: "3cs", fields: [{ value: "Critical Software", align: "left" }, { value: "2019-12-23" }, { value: "PENDING" }] },
    { key: "3nat", fields: [{ value: "Natixis", align: "left" }, { value: "2020-06-23" }, { value: "REJECTED" }] },
    { key: "3cs2", fields: [{ value: "Critical Software", align: "left" }, { value: "2019-12-23" }, { value: "PENDING" }] },
    { key: "4nat", fields: [{ value: "Natixis", align: "left" }, { value: "2020-06-23" }, { value: "REJECTED" }] },
    { key: "4blp", fields: [{ value: "BLIP", align: "left" }, { value: "2020-02-02" }, { value: "PENDING" }] },
    { key: "4fra", fields: [{ value: "Fraunhofer", align: "left" }, { value: "2020-04-13" }, { value: "PENDING" }] },
    { key: "4blp2", fields: [{ value: "BLIP", align: "left" }, { value: "2020-02-02" }, { value: "PENDING" }] },
    { key: "4kp", fields: [{ value: "KPMG", align: "left" }, { value: "2020-04-23" }, { value: "PENDING" }] },
];

const columns = {
    name: { align: "left", disablePadding: true, label: "Company Name" },
    date: { align: "right", disablePadding: false, label: "Requested At" },
    status: { align: "right", disablePadding: false, label: "Status" },
    actions: { align: "right", disablePadding: false, label: "Actions", disableSorting: true },
};

const getFieldValue = (row, column) => {
    const colIdx = Object.keys(columns).indexOf(column);

    return row.fields[colIdx].value;
};

const genericSorter = (isAscendingMode) => (a, b) => {
    if (a.field < b.field) return isAscendingMode ? -1 : 1;
    if (a.field > b.field) return isAscendingMode ? 1 : -1;
    return 0;
};

const sorters = {
    name: genericSorter,
    date: genericSorter,
    status: genericSorter,
};

const TestFilter = React.forwardRef(({ setActiveFilters, id }, ref) => {
    // TODO use const enum of status
    const [filteredStatus, setFilteredStatus] = useState({});


    const handleChange = (event) => {
        if (event.target.checked) {
            setFilteredStatus((filteredStatus) => ({ ...filteredStatus, [event.target.name]: event.target.checked }));

        } else {
            // eslint-disable-next-line no-unused-vars
            const {  [event.target.name]: keyToBeRemoved, ...newObj } = filteredStatus;
            setFilteredStatus(newObj);

        }

    };
    useEffect(() => {
        if (Object.keys(filteredStatus).length > 0) {
            setActiveFilters((filters) => ({
                ...filters,
                [id]: (rows) => rows.filter((row) => Object.keys(filteredStatus).includes(getFieldValue(row, "status"))),
            }));
        } else {
            setActiveFilters((filters) => {
                // eslint-disable-next-line no-unused-vars
                const { [id]: keyToBeRemoved, ...newFilters } = filters;
                return newFilters;
            });
        }
    }, [filteredStatus, id, setActiveFilters]);

    return (
        <div ref={ref}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={filteredStatus.APPROVED || false}
                        onChange={handleChange}
                        name="APPROVED"
                        color="primary"
                    />
                }
                label="Approved"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={filteredStatus.PENDING || false}
                        onChange={handleChange}
                        name="PENDING"
                        color="primary"
                    />
                }
                label="Pending"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={filteredStatus.REJECTED || false}
                        onChange={handleChange}
                        name="REJECTED"
                        color="primary"
                    />
                }
                label="Rejected"
            />
        </div>
    );
});

TestFilter.displayName = "TestFilter";

const BlipFilter = React.forwardRef(({ setActiveFilters, id }, ref) => {
    // TODO use const enum of status
    const [active, setActive] = useState(false);


    const handleChange = () => {

        setActive((n) => !n);

    };

    useEffect(() => {
        if (active) {
            setActiveFilters((filters) => ({
                ...filters,
                [id]: (rows) => rows.filter((row) => getFieldValue(row, "name") === "BLIP"),
            }));
        } else {
            setActiveFilters((filters) => {
                // eslint-disable-next-line no-unused-vars
                const { [id]: keyToBeRemoved, ...newFilters } = filters;
                return newFilters;
            });

        }
    }, [active, id, setActiveFilters]);

    return (
        <FormControlLabel
            ref={ref}
            control={<Switch checked={active} onChange={handleChange} />}
            label="Blip only"
        />
    );
});
BlipFilter.displayName = "BlipFilter";

const filters = [
    { id: "blip-only", render: BlipFilter },
    { id: "test", render: TestFilter },
];


const RowActions = ({ row }) => (
    <TableCell align="right">
        {getFieldValue(row, "status") === "PENDING" &&
            <>
                <IconButton aria-label="accept">
                    <Check />
                </IconButton>
                <IconButton aria-label="reject">
                    <Clear />
                </IconButton>
            </>
        }
        <IconButton aria-label="more actions" edge="end">
            <MoreHoriz />
        </IconButton>
    </TableCell>
);

RowActions.propTypes = {
    row: RowPropTypes,
};

const ApplicationsReviewWidget = () => (
    <Dialog
        open
        fullScreen
    >
        <DialogTitle>
            Applications Review
        </DialogTitle>
        <DialogContent>
            <div style={{ width: "60%" }}>
                <FilterableTable
                    title="Applications"
                    tableComponent={SortableSelectableTable}
                    rows={demoRows}
                    columns={columns}
                    sorters={sorters}
                    filters={filters}
                    RowActions={RowActions}
                    rowsPerPage={5}
                    stickyHeader
                />
            </div>
        </DialogContent>
    </Dialog>
);

ApplicationsReviewWidget.propTypes = {

};

export default ApplicationsReviewWidget;

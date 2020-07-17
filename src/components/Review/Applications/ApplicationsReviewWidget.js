import React from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TableCell,
    IconButton,
    Paper,
} from "@material-ui/core";
import { Check, Clear, MoreHoriz } from "@material-ui/icons";

import { RowPropTypes } from "../../../utils/Table/PropTypes";
import FilterableTable from "../../../utils/Table/FilterableTable";
import { SortableSelectableTable } from "../../../utils/Table/SortableSelectableTable";
import { getFieldValue } from "../../../utils/Table/utils";
import SelectFilter from "../../../utils/Table/Filters/SelectFilter";
import TextSearchFilter from "../../../utils/Table/Filters/TextSearchFilter";

const ApplicationStatusLabel = Object.freeze({
    APPROVED: "Approved",
    PENDING: "Pending",
    REJECTED: "Rejected",
});

const demoRows = [
    { key: "1nat", fields: [{ value: "Natixis", align: "left" }, { value: "2020-06-23" }, { value: ApplicationStatusLabel.REJECTED }] },
    { key: "1fra", fields: [{ value: "Fraunhofer", align: "left" }, { value: "2020-04-13" }, { value: ApplicationStatusLabel.PENDING }] },
    // eslint-disable-next-line max-len
    { key: "1cs", fields: [{ value: "Critical Software", align: "left" }, { value: "2019-12-23" }, { value: ApplicationStatusLabel.PENDING }] },
    { key: "1blp", fields: [{ value: "BLIP", align: "left" }, { value: "2020-02-02" }, { value: ApplicationStatusLabel.APPROVED }] },
    { key: "1kp", fields: [{ value: "KPMG", align: "left" }, { value: "2020-04-23" }, { value: ApplicationStatusLabel.PENDING }] },
    { key: "2fra", fields: [{ value: "Fraunhofer", align: "left" }, { value: "2020-04-13" }, { value: ApplicationStatusLabel.PENDING }] },
    // eslint-disable-next-line max-len
    { key: "2cs", fields: [{ value: "Critical Software", align: "left" }, { value: "2019-12-23" }, { value: ApplicationStatusLabel.PENDING }] },
    { key: "2nat", fields: [{ value: "Natixis", align: "left" }, { value: "2020-06-23" }, { value: ApplicationStatusLabel.REJECTED }] },
    { key: "2blp", fields: [{ value: "BLIP", align: "left" }, { value: "2020-02-02" }, { value: ApplicationStatusLabel.PENDING }] },
    { key: "2kp", fields: [{ value: "KPMG", align: "left" }, { value: "2020-04-23" }, { value: ApplicationStatusLabel.PENDING }] },
    { key: "3fra", fields: [{ value: "Fraunhofer", align: "left" }, { value: "2020-04-13" }, { value: ApplicationStatusLabel.PENDING }] },
    { key: "3kp", fields: [{ value: "KPMG", align: "left" }, { value: "2020-04-23" }, { value: ApplicationStatusLabel.PENDING }] },
    // eslint-disable-next-line max-len
    { key: "3cs", fields: [{ value: "Critical Software", align: "left" }, { value: "2019-12-23" }, { value: ApplicationStatusLabel.PENDING }] },
    { key: "3nat", fields: [{ value: "Natixis", align: "left" }, { value: "2020-06-23" }, { value: ApplicationStatusLabel.REJECTED }] },
    // eslint-disable-next-line max-len
    { key: "3cs2", fields: [{ value: "Critical Software", align: "left" }, { value: "2019-12-23" }, { value: ApplicationStatusLabel.PENDING }] },
    { key: "4nat", fields: [{ value: "Natixis", align: "left" }, { value: "2020-06-23" }, { value: ApplicationStatusLabel.REJECTED }] },
    { key: "4blp", fields: [{ value: "BLIP", align: "left" }, { value: "2020-02-02" }, { value: ApplicationStatusLabel.PENDING }] },
    { key: "4fra", fields: [{ value: "Fraunhofer", align: "left" }, { value: "2020-04-13" }, { value: ApplicationStatusLabel.PENDING }] },
    { key: "4blp2", fields: [{ value: "BLIP", align: "left" }, { value: "2020-02-02" }, { value: ApplicationStatusLabel.PENDING }] },
    { key: "4kp", fields: [{ value: "KPMG", align: "left" }, { value: "2020-04-23" }, { value: ApplicationStatusLabel.PENDING }] },
];

const columns = {
    name: { align: "left", disablePadding: true, label: "Company Name" },
    date: { align: "right", disablePadding: false, label: "Requested At" },
    status: { align: "right", disablePadding: false, label: "Status" },
    actions: { align: "right", disablePadding: false, label: "Actions", disableSorting: true },
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


const StatusFilter = React.forwardRef((props, ref) => (
    <SelectFilter
        label={"Status"}
        id={"status-filter"}
        options={Object.values(ApplicationStatusLabel)}
        column={"status"}
        columns={columns}
        ref={ref}
        {...props}
    />
));

StatusFilter.displayName = "StatusFilter";

const ValueFilter = React.forwardRef((props, ref) => (
    <TextSearchFilter
        label={"Company Name"}
        placeholder="Search"
        id={"companyName-filter"}
        column={"name"}
        columns={columns}
        ref={ref}
        {...props}
    />
));

ValueFilter.displayName = "StatusFilter";


const filters = [
    { id: "status-filter", render: StatusFilter },
    { id: "value-filter", render: ValueFilter },
];


const RowActions = ({ row }) => (
    <TableCell align="right">
        {getFieldValue(row, "status", columns) === ApplicationStatusLabel.PENDING &&
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


const MultiRowActions = ({ rows }) => {
    const handleAction = () => {
        console.log("This will affect rows", rows.map((row) => row.key));
    };
    return ( // TODO it should check if it can approve all/reject (mby some of them already approved or rej)
        <>
            <IconButton aria-label="accept" onClick={handleAction}>
                <Check />
            </IconButton>
            <IconButton aria-label="reject" onClick={handleAction}>
                <Clear />
            </IconButton>
            <IconButton aria-label="more actions" onClick={handleAction}>
                <MoreHoriz />
            </IconButton>
        </>
    );
};

MultiRowActions.propTypes = {
    rows: PropTypes.arrayOf(RowPropTypes),
};
const ApplicationsReviewWidget = () => (
    <Dialog open fullScreen>
        <DialogTitle>
            Applications Review
        </DialogTitle>
        <DialogContent>
            <Paper style={{ width: "60%", padding: "24px 72px", boxSizing: "content-box" }}>
                <FilterableTable
                    title="Applications"
                    tableComponent={SortableSelectableTable}
                    rows={demoRows}
                    columns={columns}
                    sorters={sorters}
                    filters={filters}
                    RowActions={RowActions}
                    MultiRowActions={MultiRowActions}
                    rowsPerPage={5}
                    stickyHeader
                />
            </Paper>
        </DialogContent>
    </Dialog>
);

ApplicationsReviewWidget.propTypes = {

};

export default ApplicationsReviewWidget;

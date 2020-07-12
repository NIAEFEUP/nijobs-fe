import React from "react";
// import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TableContainer,
    Paper,
} from "@material-ui/core";
// import SelectableTable from "../../../utils/Table/SelectableTable";
import SortableSelectableTable from "../../../utils/Table/SortableSelectableTable";

const demoRows = [
    { key: "nat", fields: [{ value: "Natixis", align: "left" }, { value: "2020-06-23" }, { value: "REJECTED" }] },
    { key: "fra", fields: [{ value: "Fraunhofer", align: "left" }, { value: "2020-04-13" }, { value: "PENDING" }] },
    { key: "cs", fields: [{ value: "Critical Software", align: "left" }, { value: "2019-12-23" }, { value: "PENDING" }] },
    { key: "blp", fields: [{ value: "BLIP", align: "left" }, { value: "2020-02-02" }, { value: "PENDING" }] },
    { key: "kp", fields: [{ value: "KPMG", align: "left" }, { value: "2020-04-23" }, { value: "PENDING" }] },
];

const columns = [
    { key: "name", align: "left", disablePadding: true, label: "Company Name" },
    { key: "date", align: "right", disablePadding: false, label: "Requested At" },
    { key: "status", align: "right", disablePadding: false, label: "Status" },
    { key: "actions", align: "right", disablePadding: false, label: "Actions", disableSorting: true },
];

// eslint-disable-next-line no-unused-vars
const genericSorter = (isAscendingMode) => (a, b) => {
    if (a.field < b.field) return isAscendingMode ? -1 : 1;
    if (a.field > b.field) return isAscendingMode ? 1 : -1;
    return 0;
};

const sorters = [
    genericSorter,
    genericSorter,
    genericSorter,

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
            {/* <TableContainer component={Paper} style={{ width: "60%" }}>
                <SelectableTable
                    rows={demoRows}
                    columns={columns}
                />
            </TableContainer> */}
            <TableContainer component={Paper} style={{ width: "60%" }}>
                <SortableSelectableTable
                    rows={demoRows}
                    columns={columns}
                    sorters={sorters}
                />
            </TableContainer>
        </DialogContent>
    </Dialog>
);

ApplicationsReviewWidget.propTypes = {

};

export default ApplicationsReviewWidget;

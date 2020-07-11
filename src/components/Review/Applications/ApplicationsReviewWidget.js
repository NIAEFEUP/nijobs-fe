import React from "react";
// import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TableContainer,
    Paper,
    // TableSortLabel,
} from "@material-ui/core";
import SelectableTable from "../../../utils/Table/SelectableTable";

const demoRows = [
    { key: "nat", fields: [{ value: "Natixis", align: "left" }, "2020-06-23", "REJECTED"] },
    { key: "fra", fields: [{ value: "Fraunhofer", align: "left" }, "2020-04-13", "PENDING"] },
    { key: "cs", fields: [{ value: "Critical Software", align: "left" }, "2019-12-23", "PENDING"] },
    { key: "blp", fields: [{ value: "BLIP", align: "left" }, "2020-02-02", "PENDING"] },
    { key: "kp", fields: [{ value: "KPMG", align: "left" }, "2020-04-23", "PENDING"] },
];

const columns = [
    { key: "name", align: "left", disablePadding: true, label: "Company Name" },
    { key: "date", align: "right", disablePadding: false, label: "Requested At" },
    { key: "status", align: "right", disablePadding: false, label: "Status" },
    { key: "actions", align: "right", disablePadding: false, label: "Actions" },
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
                <SelectableTable
                    rows={demoRows}
                    columns={columns}
                />

            </TableContainer>
        </DialogContent>
    </Dialog>
);

ApplicationsReviewWidget.propTypes = {

};

export default ApplicationsReviewWidget;

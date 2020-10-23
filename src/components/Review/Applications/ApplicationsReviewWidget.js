import React from "react";
import PropTypes from "prop-types";
import {
    TableCell,
    IconButton,
    Paper,
} from "@material-ui/core";
import { Check, Clear, MoreHoriz } from "@material-ui/icons";

import { RowPropTypes } from "../../../utils/Table/PropTypes";
import { alphabeticalSorter, getFieldValue } from "../../../utils/Table/utils";
import { ApplicationStatusLabel, columns } from "./ApplicationsReviewTableSchema";
import { CompanyNameFilter, StatusFilter, DateFromFilter, DateToFilter } from "./Filters";
import UndoableActionsHandlerProvider from "../../../utils/UndoableActionsHandlerProvider";
import ControlledSortableSelectableTable from "../../../utils/Table/ControlledSortableSelectableTable";
import FilterableTable from "../../../utils/Table/FilterableTable";


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
    { key: "2blp", fields: [{ value: "BLIP1", align: "left" }, { value: "2020-02-02" }, { value: ApplicationStatusLabel.PENDING }] },
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

const sorters = {
    name: alphabeticalSorter,
    date: alphabeticalSorter,
    status: alphabeticalSorter,
};

const filters = [
    { id: "status-filter", render: StatusFilter },
    { id: "company-name-filter", render: CompanyNameFilter },
    { id: "date-from-filter", render: DateFromFilter },
    { id: "date-to-filter", render: DateToFilter },
];


const RowActions = ({ row, submitUndoableAction, addRow, removeRow }) => (
    <TableCell align="right">
        {getFieldValue(row, "status", columns) === ApplicationStatusLabel.PENDING &&
            <>
                <IconButton
                    aria-label="accept"
                    onClick={(e) => {
                        e.stopPropagation();
                        removeRow(row.key);
                        if (submitUndoableAction) {
                            submitUndoableAction(
                                row.key,
                                `Application for ${getFieldValue(row, "name", columns)} Approved`,
                                () => {
                                    console.log(`SHOULD CALL API TO APPROVE ROW ${row.key} HERE`);
                                },
                                () => {
                                    console.log(`APPROVE ROW ${row.key} CANCELLED`);
                                    addRow(row);
                                },
                                5000
                            );
                        }
                    }}
                >
                    <Check />
                </IconButton>
                <IconButton
                    aria-label="reject"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <Clear />
                </IconButton>
            </>
        }
        <IconButton
            aria-label="more actions"
            edge="end"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <MoreHoriz />
        </IconButton>
    </TableCell>
);

RowActions.propTypes = {
    row: RowPropTypes,
    submitUndoableAction: PropTypes.func,
    addRow: PropTypes.func.isRequired,
    removeRow: PropTypes.func.isRequired,
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
    <>
        <UndoableActionsHandlerProvider>
            <Paper style={{ width: "60%", padding: "24px 72px", boxSizing: "content-box" }}>
                <FilterableTable
                    title="Applications"
                    tableComponent={ControlledSortableSelectableTable}
                    defaultSort="name"
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
        </UndoableActionsHandlerProvider>
    </>
);

export default ApplicationsReviewWidget;

import React from "react";
import {
    Paper,
} from "@material-ui/core";

import { alphabeticalSorter } from "../../../utils/Table/utils";
import { ApplicationStatusLabel, columns } from "./ApplicationsReviewTableSchema";
import { CompanyNameFilter, StatusFilter, DateFromFilter, DateToFilter } from "./Filters";
import UndoableActionsHandlerProvider from "../../../utils/UndoableActionsHandlerProvider";
import ControlledSortableSelectableTable from "../../../utils/Table/ControlledSortableSelectableTable";
import FilterableTable from "../../../utils/Table/FilterableTable";
import { RowActions, MultiRowActions } from "./Actions";


const demoRows = {
    // eslint-disable-next-line max-len
    "1nat": { fields: { name: { value: "Natixis", align: "left" }, date: { value: "2020-06-23" }, status: { value: ApplicationStatusLabel.REJECTED } } },
    // eslint-disable-next-line max-len
    "1fra": { fields: { name: { value: "Fraunhofer", align: "left" }, date: { value: "2020-04-13" }, status: { value: ApplicationStatusLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "1cs": { fields: { name: { value: "Critical Software", align: "left"  }, date: { value: "2019-12-23" }, status: { value: ApplicationStatusLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "1blp": { fields: { name: { value: "BLIP", align: "left" }, date: { value: "2020-02-02" }, status: { value: ApplicationStatusLabel.APPROVED } } },
    // eslint-disable-next-line max-len
    "1kp": { fields: { name: { value: "KPMG", align: "left" }, date: { value: "2020-04-23" }, status: { value: ApplicationStatusLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "2fra": { fields: { name: { value: "Fraunhofer", align: "left" }, date: { value: "2020-04-13" }, status: { value: ApplicationStatusLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "2cs": { fields: { name: { value: "Critical Software", align: "left"  }, date: { value: "2019-12-23" }, status: { value: ApplicationStatusLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "2nat": { fields: { name: { value: "Natixis", align: "left" }, date: { value: "2020-06-23" }, status: { value: ApplicationStatusLabel.REJECTED } } },
    // eslint-disable-next-line max-len
    "2blp": { fields: { name: { value: "BLIP1", align: "left" }, date: { value: "2020-02-02" }, status: { value: ApplicationStatusLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "2kp": { fields: { name: { value: "KPMG", align: "left" }, date: { value: "2020-04-23" }, status: { value: ApplicationStatusLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "3fra": { fields: { name: { value: "Fraunhofer", align: "left" }, date: { value: "2020-04-13" }, status: { value: ApplicationStatusLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "3kp": { fields: { name: { value: "KPMG", align: "left" }, date: { value: "2020-04-23" }, status: { value: ApplicationStatusLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "3cs": { fields: { name: { value: "Critical Software", align: "left"  }, date: { value: "2019-12-23" }, status: { value: ApplicationStatusLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "3nat": { fields: { name: { value: "Natixis", align: "left" }, date: { value: "2020-06-23" }, status: { value: ApplicationStatusLabel.REJECTED } } },
    // eslint-disable-next-line max-len
    "3cs2": { fields: { name: { value: "Critical Software", align: "left"  }, date: { value: "2019-12-23" }, status: { value: ApplicationStatusLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "4nat": { fields: { name: { value: "Natixis", align: "left" }, date: { value: "2020-06-23" }, status: { value: ApplicationStatusLabel.REJECTED } } },
    // eslint-disable-next-line max-len
    "4blp": { fields: { name: { value: "BLIP", align: "left" }, date: { value: "2020-02-02" }, status: { value: ApplicationStatusLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "4fra": { fields: { name: { value: "Fraunhofer", align: "left" }, date: { value: "2020-04-13" }, status: { value: ApplicationStatusLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "4blp2": { fields: { name: { value: "BLIP", align: "left" }, date: { value: "2020-02-02" }, status: { value: ApplicationStatusLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "4kp": { fields: { name: { value: "KPMG", align: "left" }, date: { value: "2020-04-23" }, status: { value: ApplicationStatusLabel.PENDING } } },
};

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

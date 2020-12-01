import React, { useEffect, useState } from "react";
import {
    Paper, Typography,
} from "@material-ui/core";

import { alphabeticalSorter } from "../../../utils/Table/utils";
import { ApplicationStateLabel, columns } from "./ApplicationsReviewTableSchema";
import { CompanyNameFilter, StateFilter, DateFromFilter, DateToFilter } from "./Filters";
import UndoableActionsHandlerProvider from "../../../utils/UndoableActionsHandlerProvider";
import ControlledSortableSelectableTable from "../../../utils/Table/ControlledSortableSelectableTable";
import FilterableTable from "../../../utils/Table/FilterableTable";
import { RowActions, MultiRowActions } from "./Actions";
import { searchApplications } from "../../../services/applicationsReviewService";
import { format, parseISO } from "date-fns";


// eslint-disable-next-line no-unused-vars
const demoRows = {
    // eslint-disable-next-line max-len
    "1nat": { fields: { name: { value: "Natixis", align: "left" }, date: { value: "2020-06-23" }, state: { value: ApplicationStateLabel.REJECTED } } },
    // eslint-disable-next-line max-len
    "1fra": { fields: { name: { value: "Fraunhofer", align: "left" }, date: { value: "2020-04-13" }, state: { value: ApplicationStateLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "1cs": { fields: { name: { value: "Critical Software", align: "left"  }, date: { value: "2019-12-23" }, state: { value: ApplicationStateLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "1blp": { fields: { name: { value: "BLIP", align: "left" }, date: { value: "2020-02-02" }, state: { value: ApplicationStateLabel.APPROVED } } },
    // eslint-disable-next-line max-len
    "1kp": { fields: { name: { value: "KPMG", align: "left" }, date: { value: "2020-04-23" }, state: { value: ApplicationStateLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "2fra": { fields: { name: { value: "Fraunhofer", align: "left" }, date: { value: "2020-04-13" }, state: { value: ApplicationStateLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "2cs": { fields: { name: { value: "Critical Software", align: "left"  }, date: { value: "2019-12-23" }, state: { value: ApplicationStateLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "2nat": { fields: { name: { value: "Natixis", align: "left" }, date: { value: "2020-06-23" }, state: { value: ApplicationStateLabel.REJECTED } } },
    // eslint-disable-next-line max-len
    "2blp": { fields: { name: { value: "BLIP1", align: "left" }, date: { value: "2020-02-02" }, state: { value: ApplicationStateLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "2kp": { fields: { name: { value: "KPMG", align: "left" }, date: { value: "2020-04-23" }, state: { value: ApplicationStateLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "3fra": { fields: { name: { value: "Fraunhofer", align: "left" }, date: { value: "2020-04-13" }, state: { value: ApplicationStateLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "3kp": { fields: { name: { value: "KPMG", align: "left" }, date: { value: "2020-04-23" }, state: { value: ApplicationStateLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "3cs": { fields: { name: { value: "Critical Software", align: "left"  }, date: { value: "2019-12-23" }, state: { value: ApplicationStateLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "3nat": { fields: { name: { value: "Natixis", align: "left" }, date: { value: "2020-06-23" }, state: { value: ApplicationStateLabel.REJECTED } } },
    // eslint-disable-next-line max-len
    "3cs2": { fields: { name: { value: "Critical Software", align: "left"  }, date: { value: "2019-12-23" }, state: { value: ApplicationStateLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "4nat": { fields: { name: { value: "Natixis", align: "left" }, date: { value: "2020-06-23" }, state: { value: ApplicationStateLabel.REJECTED } } },
    // eslint-disable-next-line max-len
    "4blp": { fields: { name: { value: "BLIP", align: "left" }, date: { value: "2020-02-02" }, state: { value: ApplicationStateLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "4fra": { fields: { name: { value: "Fraunhofer", align: "left" }, date: { value: "2020-04-13" }, state: { value: ApplicationStateLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "4blp2": { fields: { name: { value: "BLIP", align: "left" }, date: { value: "2020-02-02" }, state: { value: ApplicationStateLabel.PENDING } } },
    // eslint-disable-next-line max-len
    "4kp": { fields: { name: { value: "KPMG", align: "left" }, date: { value: "2020-04-23" }, state: { value: ApplicationStateLabel.PENDING } } },
};

const sorters = {
    name: alphabeticalSorter,
    date: alphabeticalSorter,
    state: alphabeticalSorter,
};

const filters = [
    { id: "state-filter", render: StateFilter },
    { id: "company-name-filter", render: CompanyNameFilter },
    { id: "date-from-filter",
        render: DateFromFilter,
        props: {
            onChange: (date, filtersContext, setFiltersContext) => {
                setFiltersContext((filtersContext) => ({ ...filtersContext, minDate: date }));
            },
        },
    },
    { id: "date-to-filter",
        render: DateToFilter,
        props: {
            restrictMinDate: true,
        },
    },
];

const generateRow = ({ companyName, submittedAt, state, rejectReason, motivation, email, rejectedAt }) => ({
    fields: {
        name: { value: companyName, align: "left" },
        date: { value: format(parseISO(submittedAt), "yyyy-MM-dd") },
        state: { value: ApplicationStateLabel[state] },
    },
    payload: {
        email,
        motivation,
        rejectReason,
        rejectedAt: rejectedAt ? format(parseISO(rejectedAt), "yyyy-MM-dd") : "",
    },
});

const ApplicationsReviewWidget = () => {
    const [rows, setRows] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        searchApplications()
            .then((rows) => {
                const fetchedRows = rows.applications.reduce((rows, row) => {
                    rows[row.id] = generateRow(row);
                    return rows;
                }, {});
                setRows(fetchedRows);
            })
            .catch(() => {
                setError("UnexpectedError");
            });
    }, []);
    return (

        <>
            <UndoableActionsHandlerProvider>
                <Paper style={{ width: "60%", padding: "24px 72px", boxSizing: "content-box" }}>
                    {error ?
                        <>
                            <Typography variant="h6" color="secondary">
                                Review Applications
                            </Typography>
                            <Typography>
                                An unexpected error occurred, please try refreshing the browser window.
                            </Typography>
                        </>
                        :
                        <FilterableTable
                            title="Review Applications"
                            tableComponent={ControlledSortableSelectableTable}
                            defaultSort="name"
                            rows={rows}
                            columns={columns}
                            sorters={sorters}
                            filters={filters}
                            RowActions={RowActions}
                            MultiRowActions={MultiRowActions}
                            rowsPerPage={5}
                            stickyHeader
                        />
                    }
                </Paper>
            </UndoableActionsHandlerProvider>
        </>


    );
};
export default ApplicationsReviewWidget;

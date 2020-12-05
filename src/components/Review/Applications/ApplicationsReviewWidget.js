import React, { useEffect, useRef, useState } from "react";
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
    const _amMounted = useRef(); // Prevents setState calls from happening after unmount
    const [rows, setRows] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        _amMounted.current = true;
        searchApplications()
            .then((rows) => {
                if (_amMounted.current) {
                    const fetchedRows = rows.applications.reduce((rows, row) => {
                        rows[row.id] = generateRow(row);
                        return rows;
                    }, {});
                    setRows(fetchedRows);
                }
            })
            .catch(() => {
                if (_amMounted.current)
                    setError("UnexpectedError");
            });
        return () => {
            _amMounted.current = false;
        };
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
                            emptyMessage="No applications here."
                        />
                    }
                </Paper>
            </UndoableActionsHandlerProvider>
        </>
    );
};
export default ApplicationsReviewWidget;

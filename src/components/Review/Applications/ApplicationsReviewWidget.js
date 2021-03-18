import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Divider,
    makeStyles,
    Paper, Typography,
} from "@material-ui/core";

import { alphabeticalSorter, generateTableCellFromField } from "../../../utils/Table/utils";
import { ApplicationStateLabel, columns } from "./ApplicationsReviewTableSchema";
import { CompanyNameFilter, StateFilter, DateFromFilter, DateToFilter } from "./Filters";
import UndoableActionsHandlerProvider from "../../../utils/UndoableActionsHandlerProvider";
import ControlledSortableSelectableTable from "../../../utils/Table/ControlledSortableSelectableTable";
import FilterableTable from "../../../utils/Table/FilterableTable";
import { RowActions } from "./Actions";
import { searchApplications } from "../../../services/applicationsReviewService";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";

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

    const approveApplicationRow = useCallback(({ key, fields }) => {

        setRows((rows) => ({
            ...rows,
            [key]: {
                ...rows[key],
                fields: { ...fields, state: { value: ApplicationStateLabel.APPROVED } },
            } }));
    }, [setRows]);

    const rejectApplicationRow = useCallback(({ key, fields, payload }, rejectReason) => {

        setRows((rows) => ({
            ...rows,
            [key]: {
                ...rows[key],
                fields: { ...fields, state: { value: ApplicationStateLabel.REJECTED } },
                payload: {
                    ...payload,
                    rejectReason,
                    rejectedAt: format(Date.now(), "yyyy-MM-dd"),
                },
            } }));
    }, [setRows]);

    const RowComponent = ({ rowKey, labelId }) => {
        const fields = rows[rowKey].fields;

        return (
            <>
                {Object.entries(fields).map(([fieldId, fieldOptions], i) => (
                    generateTableCellFromField(i, fieldId, fieldOptions, labelId)
                ))}
            </>
        );
    };

    RowComponent.propTypes = {
        rowKey: PropTypes.string.isRequired,
        labelId: PropTypes.string.isRequired,
    };

    const useRowCollapseStyles = makeStyles((theme) => ({
        payloadSection: {
            "&:not(:first-child)": {
                paddingTop: theme.spacing(2),
            },
            "&:not(:first-child) p:first-of-type": {
                paddingTop: theme.spacing(2),
            },
        },
    }));

    const RowCollapseComponent = ({ rowKey }) => {
        const row = rows[rowKey];
        const classes = useRowCollapseStyles();
        return (
            <>
                <Typography variant="subtitle2">
                    {row.payload.email}
                </Typography>
                <div className={classes.payloadSection}>
                    <Typography variant="body1">
                            Motivation
                    </Typography>
                    <Typography variant="body2">
                        {row.payload.motivation}
                    </Typography>
                </div>

                {row.fields.state.value === ApplicationStateLabel.REJECTED &&
                <div className={classes.payloadSection}>
                    <Divider />
                    <Typography variant="body1">
                        {`Reject Reason (Rejected at ${row.payload.rejectedAt})`}
                    </Typography>
                    <Typography variant="body2">
                        {row.payload.rejectReason}
                    </Typography>
                </div>
                }
            </>
        );
    };

    RowCollapseComponent.propTypes = {
        rowKey: PropTypes.string.isRequired,
    };

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
                            setInitialRows={setRows}
                            columns={columns}
                            sorters={sorters}
                            filters={filters}
                            RowActions={RowActions}
                            rowsPerPage={5}
                            stickyHeader
                            emptyMessage="No applications here."
                            context={{
                                approveApplicationRow,
                                rejectApplicationRow,
                            }}
                            RowComponent={RowComponent}
                            RowCollapseComponent={RowCollapseComponent}
                        />
                    }
                </Paper>
            </UndoableActionsHandlerProvider>
        </>
    );
};
export default ApplicationsReviewWidget;

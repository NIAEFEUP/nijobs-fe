import React, { useCallback, useEffect, useState } from "react";
import {
    Divider,
    makeStyles,
    Typography,
} from "@material-ui/core";

import { alphabeticalSorter, GenerateTableCellFromField } from "../../../utils/Table/utils";
import { ApplicationStateLabel, columns } from "./ApplicationsReviewTableSchema";
import { CompanyNameFilter, StateFilter, DateFromFilter, DateToFilter } from "./Filters";
import UndoableActionsHandlerProvider from "../../../utils/UndoableActionsHandlerProvider";
import ControlledSortableSelectableTable from "../../../utils/Table/ControlledSortableSelectableTable";
import FilterableTable from "../../../utils/Table/FilterableTable";
import { RowActions } from "./Actions";
import { searchApplications } from "../../../services/applicationsReviewService";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addSnackbar } from "../../../actions/notificationActions";

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

const ApplicationsReviewWidget = ({ addSnackbar }) => {
    const [rows, setRows] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const request = searchApplications()
            .then((rows) => {
                const fetchedRows = rows.applications.reduce((rows, row) => {
                    rows[row.id] = generateRow(row);
                    return rows;
                }, {});
                setRows(fetchedRows);

                setIsLoading(false);
            })
            .catch(() => {
                setError("UnexpectedError");
                setIsLoading(false);
                addSnackbar({
                    message: "An unexpected error occurred, please try refreshing the browser window.",
                    key: `${Date.now()}-fetchApplicationsError`,
                });
            });
        return () => {
            request.cancel();
        };
    }, [addSnackbar]);

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

    const RowContent = ({ rowKey, labelId }) => {
        const fields = rows[rowKey].fields;

        return (
            <>
                {Object.entries(fields).map(([fieldId, fieldOptions], i) => (
                    GenerateTableCellFromField(i, fieldId, fieldOptions, labelId)
                ))}
            </>
        );
    };

    RowContent.propTypes = {
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
                <FilterableTable
                    title="Review Applications"
                    tableComponent={ControlledSortableSelectableTable}
                    defaultSort="date"
                    defaultOrderAscending={false}
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
                    RowContent={RowContent}
                    RowCollapseComponent={RowCollapseComponent}
                    isSelectableTable={true}
                    isLoading={isLoading}
                    error={error}
                    mobileColumns={["name", "state"]}
                />
            </UndoableActionsHandlerProvider>
        </>
    );
};

ApplicationsReviewWidget.propTypes = {
    addSnackbar: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});

export default connect(null, mapDispatchToProps)(ApplicationsReviewWidget);

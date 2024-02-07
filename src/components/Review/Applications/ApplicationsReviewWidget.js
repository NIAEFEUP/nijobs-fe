import React, { useCallback, useContext, useEffect, useState } from "react";
import {
    Divider,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";

import { alphabeticalSorter, GenerateTableCellFromField } from "../../../utils/Table/utils";
import { ApplicationStateLabel, columns } from "./ApplicationsReviewTableSchema";
import { CompanyNameFilter, StateFilter, DateFromFilter, DateToFilter } from "./Filters";
import UndoableActionsHandlerProvider, { UndoableActions } from "../../../utils/UndoableActionsHandlerProvider";
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

const generateRejectReason = (rejectReason) => ({
    value: rejectReason,
    label: "Reject Reason",
});

const generateRejectedAt = (rejectedAt) => ({
    value: rejectedAt ? format(rejectedAt, "yyyy-MM-dd") : "",
    label: "Rejected At",
});

const generateRow = ({ companyName, submittedAt, state, rejectReason, motivation, email, rejectedAt }) => ({
    fields: {
        name: { value: companyName, align: "left" },
        date: { value: format(parseISO(submittedAt), "yyyy-MM-dd") },
        state: { value: ApplicationStateLabel[state] },
    },
    payload: {
        email: { value: email, label: "Email" },
        motivation: { value: motivation, label: "Motivation" },
        rejectReason: generateRejectReason(rejectReason),
        rejectedAt: generateRejectedAt(rejectedAt ? parseISO(rejectedAt) : null),
    },
});

const ApplicationsReviewWidget = ({ addSnackbar, isMobile = false }) => {
    const [rows, setRows] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const mobileCols = ["name", "state", "actions"];

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
                    rejectReason: generateRejectReason(rejectReason),
                    rejectedAt: generateRejectedAt(Date.now()),
                },
            } }));
    }, [setRows]);

    const RowContent = ({ rowKey, labelId }) => {
        const fields = rows[rowKey].fields;

        return (
            <>
                {!isMobile ? Object.entries(fields).map(([fieldId, fieldOptions], i) => (
                    GenerateTableCellFromField(i, fieldId, fieldOptions, labelId)
                )) : Object.entries(fields).filter(([fieldId, _]) => mobileCols.includes(fieldId)).map(([fieldId, fieldOptions], i) => (
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
            wordBreak: "break-all",
            "&:not(:first-child)": {
                paddingTop: theme.spacing(2),
            },
            "&:not(:first-child) p:first-of-type": {
                paddingTop: theme.spacing(2),
            },
        },
        collapsableTitles: {
            fontWeight: 500,
        },
    }));

    const RowCollapseComponent = ({ rowKey }) => {
        const row = rows[rowKey];
        const classes = useRowCollapseStyles();
        const mobileKeys = ["email", "motivation"];
        const showActions = row.fields.state.value === ApplicationStateLabel.PENDING;

        if (row.fields.state.value === ApplicationStateLabel.REJECTED) mobileKeys.push("rejectReason", "rejectedAt");

        const { submitAction } = useContext(UndoableActions);


        return (
            !isMobile ? (
                <>
                    <Typography variant="subtitle2">
                        {row.payload.email.value}
                    </Typography>
                    <div className={classes.payloadSection}>
                        <Typography variant="body1">
                            Motivation
                        </Typography>
                        <Typography variant="body2">
                            {row.payload.motivation.value}
                        </Typography>
                    </div>

                    {row.fields.state.value === ApplicationStateLabel.REJECTED &&
                    <div className={classes.payloadSection}>
                        <Divider />
                        <Typography variant="body1">
                            {`Reject Reason (Rejected at ${row.payload.rejectedAt.value})`}
                        </Typography>
                        <Typography variant="body2">
                            {row.payload.rejectReason.value}
                        </Typography>
                    </div>
                    }
                </>
            ) : (
                <>
                    {showActions && (
                        <div className={classes.payloadSection}>
                            <Grid container alignItems="center">
                                <Grid item xs={5}>
                                    <Typography className={classes.collapsableTitles} variant="body1">
                                        Actions
                                    </Typography>
                                </Grid>
                                <Grid item xs={7} justifyContent="center">
                                    <RowActions
                                        forceDesktop={true}
                                        row={{ key: rowKey, fields: row.fields, payload: row.payload }}
                                        context={{
                                            approveApplicationRow,
                                            rejectApplicationRow,
                                        }}
                                        submitUndoableAction={submitAction}
                                        insideCollapsable={true}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    )}
                    <div className={classes.payloadSection}>
                        {showActions && <Divider />}
                        <Typography className={classes.collapsableTitles} variant="body1">
                            Requested At
                        </Typography>
                        <Typography variant="body2">
                            {row.fields.date.value}
                        </Typography>
                    </div>

                    {mobileKeys.map((colKey) => (
                        <div key={colKey} className={classes.payloadSection}>
                            <Divider />
                            <Typography className={classes.collapsableTitles} variant="body1">
                                {row.payload[colKey].label}
                            </Typography>
                            <Typography variant="body2">
                                {row.payload[colKey].value}
                            </Typography>
                        </div>
                    ))}
                </>
            )

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
                    mobileColumns={mobileCols}
                    hasMaxHeight={false}
                />
            </UndoableActionsHandlerProvider>
        </>
    );
};

ApplicationsReviewWidget.propTypes = {
    addSnackbar: PropTypes.func,
    isMobile: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});

export default connect(null, mapDispatchToProps)(ApplicationsReviewWidget);

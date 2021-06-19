import { Card, CardContent, IconButton, /* Typography */
    makeStyles,
    Typography, TableCell } from "@material-ui/core";
import { format, parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import { fetchCompanyOffers } from "../../../../services/companyOffersService";
import ControlledSortableSelectableTable from "../../../../utils/Table/ControlledSortableSelectableTable";
import FilterableTable from "../../../../utils/Table/FilterableTable";
import { alphabeticalSorter, generateTableCellFromField } from "../../../../utils/Table/utils";
import { columns } from "./CompanyOffersManagementSchema";
import PropTypes from "prop-types";
import { OfferTitleFilter, PublishDateFilter, PublishEndDateFilter, LocationFilter } from "../Filters/index";
import { Edit as EditIcon } from "@material-ui/icons";
// import { RowActions } from "../Actions";


const CompanyOffersNonFullfilledRequest = ({ isLoading, error }) => {
    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    } else if (error) {
        return (
            <h1>
                {error.message}
            </h1>
        );
    } else {
        return null;
    }
};

const generateRow = ({ title, location, description, company }) => ({
    fields: {
        title: { value: title, align: "left" },
        publishStartDate: { value: format(parseISO((new Date()).toISOString()), "yyyy-MM-dd") },
        publishEndDate: { value: format(parseISO((new Date()).toISOString()), "yyyy-MM-dd") },
        location: { value: location },
    },
    payload: {
        companyName: { value: company.name },
        description: { value: description },
    },
});

const sorters = {
    title: alphabeticalSorter,
};

const filters = [
    { id: "offer-title-filter", render: OfferTitleFilter },
    { id: "publish-date-filter",
        render: PublishDateFilter,
        props: {
            onChange: (date, filtersContext, setFiltersContext) => {
                setFiltersContext((filtersContext) => ({ ...filtersContext, minDate: date }));
            },
        },
    },
    { id: "publish-end-date-filter",
        render: PublishEndDateFilter,
        props: {
            onChange: (date, filtersContext, setFiltersContext) => {
                setFiltersContext((filtersContext) => ({ ...filtersContext, minDate: date }));
            },
        },
    },
    { id: "location-filter", render: LocationFilter },
];


const RowActions = () => (
    <TableCell align="right">
        <IconButton
            onClick={(e) => {
                e.stopPropagation();
                // Navigate to Edit Offer Page
            }}
        >
            <EditIcon color="secondary" fontSize="default" />
        </IconButton>
    </TableCell>
);


const CompanyOffersManagementWidget = () => {
    const [offers, setOffers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCompanyOffers().then((offers) => {
            /* TODO: SHOULD NOT RUN WHEN COMPONENT IS UNMOUNTED: CANCEL PROMISE */
            const fetchedRows = offers.reduce((rows, row) => {
                rows[row.id] = generateRow(row);
                return rows;
            }, {});

            setOffers(fetchedRows);
            setIsLoading(false);
        }).catch((err) => {
            setError(err);
            setIsLoading(false);
        });
    }, []);

    const RowContent = ({ rowKey, labelId }) => {
        const fields = offers[rowKey].fields;

        return (
            <>
                {Object.entries(fields).map(([fieldId, fieldOptions], i) => (
                    generateTableCellFromField(i, fieldId, fieldOptions, labelId)
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
        actionsDivider: {
            paddingTop: theme.spacing(2),
        },
    }));

    const RowCollapseComponent = ({ rowKey }) => {
        const row = offers[rowKey];
        const classes = useRowCollapseStyles();
        return (
            <>
                <Typography variant="subtitle2">
                    {row.payload.companyName.value}
                </Typography>
                <div className={classes.actionsDivider}>
                    <Typography variant="body1">
                            Description
                    </Typography>
                    <Typography variant="body2">
                        {row.payload.description.value}
                    </Typography>
                </div>

                { /* row.fields.state.value === ApplicationStateLabel.REJECTED &&
                <div className={classes.payloadSection}>
                    <Divider />
                    <Typography variant="body1">
                        {`Reject Reason (Rejected at ${row.payload.rejectedAt})`}
                    </Typography>
                    <Typography variant="body2">
                        {row.payload.rejectReason}
                    </Typography>
                </div>
                */ }
            </>
        );
    };

    RowCollapseComponent.propTypes = {
        rowKey: PropTypes.string.isRequired,
    };

    return (
        <div>
            <Card>
                <CardContent>
                    {isLoading || error ?
                        <CompanyOffersNonFullfilledRequest isLoading={isLoading} error={error} />
                        :
                        <FilterableTable
                            title="Offers Management"
                            tableComponent={ControlledSortableSelectableTable}
                            defaultSort="title"
                            rows={offers}
                            setInitialRows={setOffers}
                            columns={columns}
                            sorters={sorters}
                            filters={filters}
                            RowActions={RowActions}
                            rowsPerPage={5}
                            stickyHeader
                            emptyMessage="No applications here."
                            context={{
                                // approveApplicationRow,
                                // rejectApplicationRow,
                            }}
                            RowContent={RowContent}
                            RowCollapseComponent={RowCollapseComponent}
                        />
                    }
                </CardContent>
            </Card>
        </div>
    );
};

export default CompanyOffersManagementWidget;

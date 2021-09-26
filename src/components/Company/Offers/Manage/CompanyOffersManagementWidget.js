import { IconButton, TableCell } from "@material-ui/core";
import { format, parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import { fetchCompanyOffers } from "../../../../services/companyOffersService";
import ControlledSortableSelectableTable from "../../../../utils/Table/ControlledSortableSelectableTable";
import FilterableTable from "../../../../utils/Table/FilterableTable";
import { alphabeticalSorter, generateTableCellFromField } from "../../../../utils/Table/utils";
import { columns } from "./CompanyOffersManagementSchema";
import PropTypes from "prop-types";
import useSession from "../../../../hooks/useSession";
import { OfferTitleFilter, PublishDateFilter, PublishEndDateFilter, LocationFilter } from "../Filters/index";
import { Edit as EditIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
// import { RowActions } from "../Actions";


const CompanyOffersNonFullfilledRequest = ({ isLoading, error }) => {
    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    } else if (error) {
        return (
            <h1>
                {error?.msg ?? error}
            </h1>
        );
    } else {
        return null;
    }
};

const generateRow = ({ title, location, description, publishDate, publishEndDate,
    ownerName, _id }) => ({ // Check if it is company.name or companyName
    fields: {
        title: { value: title, align: "left", customComponent:
    <Link to={`/offer/${_id}`} style={{ color: "initial", textDecoration: "underline", textUnderlineOffset: 2 }}>
        {title}
    </Link>,
        },
        publishStartDate: { value: format(parseISO(publishDate), "yyyy-MM-dd") },
        publishEndDate: { value: format(parseISO(publishEndDate), "yyyy-MM-dd") },
        location: { value: location },
    },
    payload: {
        companyName: { value: ownerName },
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

const RowActions = ({ row }) => {
    const offerRoute = `/offer/${row?.key}`;

    // Need to change the route from View Offer to Edit Offer

    return (
        <TableCell align="right">
            <Link to={offerRoute}>
                <IconButton>
                    <EditIcon color="secondary" fontSize="default" />
                </IconButton>
            </Link>
        </TableCell>
    );
};

RowActions.propTypes = {
    row: PropTypes.object.isRequired,
};


const CompanyOffersManagementWidget = () => {
    const { data, isLoggedIn } = useSession();
    const [offers, setOffers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoggedIn) fetchCompanyOffers(data.company._id).then((offers) => {
            /* TODO: SHOULD NOT RUN WHEN COMPONENT IS UNMOUNTED: CANCEL PROMISE */
            if (Array.isArray(offers)) {
                const fetchedRows = offers.reduce((rows, row) => {
                    rows[row._id] = generateRow(row);
                    return rows;
                }, {});

                setOffers(fetchedRows);
            } else {
                setOffers([]);
            }
            setIsLoading(false);
        }).catch((err) => {
            setError(err[0]);
            setIsLoading(false);
        });
    }, [data.company._id, isLoggedIn]);

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

    /*
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
    */
    /*
    const RowCollapseComponent = ({ rowKey }) => {
        const row = offers[rowKey];
        const classes = useRowCollapseStyles();
        return (
            <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
                <div style={{ flex: 1 }}>
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
                </div>
                <div style={{ flex: 1 }}>
                    { // Edit Offer button could be in the collapsable?
                    }
                    <Typography>Some text</Typography>
                </div>
            </div>

        );
    };

    RowCollapseComponent.propTypes = {
        rowKey: PropTypes.string.isRequired,
    }; */

    return (
        <div>
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
                    RowContent={RowContent}
                    handleSelect={() => {}}
                    handleSelectAll={() => {}}
                    isSelectableTable={false}
                    // RowCollapseComponent={RowCollapseComponent}
                />
            }
        </div>
    );
};

export default CompanyOffersManagementWidget;

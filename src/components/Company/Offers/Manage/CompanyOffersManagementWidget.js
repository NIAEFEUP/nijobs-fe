import { IconButton, TableCell, Tooltip } from "@material-ui/core";
import { format, parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import { fetchCompanyOffers } from "../../../../services/companyOffersService";
import ControlledSortableSelectableTable from "../../../../utils/Table/ControlledSortableSelectableTable";
import FilterableTable from "../../../../utils/Table/FilterableTable";
import { alphabeticalSorter, GenerateTableCellFromField } from "../../../../utils/Table/utils";
import { columns } from "./CompanyOffersManagementSchema";
import PropTypes from "prop-types";
import useSession from "../../../../hooks/useSession";
import { OfferTitleFilter, PublishDateFilter, PublishEndDateFilter, LocationFilter } from "../Filters/index";
import { Edit as EditIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { addSnackbar } from "../../../../actions/notificationActions";
import { connect } from "react-redux";

const generateRow = ({ title, location, description, publishDate, publishEndDate,
    ownerName, _id }) => ({
    fields: {
        title: { value: title, align: "left", linkDestination: `/offer/${_id}` },
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

    // Need to change the route from View Offer to Edit Offer (After Edit Offer page is done)

    return (
        <TableCell align="right">
            <Tooltip title="Edit Offer">
                <Link to={offerRoute}>
                    <IconButton>
                        <EditIcon color="secondary" fontSize="default" />
                    </IconButton>
                </Link>
            </Tooltip>
        </TableCell>
    );
};

RowActions.propTypes = {
    row: PropTypes.object.isRequired,
};


const CompanyOffersManagementWidget = ({ addSnackbar }) => {
    const { data, isLoggedIn } = useSession();
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoggedIn) fetchCompanyOffers(data.company._id).then((offers) => {
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
            addSnackbar({
                message: "An unexpected error occurred, please try refreshing the browser window.",
                key: `${Date.now()}-fetchOffersError`,
            });
        });
    }, [addSnackbar, data.company._id, isLoggedIn]);

    const RowContent = ({ rowKey, labelId }) => {
        const fields = offers[rowKey].fields;

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

    return (
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
            emptyMessage="No offers here."
            RowContent={RowContent}
            handleSelect={() => {}}
            handleSelectAll={() => {}}
            isSelectableTable={false}
            isLoading={isLoading}
            error={error}
        />
    );
};

CompanyOffersManagementWidget.propTypes = {
    addSnackbar: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});

export default connect(null, mapDispatchToProps)(CompanyOffersManagementWidget);

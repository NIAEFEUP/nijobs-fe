import { Divider, Grid, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
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
import { RowActions } from "./CompanyOffersActions";

const generateRow = ({ title, location, description, publishDate, publishEndDate,
    ownerName, _id }) => ({
    fields: {
        title: { value: title, align: "left", linkDestination: `/offer/${_id}` },
        publishStartDate: { value: format(parseISO(publishDate), "yyyy-MM-dd") },
        publishEndDate: { value: format(parseISO(publishEndDate), "yyyy-MM-dd") },
        location: { value: location },
    },
    payload: {
        companyName: { value: ownerName, label: "Company Name" },
        description: { value: description, label: "Description" },
    },
});

const sorters = {
    title: alphabeticalSorter,
    publishStartDate: alphabeticalSorter,
    publishEndDate: alphabeticalSorter,
    location: alphabeticalSorter,
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


const CompanyOffersManagementWidget = ({ addSnackbar, isMobile }) => {
    const { data, isLoggedIn } = useSession();
    const [offers, setOffers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const mobileCols = ["title", "publishStartDate", "actions"];

    useEffect(() => {
        if (isLoggedIn) fetchCompanyOffers(data.company._id).then((offers) => {
            if (Array.isArray(offers)) {
                const fetchedRows = offers.reduce((rows, row) => {
                    rows[row._id] = generateRow(row);
                    return rows;
                }, {});

                setOffers(fetchedRows);
            } else {
                setOffers({});
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
        const row = offers[rowKey];
        const offerRoute = `/offer/${rowKey}`;
        const classes = useRowCollapseStyles();
        const mobileFieldKeys = ["location", "publishEndDate"];

        return (
            isMobile && (
                <>
                    <div className={classes.payloadSection}>
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <Typography className={classes.collapsableTitles} variant="body1">
                                         Actions
                                </Typography>
                            </Grid>
                            <Grid item xs={6} justifyContent="center">
                                <Tooltip title="Edit Offer">
                                    <Link to={offerRoute}>
                                        <IconButton aria-label="Edit Offer">
                                            <EditIcon color="secondary" fontSize="medium" />
                                        </IconButton>
                                    </Link>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </div>

                    {mobileFieldKeys.map((colKey) => (
                        <div key={colKey} className={classes.payloadSection}>
                            <Divider />
                            <Typography className={classes.collapsableTitles} variant="body1">
                                {columns[colKey]?.label}
                            </Typography>
                            <Typography variant="body2">
                                {row.fields[colKey].value}
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
        <FilterableTable
            title="Offers Management"
            tableComponent={ControlledSortableSelectableTable}
            defaultSort="publishStartDate"
            defaultOrderAscending={false}
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
            RowCollapseComponent={RowCollapseComponent}
            handleSelect={() => {}}
            handleSelectAll={() => {}}
            isSelectableTable={false}
            isLoading={isLoading}
            error={error}
            mobileColumns={mobileCols}
            hasMaxHeight={false}
        />
    );
};

CompanyOffersManagementWidget.propTypes = {
    addSnackbar: PropTypes.func,
    isMobile: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    addSnackbar: (notification) => dispatch(addSnackbar(notification)),
});

export default connect(null, mapDispatchToProps)(CompanyOffersManagementWidget);

import { Divider, Grid, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addSnackbar } from "../../../../actions/notificationActions";
import useSession from "../../../../hooks/useSession";
import { fetchCompanyOffers } from "../../../../services/companyOffersService";
import ControlledSortableSelectableTable from "../../../../utils/Table/ControlledSortableSelectableTable";
import FilterableTable from "../../../../utils/Table/FilterableTable";
import {
    alphabeticalSorter,
    GenerateTableCellFromField,
} from "../../../../utils/Table/utils";
import { columns } from "./CompanyOffersManagementSchema";
import PropTypes from "prop-types";
import useSession from "../../../../hooks/useSession";
import {
    OfferTitleFilter,
    PublishDateFilter,
    PublishEndDateFilter,
    LocationFilter,
} from "../Filters/index";
import { Edit as EditIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { addSnackbar } from "../../../../actions/notificationActions";
import { connect } from "react-redux";
import { RowActions } from "./CompanyOffersActions";
import Offer from "../../../HomePage/SearchResultsArea/Offer/Offer";
import { OfferConstants } from "../../../Offers/Form/OfferUtils";
import { LocationFilter, OfferTitleFilter, PublishDateFilter, PublishEndDateFilter } from "../Filters/index";
import { RowActions } from "./CompanyOffersActions";
import { columns } from "./CompanyOffersManagementSchema";
import OfferTitle from "./CompanyOffersTitle";
import CompanyOffersVisibilityActions from "./CompanyOffersVisibilityActions";
import CollapsedQuickOfferEdit from "./CollapsedQuickOfferEdit";

const generateRow = ({
    title, location, publishDate, publishEndDate, isHidden, isArchived, hiddenReason,
    ownerName, getOfferVisibility, setOfferVisibility, offerId, _id, ...args }) => ({
    fields: {
        title: { value: (
            <OfferTitle
                title={title}
                getOfferVisibility={getOfferVisibility}
                offerId={offerId}
            />), align: "left", linkDestination: `/offer/${_id}` },
        publishStartDate: { value: format(parseISO(publishDate), "yyyy-MM-dd") },
        publishEndDate: { value: format(parseISO(publishEndDate), "yyyy-MM-dd") },
        location: { value: location },
    },
    payload: {
        offer: new Offer({
            title, location, publishDate, publishEndDate, isHidden,
            isArchived, hiddenReason, ownerName, _id, ...args,
        }),
        getOfferVisibility: getOfferVisibility,
        setOfferVisibility: setOfferVisibility,
        offerId: offerId,
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
    {
        id: "publish-date-filter",
        render: PublishDateFilter,
        props: {
            onChange: (date, filtersContext, setFiltersContext) => {
                setFiltersContext((filtersContext) => ({
                    ...filtersContext,
                    minDate: date,
                }));
            },
        },
    },
    {
        id: "publish-end-date-filter",
        render: PublishEndDateFilter,
        props: {
            onChange: (date, filtersContext, setFiltersContext) => {
                setFiltersContext((filtersContext) => ({
                    ...filtersContext,
                    minDate: date,
                }));
            },
        },
    },
    { id: "location-filter", render: LocationFilter },
];

export const OfferManagementContext = React.createContext();

const CompanyOffersManagementWidget = ({ addSnackbar, isMobile }) => {
    const { data, isLoggedIn } = useSession();
    const [offers, setOffers] = useState({});
    const [fetchedOffers, setFetchedOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const mobileCols = ["title", "publishStartDate", "actions"];
    const [offerVisibilityStates, setOfferVisibilityStates] = useState([]);

    const getOfferVisibilityState = useCallback(
        (offerId) => offerVisibilityStates[offerId],
        [offerVisibilityStates]
    );

    const setOfferVisibilityState = useCallback((offerId, stateFunc) => {
        const newVisibilityStates = [...offerVisibilityStates];
        newVisibilityStates[offerId] = stateFunc(newVisibilityStates[offerId]);
        setOfferVisibilityStates(newVisibilityStates);
    }, [offerVisibilityStates, setOfferVisibilityStates]);

    useEffect(() => {
        if (isLoggedIn) fetchCompanyOffers(data.company._id).then((offers) => {
            if (Array.isArray(offers)) {
                setFetchedOffers(offers);
            } else {
                setFetchedOffers([]);
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

    useEffect(() => {
        if (Array.isArray(fetchedOffers)) {
            const newVisibilityStates = fetchedOffers.map((offer) => ({
                isHidden: offer.isHidden && offer.hiddenReason === OfferConstants.COMPANY_REQUEST,
                isDisabled: offer.isHidden && offer.hiddenReason === OfferConstants.ADMIN_REQUEST,
                isVisible: !offer.isHidden && !offer.isArchived,
                isBlocked: offer.isHidden && offer.hiddenReason === OfferConstants.COMPANY_BLOCKED,
                isArchived: offer.isArchived,
            }));
            setOfferVisibilityStates(newVisibilityStates);
        }
    }, [fetchedOffers]);

    useEffect(() => {
        if (Array.isArray(fetchedOffers)) {
            const fetchedRows = fetchedOffers.reduce((rows, row, i) => {
                rows[row._id] = generateRow(
                    { ...row, getOfferVisibility: getOfferVisibilityState, setOfferVisibility: setOfferVisibilityState, offerId: i }
                );
                return rows;
            }, {});
            setOffers(fetchedRows);
        }
    }, [setOffers, setOfferVisibilityState, fetchedOffers, getOfferVisibilityState]);

    const RowContent = useCallback(({ rowKey, labelId }) => {
        const fields = offers[rowKey].fields;

        return (
            <>
                {!isMobile ? Object.entries(fields).map(([fieldId, fieldOptions], i) => (
                    GenerateTableCellFromField(i, fieldId, fieldOptions, labelId, true)
                )) : Object.entries(fields).filter(([fieldId, _]) => mobileCols.includes(fieldId)).map(([fieldId, fieldOptions], i) => (
                    GenerateTableCellFromField(i, fieldId, fieldOptions, labelId, true)
                ))}
            </>
        );
    }, [isMobile, mobileCols, offers]);

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

    const classes = useRowCollapseStyles();

    const RowCollapseComponent = useCallback(({ rowKey }) => {
        const row = offers[rowKey];
        const offerRoute = `/offer/${rowKey}`;
        const mobileFieldKeys = ["location", "publishEndDate"];

        return !isMobile ? (
            <CollapsedQuickOfferEdit
                offerId={rowKey}
                offers={offers}
                setOffers={setOffers}
            />
        ) : (
            <>
                <div className={classes.payloadSection}>
                    <Grid container alignItems="center">
                        <Grid item xs={6}>
                            <Typography className={classes.collapsableTitles} variant="body1">
                Actions
                            </Typography>
                        </Grid>
                        <Grid item xs={6} justifyContent="center">
                            <CompanyOffersVisibilityActions offer={row?.payload.offer} />
                            <Tooltip title="Edit Offer">
                                <Link to={offerRoute}>
                                    <IconButton aria-label="Edit Offer">
                                        <EditIcon color="secondary" fontSize="medium" />
                                    </IconButton>
                                </Link>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <CollapsedQuickOfferEdit
                        offerId={rowKey}
                        isMobile={isMobile}
                    />
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
        );
    }, [classes.collapsableTitles, classes.payloadSection, isMobile, offers]);

    RowCollapseComponent.propTypes = {
        rowKey: PropTypes.string.isRequired,
    };

    return (
        <OfferManagementContext.Provider value={{ offers, setOffers }}>
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
        </OfferManagementContext.Provider>
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

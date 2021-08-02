import { Typography } from "@material-ui/core";
// import { format, parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import { fetchCompanyOffers } from "../../../../services/companyOffersService";
import ControlledSortableSelectableTable from "../../../../utils/Table/ControlledSortableSelectableTable";
import FilterableTable from "../../../../utils/Table/FilterableTable";
import { generateTableCellFromField } from "../../../../utils/Table/utils";
import { columns } from "./CompanyOffersManagementSchema";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";

const CompanyOffersNonFullfilledRequest = ({ isLoading, error }) => {
    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    } else if (error) {
        return (
            <h1>
                {error}
            </h1>
        );
    } else {
        return null;
    }
};

const generateRow = ({ title, location, publishDate, publishEndDate }) => ({
    fields: {
        title: { value: title, align: "left" },
        publishStartDate: { value: format(parseISO(publishDate), "yyyy-MM-dd") },
        publishEndDate: { value: format(parseISO(publishEndDate), "yyyy-MM-dd") },
        location: { value: location },
    },
    payload: {

    },
});

const sorters = {

};

const filters = [

];

const RowActions = () => (
    <Typography>Rows Actions</Typography>
);


const CompanyOffersManagementWidget = () => {
    const [offers, setOffers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCompanyOffers().then((offers) => {
            /* TODO: SHOULD NOT RUN WHEN COMPONENT IS UNMOUNTED: CANCEL PROMISE */
            if (Array.isArray(offers)) {
                const fetchedRows = offers.reduce((rows, row) => {
                    rows[row.id] = generateRow(row);
                    return rows;
                }, {});

                setOffers(fetchedRows);
            } else {
                setOffers([]);
            }
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
                />
            }
        </div>
    );
};

export default CompanyOffersManagementWidget;

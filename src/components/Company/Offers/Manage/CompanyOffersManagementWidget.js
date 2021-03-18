import { Card, CardContent, CardHeader, makeStyles, Typography } from "@material-ui/core";
import { format, parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import { fetchCompanyOffers } from "../../../../services/companyOffersService";
import ControlledSortableSelectableTable from "../../../../utils/Table/ControlledSortableSelectableTable";
import FilterableTable from "../../../../utils/Table/FilterableTable";
import { columns } from "./CompanyOffersManagementSchema";

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

const generateRow = ({  position, location }) => ({
    fields: {
        title: { value: position, align: "left" },
        publishStartDate: { value: format(parseISO((new Date()).toISOString()), "yyyy-MM-dd") },
        publishEndDate: { value: format(parseISO((new Date()).toISOString()), "yyyy-MM-dd") },
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
    <h1>Row Actions</h1>
);

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
}));

const RowCollapseComponent = ({ rowKey }) => {

}; */


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
    return (
        <div>
            <Card>
                <CardHeader title="Offers Management" />
                <CardContent>
                    {isLoading || error ?
                        <CompanyOffersNonFullfilledRequest isLoading={isLoading} error={error} />
                        :
                        <FilterableTable
                            title="Review Applications"
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
                        />
                    }

                </CardContent>
            </Card>
        </div>
    );
};

export default CompanyOffersManagementWidget;

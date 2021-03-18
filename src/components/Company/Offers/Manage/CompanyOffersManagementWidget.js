<<<<<<< HEAD
import { Card, CardContent, Typography } from "@material-ui/core";
=======
import { Card, CardContent, CardHeader, makeStyles, Typography } from "@material-ui/core";
>>>>>>> Refactored some Tables Components and created simple table for offers
import { format, parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import { fetchCompanyOffers } from "../../../../services/companyOffersService";
import ControlledSortableSelectableTable from "../../../../utils/Table/ControlledSortableSelectableTable";
import FilterableTable from "../../../../utils/Table/FilterableTable";
<<<<<<< HEAD
import { generateTableCellFromField } from "../../../../utils/Table/utils";
import { columns } from "./CompanyOffersManagementSchema";
import PropTypes from "prop-types";
=======
import { columns } from "./CompanyOffersManagementSchema";
>>>>>>> Refactored some Tables Components and created simple table for offers

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

<<<<<<< HEAD
const generateRow = ({ position, location }) => ({
=======
const generateRow = ({  position, location }) => ({
>>>>>>> Refactored some Tables Components and created simple table for offers
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
<<<<<<< HEAD
    <Typography>Rows Actions</Typography>
);

=======
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

>>>>>>> Refactored some Tables Components and created simple table for offers

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
<<<<<<< HEAD

    const RowComponent = ({ rowKey, labelId }) => {
        const fields = offers[rowKey].fields;

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

    return (
        <div>
            <Card>
                {/* <CardHeader title="Offers Management" /> */}
=======
    return (
        <div>
            <Card>
                <CardHeader title="Offers Management" />
>>>>>>> Refactored some Tables Components and created simple table for offers
                <CardContent>
                    {isLoading || error ?
                        <CompanyOffersNonFullfilledRequest isLoading={isLoading} error={error} />
                        :
                        <FilterableTable
<<<<<<< HEAD
                            title="Offers Management"
=======
                            title="Review Applications"
>>>>>>> Refactored some Tables Components and created simple table for offers
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
<<<<<<< HEAD
                            RowComponent={RowComponent}
=======
>>>>>>> Refactored some Tables Components and created simple table for offers
                        />
                    }

                </CardContent>
            </Card>
        </div>
    );
};

export default CompanyOffersManagementWidget;

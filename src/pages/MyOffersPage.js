import React from "react";
import { Paper } from "@material-ui/core";
import FilterableTable from "../utils/Table/FilterableTable";
import ControlledSortableSelectableTable from "../utils/Table/ControlledSortableSelectableTable";
import { alphabeticalSorter } from "../utils/Table/utils";
// import { CompanyNameFilter, StateFilter, DateFromFilter, DateToFilter } from "../components/Review/Applications/Filters";
import CenteredComponent from "../components/HomePage/CenteredComponent";
import { MainMask } from "../components/HomePage/MainMask";
import Offer from "../components/HomePage/SearchResultsArea/Offer/Offer";

const sorters = {
    name: alphabeticalSorter,
    date: alphabeticalSorter,
    state: alphabeticalSorter,
};
/*
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
*/
export const MyOffersPage = () => {

    const columns = {
        name: { align: "left", disablePadding: true, label: "Company Name" },
        date: { align: "right", disablePadding: false, label: "Requested At" },
        state: { align: "right", disablePadding: false, label: "State" },
        actions: { align: "right", disablePadding: false, label: "Actions", disableSorting: true },
    };

    const redditLogo = require("../services/reddit-logo.png");
    const feupLogo = require("../services/feup-logo.jpg");
    const MOCK_OFFERS = [
        new Offer({
            id: "random uuid1",
            position: "Full-Stack Developer",
            company: {
                name: "Reddit",
                logo: redditLogo,
            },
            location: "San Francisco",
            date: "2019-06",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            fields: [
                "DEVOPS",
                "MACHINE LEARNING",
            ],
        }),
        new Offer({
            id: "random uuid2",
            position: "Security Guy",
            company: {
                name: "CICA",
                logo: feupLogo,
            },
            location: "Porto",
            date: "2019-06",
            description: "You won't do much, really...",
            fields: [
                "DEVOPS",
                "MACHINE LEARNING",
            ],
        }),
        new Offer({
            id: "random uuid3",
            position: "Frontend Developer But Make it Longer",
            company: {
                name: "Sigarra",
                logo: feupLogo,
            },
            location: "Porto",
            date: "2019-06",
            description: "kek",
            fields: [
                "DEVOPS",
                "MACHINE LEARNING",
            ],
        }),
    ];
    console.log(MOCK_OFFERS);
    return (
        <>
            <MainMask />
            <CenteredComponent>
                <Paper style={{ width: "60%", padding: "24px 72px", boxSizing: "content-box" }}>
                    <FilterableTable
                        title="My Offers"
                        tableComponent={ControlledSortableSelectableTable}
                        // defaultSort="name"
                        rows={MOCK_OFFERS}
                        // setInitialRows={setRows}
                        columns={columns}
                        sorters={sorters}
                        // filters={filters}
                        // RowActions={RowActions}
                        rowsPerPage={5}
                        stickyHeader
                        emptyMessage="No offers here."
                        /* context={{
                    approveApplicationRow,
                    rejectApplicationRow,
                }} */
                    />
                </Paper>
            </CenteredComponent>
        </>
    );
};

export default MyOffersPage;

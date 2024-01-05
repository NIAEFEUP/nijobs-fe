import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchCompanyOffers } from "../../../services/companyOffersService";
import FilterableTable from "../../../utils/Table/FilterableTable";
import { OfferTitleFilter, LocationFilter, JobTypeFilter, StartDateFilter } from "../Offers/Filters/index";
import { columns } from "./CompanyOffersSchema";
import { format, parseISO } from "date-fns";
import Offer from "../../HomePage/SearchResultsArea/Offer/Offer";


const generateRow = ({ title, location, jobType, jobStartDate, _id, ...args }) => ({
    fields: {
        title: { value: title, linkDestination: `/offer/${_id}` },
        location: { value: location },
        jobType: { value: jobType },
        jobStartDate: { value: format(parseISO(jobStartDate), "yyyy-MM-dd") },
    },
    payload: {
        offer: new Offer({ title, location, jobType, jobStartDate, ...args }),
    },
});


const CompanyOffersWidget = ({ company }) => {
    // const classes = useProfileStyles();
    const [rows, setRows] = useState({});

    const filters = [
        { id: "offer-title-filter", render: OfferTitleFilter },
        { id: "location-filter", render: LocationFilter },
        { id: "job-type-filter", render: JobTypeFilter },
        { id: "start-date-filter", render: StartDateFilter },
    ];

    useEffect(() => {
        fetchCompanyOffers(company._id).then((offers) => {
            if (Array.isArray(offers)) {
                console.info(offers);
                const fetchedRows = offers.reduce((rows, row) => {
                    rows[row._id] = generateRow(row);
                    return rows;
                }, {});

                setRows(fetchedRows);
            } else {
                setRows({});
            }
        });
    }, [company._id]);

    return (
        <FilterableTable
            title=""
            rows={rows}
            handleSelectAll={() => {}}
            columns={columns}
            filters={filters}
            isRowSelected={() => {}}
        />
    );
};

CompanyOffersWidget.propTypes = {
    company: PropTypes.object.isRequired,
};

export default CompanyOffersWidget;

import React from "react";
import DateFilter from "../../../../utils/Table/Filters/DateFilter";
import { ApplicationStatusLabel, columns } from "../ApplicationsReviewTableSchema";

const Filter = React.forwardRef((props, ref) => (
    <DateFilter
        label="Date To..."
        id="date-to-filter"
        options={Object.values(ApplicationStatusLabel)}
        column="date"
        columns={columns}
        mode="isBefore"
        ref={ref}
        {...props}
    />
));

Filter.displayName = "DateToFilter";

export default Filter;

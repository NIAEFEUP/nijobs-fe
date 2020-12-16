import React from "react";
import DateFilter from "../../../../utils/Table/Filters/DateFilter";
import { ApplicationStateLabel, columns } from "../ApplicationsReviewTableSchema";

const Filter = React.forwardRef((props, ref) => (
    <DateFilter
        label="Date From..."
        id="date-from-filter"
        options={Object.values(ApplicationStateLabel)}
        column="date"
        columns={columns}
        mode="isAfter"
        ref={ref}
        {...props}
    />
));

Filter.displayName = "DateFromFilter";

export default Filter;

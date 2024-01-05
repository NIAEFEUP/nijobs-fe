import React from "react";
import DateFilter from "../../../../utils/Table/Filters/DateFilter";
import { columns } from "../../Profile/CompanyOffersSchema";

const Filter = React.forwardRef((props, ref) => (
    <DateFilter
        label="Start Date from..."
        id="jobStartDate-filter"
        column="jobStartDate"
        columns={columns}
        mode="isAfter"
        ref={ref}
        {...props}
    />
));

Filter.displayName = "jobStartDateFilter";

export default Filter;

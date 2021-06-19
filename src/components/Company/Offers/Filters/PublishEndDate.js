import React from "react";
import DateFilter from "../../../../utils/Table/Filters/DateFilter";
import { columns } from "../Manage/CompanyOffersManagementSchema";

const Filter = React.forwardRef((props, ref) => (
    <DateFilter
        label="Date to..."
        id="publishEndDate-filter"
        column="publishEndDate"
        columns={columns}
        mode="isBefore"
        ref={ref}
        {...props}
    />
));

Filter.displayName = "publishEndDateFilter";

export default Filter;

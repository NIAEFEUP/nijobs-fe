import React from "react";
import DateFilter from "../../../../utils/Table/Filters/DateFilter";
import { columns } from "../Manage/CompanyOffersManagementSchema";

const Filter = React.forwardRef((props, ref) => (
    <DateFilter
        label="Date from..."
        id="publishDate-filter"
        column="publishStartDate"
        columns={columns}
        mode="isAfter"
        ref={ref}
        {...props}
    />
));

Filter.displayName = "publishDateFilter";

export default Filter;

import React from "react";
import TextSearchFilter from "../../../../utils/Table/Filters/TextSearchFilter";
import { columns } from "../../Profile/CompanyOffersSchema";

const Filter = React.forwardRef((props, ref) => (
    <TextSearchFilter
        label="Job Type"
        placeholder="Search"
        id="jobType-filter"
        column="jobType"
        columns={columns}
        ref={ref}
        {...props}
    />
));

Filter.displayName = "jobTypeFilter";

export default Filter;

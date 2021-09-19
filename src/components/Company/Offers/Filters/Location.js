import React from "react";
import TextSearchFilter from "../../../../utils/Table/Filters/TextSearchFilter";
import { columns } from "../Manage/CompanyOffersManagementSchema";

const Filter = React.forwardRef((props, ref) => (
    <TextSearchFilter
        label="Location"
        placeholder="Search"
        id="location-filter"
        column="location"  // column value that will be searched
        columns={columns}
        ref={ref}
        isCaseSensitive={false}
        {...props}
    />
));

Filter.displayName = "locationFilter";

export default Filter;

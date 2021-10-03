import React from "react";
import TextSearchFilter from "../../../../utils/Table/Filters/TextSearchFilter";
import { columns } from "../Manage/CompanyOffersManagementSchema";

const Filter = React.forwardRef((props, ref) => (
    <TextSearchFilter
        label="Offer Title"
        placeholder="Search"
        id="offerTitle-filter"
        column="title"   // column value that will be searched
        columns={columns}
        ref={ref}
        {...props}
    />
));

Filter.displayName = "offerTitleFilter";

export default Filter;

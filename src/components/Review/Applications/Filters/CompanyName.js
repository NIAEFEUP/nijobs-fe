import React from "react";
import TextSearchFilter from "../../../../utils/Table/Filters/TextSearchFilter";
import { columns } from "../ApplicationsReviewTableSchema";


const Filter = React.forwardRef((props, ref) => (
    <TextSearchFilter
        label={"Company Name"}
        placeholder="Search"
        id={"companyName-filter"}
        column={"name"}
        columns={columns}
        ref={ref}
        {...props}
    />
));

Filter.displayName = "StatusFilter";

export default Filter;

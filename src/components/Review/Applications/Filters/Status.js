import React from "react";
import SelectFilter from "../../../../utils/Table/Filters/SelectFilter";
import { ApplicationStatusLabel, columns } from "../ApplicationsReviewTableSchema";

const Filter = React.forwardRef((props, ref) => (
    <SelectFilter
        label={"Status"}
        id={"status-filter"}
        options={Object.values(ApplicationStatusLabel)}
        column={"status"}
        columns={columns}
        ref={ref}
        {...props}
    />
));

Filter.displayName = "StatusFilter";

export default Filter;

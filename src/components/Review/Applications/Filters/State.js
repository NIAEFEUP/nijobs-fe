import React from "react";
import SelectFilter from "../../../../utils/Table/Filters/SelectFilter";
import { ApplicationStateLabel, columns } from "../ApplicationsReviewTableSchema";

const Filter = React.forwardRef((props, ref) => (
    <SelectFilter
        label={"State"}
        id={"state-filter"}
        options={Object.values(ApplicationStateLabel)}
        column={"state"}
        columns={columns}
        ref={ref}
        {...props}
    />
));

Filter.displayName = "StateFilter";

export default Filter;

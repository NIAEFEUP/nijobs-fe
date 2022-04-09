import React from "react";
import DateFilter from "../../../../utils/Table/Filters/DateFilter";

const Filter = React.forwardRef((props, ref) => (
    <DateFilter
        label="Date To..."
        id="date-to-filter"
        column="date"
        mode="isBefore"
        ref={ref}
        {...props}
    />
));

Filter.displayName = "DateToFilter";

export default Filter;

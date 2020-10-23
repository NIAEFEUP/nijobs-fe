import React from "react";
import { ControlledSelectableTable } from "./SelectableTable";
import { ControlledSortableTable } from "./SortableTable";

const ControlledSortableSelectableTable = (props) => (
    <ControlledSortableTable
        tableComponent={ControlledSelectableTable}
        {...props}
    />

);

export default ControlledSortableSelectableTable;

import React, { useState } from "react";
import PropTypes from "prop-types";
import SelectableTable from "./SelectableTable";

import { RowPropTypes, ColumnPropTypes } from "./PropTypes";
import MutableDataTable from "./MutableDataTable";

const sortRowFields = (fieldsToReorder, isAscendingMode, sorter) => fieldsToReorder.sort(sorter(isAscendingMode));


export const SortableSelectableTable = ({
    columns,
    rows,
    setRows,
    sorters,
    ...props
}) => {
    const [order, setOrder] = useState(true); // true means asc, false means desc
    const [orderBy, setOrderBy] = useState(null);

    const handleOrderBy = (columnKey, columnIdx) => {

        const fieldsToReorder = rows.map(({ fields }, i) => ({ rowId: i, field: fields[columnIdx].value }));
        const reorderMode = (orderBy === columnIdx) ? !order : true;

        const sortedRows = sortRowFields(fieldsToReorder, reorderMode, sorters[columnKey]).map(({ rowId }) => rows[rowId]);
        setRows(sortedRows);

        setOrder(reorderMode);
        setOrderBy(columnIdx);
    };

    return (
        <SelectableTable
            sortable
            columns={columns}
            rows={rows}
            setRows={setRows}
            order={order ? "asc" : "desc"}
            orderBy={orderBy}
            handleOrderBy={handleOrderBy}
            {...props}
        />
    );
};

SortableSelectableTable.propTypes = {
    rows: PropTypes.arrayOf(RowPropTypes),
    setRows: PropTypes.func.isRequired,
    columns: PropTypes.objectOf(ColumnPropTypes),
    stickyHeader: PropTypes.bool,
    sorters: PropTypes.objectOf(PropTypes.func).isRequired,
};

const UncontrolledSortableSelectableTable = (props) => (
    <MutableDataTable tableType={SortableSelectableTable} {...props} />
);

export default UncontrolledSortableSelectableTable;

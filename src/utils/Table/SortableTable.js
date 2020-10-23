import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import BaseTable from "./BaseTable";

import { RowPropTypes, ColumnPropTypes } from "./PropTypes";
import MutableDataTable from "./MutableDataTable";

const sortRowFields = (fieldsToReorder, isAscendingMode, sorter) => fieldsToReorder.sort(sorter(isAscendingMode));


export const ControlledSortableTable = ({
    tableComponent: TableComponent = BaseTable,
    columns,
    rows,
    setRows,
    sorters,
    defaultSort: defaultSorterKey,
    defaultOrder = true,
    ...props
}) => {

    const [order, setOrder] = useState(defaultOrder); // true means asc, false means desc
    const [sorterKey, setSorterKey] = useState(defaultSorterKey);

    let columnIdx = 0;
    for (const key in columns) {
        if (key === sorterKey) break;
        columnIdx++;
    }
    const [orderBy, setOrderBy] = useState(columnIdx);

    const fieldsToReorder = rows.map(({ fields }, i) => ({ rowId: i, field: fields[orderBy].value }));
    const sortedRows = sortRowFields(fieldsToReorder, order, sorters[sorterKey]).map(({ rowId }) => rows[rowId]);

    const handleOrderBy = useCallback((columnKey, columnIdx) => {
        const reorderMode = (orderBy === orderBy) ? !order : true;

        setOrder(reorderMode);
        setOrderBy(columnIdx);
        setSorterKey(columnKey);

    }, [order, orderBy]);

    return (
        <TableComponent
            sortable
            columns={columns}
            rows={sortedRows}
            setRows={setRows}
            order={order ? "asc" : "desc"}
            orderBy={orderBy}
            sorterKey={sorterKey}
            handleOrderBy={handleOrderBy}
            {...props}
        />
    );
};

ControlledSortableTable.propTypes = {
    rows: PropTypes.arrayOf(RowPropTypes),
    setRows: PropTypes.func.isRequired,
    columns: PropTypes.objectOf(ColumnPropTypes),
    stickyHeader: PropTypes.bool,
    sorters: PropTypes.objectOf(PropTypes.func).isRequired,
    defaultSort: PropTypes.string.isRequired,
};

const SortableTable = (props) => (
    <MutableDataTable tableType={ControlledSortableTable} {...props} />
);

export default SortableTable;

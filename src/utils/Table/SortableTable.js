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
    defaultSort,
    defaultOrder = true,
    ...props
}) => {

    const [order, setOrder] = useState(defaultOrder); // true means asc, false means desc

    const [orderBy, setOrderBy] = useState(defaultSort);

    const fieldsToReorder = Object.entries(rows).map(([i, { fields }]) => ({ rowId: i, field: fields[orderBy].value }));
    const sortedRows = sortRowFields(fieldsToReorder, order, sorters[orderBy])
        .reduce((sorted, { rowId }) => {
            sorted[rowId] = rows[rowId]; return sorted;
        }, {});

    const handleOrderBy = useCallback((column) => {
        const reorderMode = (orderBy === orderBy) ? !order : true;

        setOrder(reorderMode);
        setOrderBy(column);

    }, [order, orderBy]);

    return (
        <TableComponent
            sortable
            columns={columns}
            rows={sortedRows}
            setRows={setRows}
            order={order ? "asc" : "desc"}
            orderBy={orderBy}
            handleOrderBy={handleOrderBy}
            {...props}
        />
    );
};

ControlledSortableTable.propTypes = {
    rows: PropTypes.objectOf(RowPropTypes),
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

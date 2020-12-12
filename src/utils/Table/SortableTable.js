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
    defaultOrderAscending = true,
    ...props
}) => {

    const [isOrderAscending, setIsOrderAscending] = useState(defaultOrderAscending); // true means asc, false means desc

    const [orderBy, setOrderBy] = useState(defaultSort);

    const fieldsToReorder = Object.entries(rows).map(([rowId, { fields }]) => ({ rowId, field: fields[orderBy].value }));
    const sortedRows = sortRowFields(fieldsToReorder, isOrderAscending, sorters[orderBy])
        .reduce((sorted, { rowId }) => {
            sorted[rowId] = rows[rowId]; return sorted;
        }, {});

    const handleOrderBy = useCallback((column) => {
        const reorderMode = (column === orderBy) ? !isOrderAscending : true;

        setIsOrderAscending(reorderMode);
        setOrderBy(column);

    }, [isOrderAscending, orderBy]);

    return (
        <TableComponent
            sortable
            columns={columns}
            rows={sortedRows}
            setRows={setRows}
            order={isOrderAscending ? "asc" : "desc"}
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
    tableComponent: PropTypes.elementType,
    defaultOrderAscending: PropTypes.bool,
};

const SortableTable = (props) => (
    <MutableDataTable tableType={ControlledSortableTable} {...props} />
);

export default SortableTable;

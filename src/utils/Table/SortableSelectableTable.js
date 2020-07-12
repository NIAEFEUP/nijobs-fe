import React, { useState } from "react";
import PropTypes from "prop-types";
import SelectableTable from "./SelectableTable";

const sortRowFields = (fieldsToReorder, isAscendingMode, sorter) => fieldsToReorder.sort(sorter(isAscendingMode));


const SortableSelectableTable = ({
    columns,
    rows: initialRows,
    stickyHeader,
    sorters,
}) => {

    const [rows, setRows] = useState(initialRows);
    const [order, setOrder] = useState(true); // true means asc, false means desc
    const [orderBy, setOrderBy] = useState(null);

    const handleOrderBy = (columnIdx) => {

        const fieldsToReorder = rows.map(({ fields }, i) => ({ rowId: i, field: fields[columnIdx].value }));
        const reorderMode = (orderBy === columnIdx) ? !order : true;

        const sortedRows = sortRowFields(fieldsToReorder, reorderMode, sorters[columnIdx]).map(({ rowId }) => rows[rowId]);
        setRows(sortedRows);

        setOrder(reorderMode);
        setOrderBy(columnIdx);
    };

    return (
        <SelectableTable
            sortable
            columns={columns}
            rows={rows}
            stickyHeader={stickyHeader}
            order={order ? "asc" : "desc"}
            orderBy={orderBy}
            handleOrderBy={handleOrderBy}
        />
    );
};

SortableSelectableTable.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            fields: PropTypes.arrayOf(PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.shape({
                    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
                    align: PropTypes.oneOf(["left", "center", "right", "inherit", "justify"]),
                }),
            ])).isRequired,
        })
    ),
    columns: PropTypes.arrayOf(
        PropTypes.shape(
            {
                key: PropTypes.string.isRequired,
                align: PropTypes.oneOf(["left", "center", "right", "inherit", "justify"]),
                disablePadding: PropTypes.bool,
                label: PropTypes.string.isRequired,
            },
        )
    ),
    stickyHeader: PropTypes.bool,
    sorters: PropTypes.arrayOf(PropTypes.func).isRequired,
};

export default SortableSelectableTable;

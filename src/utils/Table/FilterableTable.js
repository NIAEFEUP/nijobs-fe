import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BaseTable from "./BaseTable";
import MutableDataTable from "./MutableDataTable";
import { RowPropTypes } from "./PropTypes";

export const ControlledFilterableTable = ({
    tableComponent: TableComponent = BaseTable,
    rows,
    initialRows,
    setRows,
    ...props
}) => {
    const [activeFilters, setActiveFilters] = useState({});
    const [filtersContext, setFiltersContext] = useState({});

    useEffect(() => {
        // This does filtering purely on the client side.
        // Since we are expecting the number of rows to be small, it's ok to do it on the client
        const newRows = Object.values(activeFilters).reduce((updatedRows, filter) => filter(updatedRows), initialRows);
        setRows(newRows);
    }, [activeFilters, initialRows, setRows]);

    return (
        <TableComponent
            rows={rows}
            setRows={setRows}
            filterable
            filtersContext={filtersContext}
            setFiltersContext={setFiltersContext}
            setActiveFilters={setActiveFilters}
            hasActiveFilters={Object.keys(activeFilters).length > 0}
            activeFilters={activeFilters}
            TableToolbarProps={{
                activeFilters,
            }}
            {...props}
        />
    );
};

ControlledFilterableTable.propTypes = {
    initialRows: PropTypes.objectOf(RowPropTypes).isRequired,
    rows: PropTypes.objectOf(RowPropTypes).isRequired,
    setRows: PropTypes.func,
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            render: PropTypes.elementType.isRequired,
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
    tableComponent: PropTypes.elementType,
};

const FilterableTable = (props) => (
    <MutableDataTable tableType={ControlledFilterableTable} {...props} />
);

export default FilterableTable;

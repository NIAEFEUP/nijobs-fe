import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import BaseTable from "./BaseTable";
import MutableDataTable from "./MutableDataTable";
import { RowPropTypes } from "./PropTypes";

export const ControlledSelectableTable = ({
    tableComponent: TableComponent = BaseTable,
    ...props
}) => {

    const [selected, setSelected] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);

    const { rows, activeFilters } = props;

    const isRowSelected = useCallback(
        (rowKey) => Object.hasOwnProperty.call(selected, rowKey),
        [selected],
    );

    const resetSelected = () => {
        setSelected({});
    };

    const onPageChange = () => {
        resetSelected();
    };

    useEffect(() => {
        if (activeFilters)
            resetSelected();
    }, [activeFilters]);

    useEffect(() => {
        setSelectedRows(
            Object.keys(rows)
                .filter((key) => isRowSelected(key))
        );
    }, [isRowSelected, rows]);

    const handleSelect = useCallback((event, name) => {
        if (isRowSelected(name)) {
            // eslint-disable-next-line no-unused-vars
            const { [name]: keyToDelete, ...newSelected } = selected;
            setSelected(newSelected);
        } else {
            setSelected((selected) => ({ ...selected, [name]: true }));
        }
    }, [isRowSelected, selected]);

    const handleSelectAll = useCallback((page, rowsPerPage) => (event) => {
        if (event.target.checked) {
            const newSelected = { ...selected };
            Object.keys(rows)
                .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                .forEach((key) => {
                    newSelected[key] = true;
                });
            setSelected(newSelected);
            return;
        }
        resetSelected();
    }, [rows, selected]);

    const numSelected = Object.keys(selected).length;

    return (
        <TableComponent
            numSelected={numSelected}
            selectedRows={selectedRows}
            handleSelect={handleSelect}
            handleSelectAll={handleSelectAll}
            onPageChange={onPageChange}
            isRowSelected={isRowSelected}
            {...props}
        />
    );
};

ControlledSelectableTable.propTypes = {
    rows: PropTypes.objectOf(RowPropTypes),
    tableComponent: PropTypes.elementType,
    activeFilters: PropTypes.object,
};

const SelectableTable = (props) => (
    <MutableDataTable tableType={ControlledSelectableTable} {...props} />
);

export default SelectableTable;

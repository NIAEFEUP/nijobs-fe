import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { RowPropTypes } from "./PropTypes";

const MutableDataTable = ({ rows: initialRows, tableType: Table, ...props }) => {
    const [rows, setRows] = useState(initialRows);

    const changeRowState = useCallback((row, status) => {
        const { key, fields } = row;
        setRows((rows) => ({ ...rows, [key]: { fields: { ...fields, status: { value: status } } } }));
    }, []);
    return (
        <Table
            initialRows={initialRows}
            rows={rows}
            setRows={setRows}
            RowActionsProps={{
                changeRowState,
            }}
            {...props}
        />

    );
};

MutableDataTable.propTypes = {
    rows: PropTypes.objectOf(RowPropTypes),
    tableType: PropTypes.elementType,
};

export default MutableDataTable;

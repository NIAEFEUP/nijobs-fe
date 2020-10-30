import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { RowPropTypes } from "./PropTypes";

const MutableDataTable = ({ rows: initialRows, tableType: Table, ...props }) => {
    const [rows, setRows] = useState(initialRows);

    useEffect(() => {
        setRows(initialRows);
    }, [initialRows]);


    const changeRowState = useCallback((row, state) => {
        const { key, fields } = row;
        setRows((rows) => ({ ...rows, [key]: { fields: { ...fields, state: { value: state } } } }));
    }, []);
    return (
        <Table
            key={JSON.stringify(initialRows).substring(0, 20)}
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

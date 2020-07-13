import React, { useState } from "react";
import PropTypes from "prop-types";
import { RowPropTypes } from "./PropTypes";

const MutableDataTable = ({ rows: initialRows, tableType: Table, ...props }) => {
    const [rows, setRows] = useState(initialRows);

    return (
        <Table
            initialRows={initialRows}
            rows={rows}
            setRows={setRows}
            {...props}
        />

    );
};

MutableDataTable.propTypes = {
    rows: PropTypes.arrayOf(RowPropTypes),
    tableType: PropTypes.elementType,
};

export default MutableDataTable;

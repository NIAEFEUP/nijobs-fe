import React, { useState } from "react";
import PropTypes from "prop-types";
import { RowPropTypes } from "./PropTypes";

const MutableDataTable = ({ rows: initialRows, tableType: Table, ...props }) => {
    const [rows, setRows] = useState(() => initialRows);

    return (
        <Table
            key={JSON.stringify(initialRows).substring(0, 20)}
            initialRows={initialRows}
            rows={rows}
            setRows={setRows}
            {...props}
        />
    );
};

MutableDataTable.propTypes = {
    rows: PropTypes.objectOf(RowPropTypes),
    tableType: PropTypes.elementType,
};

export default MutableDataTable;

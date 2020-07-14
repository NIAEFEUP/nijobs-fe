export const getFieldValue = (row, column, columns) => {
    const colIdx = Object.keys(columns).indexOf(column);

    return row.fields[colIdx].value;
};

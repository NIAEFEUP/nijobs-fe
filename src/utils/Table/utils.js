export const getFieldValue = (row, column, columns) => {
    const colIdx = Object.keys(columns).indexOf(column);
    return row.fields[colIdx].value;
};

export const alphabeticalSorter = (isAscendingMode) => (a, b) => {
    if (a.field < b.field) return isAscendingMode ? -1 : 1;
    if (a.field > b.field) return isAscendingMode ? 1 : -1;
    return 0;
};

import PropTypes from "prop-types";

export const RowPropTypes = PropTypes.shape({
    key: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
            align: PropTypes.oneOf(["left", "center", "right", "inherit", "justify"]),
        }),
    ).isRequired,
});

export const ColumnPropTypes = PropTypes.shape({
    align: PropTypes.oneOf(["left", "center", "right", "inherit", "justify"]),
    disablePadding: PropTypes.bool,
    label: PropTypes.string.isRequired,
});

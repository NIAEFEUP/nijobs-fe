import PropTypes from "prop-types";

export const RowPropTypes = PropTypes.shape({
    fields: PropTypes.objectOf(
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

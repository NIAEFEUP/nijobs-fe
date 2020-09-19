import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import { Toolbar, Typography, Tooltip, IconButton, Badge } from "@material-ui/core";
import { Tune } from "@material-ui/icons";
import FilterMenu from "./FilterMenu";
import { RowPropTypes } from "./PropTypes";

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
          ? {
              color: theme.palette.secondary.main,
              backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
          : {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.secondary.dark,
          },
    title: {
        flex: "1 1 100%",
    },
    filterUI: {
        width: "100%",

    },
    filterMenu: {
        padding: theme.spacing(2, 4, 4, 4),
        maxHeight: "50vh",
        width: "300px",
        "& $filterUI:not(:first-child)": {
            marginTop: theme.spacing(2),
        },
    },
}));

const TableToolbar = ({ numSelected, selectedRows, title, filterable, filters, hasActiveFilters, setActiveFilters, MultiRowActions }) => {
    const classes = useToolbarStyles();

    const [filterMenuAnchorEl, setFilterMenuAnchorEl] = React.useState(null);

    const handleFilterButtonClick = (event) => {
        setFilterMenuAnchorEl(event.currentTarget);
    };

    const handleFilterMenuClose = () => {
        setFilterMenuAnchorEl(null);
    };

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {`${numSelected} selected`}
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    {title}
                </Typography>
            )}
            {numSelected > 0 && MultiRowActions && (
                <MultiRowActions rows={selectedRows}/>
            )}
            {filterable && (
                <>
                    <Tooltip title="Filter">
                        <IconButton
                            aria-label="Filter list"
                            aria-haspopup="true"
                            aria-controls="filter-menu"
                            onClick={handleFilterButtonClick}
                            color="secondary"
                        >
                            <Badge color="primary" variant="dot" invisible={!hasActiveFilters}>
                                <Tune />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <FilterMenu
                        anchorEl={filterMenuAnchorEl}
                        onClose={handleFilterMenuClose}
                        filters={filters}
                        setActiveFilters={setActiveFilters}
                    />

                </>
            )}
        </Toolbar>
    );
};

TableToolbar.propTypes = {
    title: PropTypes.string.isRequired,
    numSelected: PropTypes.number.isRequired,
    filterable: PropTypes.bool,
    hasActiveFilters: PropTypes.bool,
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            render: PropTypes.elementType.isRequired,
            id: PropTypes.string.isRequired,
        })
    ),
    setActiveFilters: PropTypes.func,
    selectedRows: PropTypes.arrayOf(RowPropTypes),
    MultiRowActions: PropTypes.elementType,
};

export default TableToolbar;

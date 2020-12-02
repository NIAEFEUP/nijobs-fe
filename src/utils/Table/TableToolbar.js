import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import { Toolbar, Typography, Tooltip, Badge, Button } from "@material-ui/core";
import { Tune } from "@material-ui/icons";
import FilterMenu from "./FilterMenu";
import { RowPropTypes } from "./PropTypes";

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: 0,
        paddingRight: theme.spacing(1),
    },
    highlight: {
        paddingLeft: theme.spacing(2),
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
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

const TableToolbar = ({ numSelected, selectedRows, title, filterable, filters,
    filtersContext, setFiltersContext, hasActiveFilters, activeFilters, setActiveFilters, MultiRowActions,
}) => {

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
                <Typography className={classes.title} variant="h6" id="tableTitle" color="secondary" component="div">
                    {title}
                </Typography>
            )}
            {numSelected > 0 && MultiRowActions && (
                <MultiRowActions selectedRows={selectedRows}/>
            )}
            {filterable && (
                <>
                    <Tooltip title="Filter">
                        <Badge color="primary" variant="dot" invisible={!hasActiveFilters}>
                            <Button
                                aria-label="Filter list"
                                aria-haspopup="true"
                                aria-controls="filter-menu"
                                onClick={handleFilterButtonClick}
                                color="secondary"
                                endIcon={
                                    <Tune />
                                }
                            >
                            Filter
                            </Button>
                        </Badge>
                    </Tooltip>
                    <FilterMenu
                        anchorEl={filterMenuAnchorEl}
                        onClose={handleFilterMenuClose}
                        filters={filters}
                        filtersContext={filtersContext}
                        setFiltersContext={setFiltersContext}
                        activeFilters={activeFilters}
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
    selectedRows: PropTypes.objectOf(RowPropTypes),
    MultiRowActions: PropTypes.elementType,
    activeFilters: PropTypes.object,
};

export default TableToolbar;

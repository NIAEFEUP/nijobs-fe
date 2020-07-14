import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import { Toolbar, Typography, Tooltip, IconButton, Menu } from "@material-ui/core";
import { Check, Clear, MoreHoriz, Tune } from "@material-ui/icons";

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

const TableToolbar = ({ numSelected, title, filterable, filters, setActiveFilters }) => {
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

            {numSelected > 0 ? (
                <>
                    <IconButton aria-label="accept">
                        <Check />
                    </IconButton>
                    <IconButton aria-label="reject">
                        <Clear />
                    </IconButton>
                    <IconButton aria-label="more actions">
                        <MoreHoriz />
                    </IconButton>
                </>
            ) : filterable && (
                <>
                    <Tooltip title="Filter list">
                        <IconButton
                            aria-label="filter list"
                            aria-haspopup="true"
                            aria-controls="filter-menu"
                            onClick={handleFilterButtonClick}
                        >
                            <Tune />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="filter-menu"
                        classes={{
                            paper: classes.filterMenu,
                        }}
                        anchorEl={filterMenuAnchorEl}
                        keepMounted
                        open={Boolean(filterMenuAnchorEl)}
                        onClose={handleFilterMenuClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        {
                            filters.map((filter) => {
                                const FilterUI = filter.render;
                                return (
                                    <FilterUI
                                        className={classes.filterUI}
                                        id={filter.id}
                                        key={filter.id}
                                        setActiveFilters={setActiveFilters}
                                    />
                                );
                            })
                        }
                    </Menu>

                </>
            )}
        </Toolbar>
    );
};

TableToolbar.propTypes = {
    title: PropTypes.string.isRequired,
    numSelected: PropTypes.number.isRequired,
    filterable: PropTypes.bool,
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            render: PropTypes.elementType.isRequired,
            id: PropTypes.string.isRequired,
        })
    ),
    setActiveFilters: PropTypes.func,
};

export default TableToolbar;

import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography, Popover } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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

const FilterMenu = ({ anchorEl, onClose, filters, setActiveFilters }) => {

    const classes = useStyles();
    return (

        <Popover
            id="filter-menu"
            classes={{
                paper: classes.filterMenu,
            }}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onClose}
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
            <Typography variant="h6" color="primary">
            Filter
            </Typography>
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
        </Popover>
    );
};

FilterMenu.propTypes = {
    anchorEl: PropTypes.instanceOf(Element),
    onClose: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            render: PropTypes.elementType.isRequired,
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
    setActiveFilters: PropTypes.func.isRequired,
};

export default FilterMenu;

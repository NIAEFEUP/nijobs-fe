import React from "react";
import PropTypes from "prop-types";

import { Chip, makeStyles } from "@material-ui/core";

import FIELD_OPTIONS from "../../SearchArea/AdvancedSearch/FieldOptions";
import TECH_OPTIONS from "../../SearchArea/AdvancedSearch/TechOptions";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    skeleton: {
        marginBottom: theme.spacing(1),
        width: "100%",
    },
    list: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(1),
        padding: 0,
        listStyleType: "none",
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(1),
    },
}));

const ChipList = ({ type, values, loading }) => {
    const classes = useStyles();
    if (loading)
        return (
            <div className={classes.skeleton}>
                <Skeleton height={40} />
            </div>
        );
    else if (values) {
        return (
            <ul className={classes.list}>
                {values.map((value) =>
                    <li key={value}>
                        <Chip
                            label={ type === "Technologies" ? TECH_OPTIONS[value] : FIELD_OPTIONS[value] }
                            variant={type === "Technologies" ? "outlined" : "default"}
                            size="small"
                            className={classes.chip}
                        />
                    </li>
                )}
            </ul>
        );
    }
    return null;
};

ChipList.propTypes = {
    type: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool,
};

export default ChipList;

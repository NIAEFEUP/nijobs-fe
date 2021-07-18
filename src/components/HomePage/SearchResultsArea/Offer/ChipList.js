import React from "react";
import PropTypes from "prop-types";

import { Chip, makeStyles } from "@material-ui/core";
import { capitalizeUpperCaseString } from "../../../../utils";

const useStyles = makeStyles((theme) => ({
    list: {
        marginTop: theme.spacing(0.5),
        listStyleType: "none",
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(1),
    },
}));

const ChipList = ({ type, content }) => {
    const classes = useStyles();
    if (content) {
        const listItems = content.map((listElement) =>
            <li key={listElement}>
                <Chip
                    label={capitalizeUpperCaseString(listElement)}
                    variant={type === "Technologies" ? "outlined" : "default"}
                    size="small"
                    className={classes.chip}
                />
            </li>
        );
        return (
            <div component="ul" className={classes.list}>
                {listItems}
            </div>
        );

    }
    return null;
};

ChipList.propTypes = {
    type: PropTypes.string,
    content: PropTypes.array,
};

export default ChipList;

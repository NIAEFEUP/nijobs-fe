import React from "react";
import PropTypes from "prop-types";

import { Chip, makeStyles } from "@material-ui/core";

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

function capitalizeString(content) {
    if (content && content === content.toUpperCase())
        return content.toLowerCase().split(" ").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");
    return content;
}

const ChipList = ({ type, content }) => {
    const classes = useStyles();
    if (content) {
        const listItems = content.map((listElement) =>
            <li key={listElement}>
                <Chip
                    label={capitalizeString(listElement)}
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

import React from "react";
import PropTypes from "prop-types";

import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    singleElement: {
        marginTop: theme.spacing(2),
    },
    listElement: {
        marginTop: theme.spacing(2),
    },
    list: {
        marginTop: 0,
    },
}));

function capitalizeString(content) {
    if (content === content.toUpperCase())
        return content.toLowerCase().split(" ").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");
    return content;
}

const OfferContentItem = ({ hasPermissions, title, content }) => {
    const classes = useStyles();
    if (hasPermissions && content) {
        if (typeof content === "string") {
            return (
                <div className={classes.singleElement}>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                    <Typography variant="body1">
                        {capitalizeString(content)}
                    </Typography>
                </div>
            );
        }
        const listItems = content.map((listElement) =>
            <li key={listElement}>
                {capitalizeString(listElement)}
            </li>
        );
        return (
            <div className={classes.listElement}>
                <Typography variant="h6">
                    {title}
                </Typography>
                <Typography variant="body1">
                    <ul className={classes.list}>
                        {listItems}
                    </ul>
                </Typography>
            </div>
        );

    }
    return null;
};

OfferContentItem.propTypes = {
    hasPermissions: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
};

export default OfferContentItem;

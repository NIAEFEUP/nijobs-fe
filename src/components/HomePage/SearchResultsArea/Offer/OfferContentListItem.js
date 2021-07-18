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

const OfferContentListItem = ({ title, content }) => {
    const classes = useStyles();
    if (content) {
        if (typeof content === "string") {
            return (
                <div className={classes.singleElement}>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                    <Typography variant="body1">
                        {content}
                    </Typography>
                </div>
            );
        }
        const listItems = content.map((listElement) =>
            <li key={listElement}>
                {listElement}
            </li>
        );
        return (
            <div className={classes.listElement}>
                <Typography variant="h6">
                    {title}
                </Typography>
                <Typography
                    component="span" /* if we don't use component="span",
                                    there is an <ul> element inside a <p>,
                                    which fails the validateDOMNesting*/
                    variant="body1"
                >
                    <ul className={classes.list}>
                        {listItems}
                    </ul>
                </Typography>
            </div>
        );

    }
    return null;
};

OfferContentListItem.propTypes = {
    title: PropTypes.string,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
};

export default OfferContentListItem;

import React from "react";
import PropTypes from "prop-types";

import { Typography, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    listElement: {
        marginTop: theme.spacing(2),
    },
    list: {
        margin: 0,
    },
    item: {
        marginTop: theme.spacing(0.5),
    },
}));

const OfferContentListItem = ({ title, content, loading }) => {
    const classes = useStyles();
    if (loading)
        return (
            <div className={classes.listElement}>
                <Skeleton variant="rect" height="50px" />
            </div>
        );
    if (content) {
        const listItems = content.map((listElement) =>
            <li key={listElement} className={classes.item}>
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
    content: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool,
};

export default OfferContentListItem;

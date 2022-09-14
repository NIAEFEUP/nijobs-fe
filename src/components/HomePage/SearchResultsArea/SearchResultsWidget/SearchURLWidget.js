import React, { useCallback } from "react";

import { ListItem, makeStyles } from "@material-ui/core";

const useSearchURLWidgetStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        padding: theme.spacing(3, "10%", 3, "10%"),
        flexDirection: "column",
        gap: theme.spacing(0.5),
    },
    label: {
        textAlign: "center",
    },
    link: {
        width: "95%",
        height: "40px",
        cursor: "pointer",
        fontWeight: "bold",
        userSelect: "none",
        whiteSpace: "nowrap",
        overflowX: "scroll",
    },
}));

const SearchURLWidget = () => {

    const classes = useSearchURLWidgetStyles();

    const fullURL = window.location.href;

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(fullURL);
    }, [fullURL]);

    return (
        <ListItem className={classes.root}>
            <p className={classes.label}>Click this URL to copy it to your clipboard to share this search result:</p>
            <p onClick={copyToClipboard} className={classes.link}>
                {fullURL}
            </p>
        </ListItem>
    );
};

export default SearchURLWidget;

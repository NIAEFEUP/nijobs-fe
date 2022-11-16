import React, { useCallback } from "react";

import { useDispatch } from "react-redux";
import { makeStyles, Button, Typography, Divider } from "@material-ui/core";

import { addSnackbar } from "../../../../actions/notificationActions";

const useSearchURLWidgetStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(3),
    },
    label: {
        textAlign: "center",
    },
    container: {
        margin: "10px auto",
        paddingBottom: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
    },
    link: {
        width: "95%",
        fontWeight: "bold",
        userSelect: "none",
        whiteSpace: "nowrap",
        overflowX: "scroll",
        textAlign: "center",
    },
}));

const SearchURLWidget = React.forwardRef((_, ref) => {

    const classes = useSearchURLWidgetStyles();
    const dispatch = useDispatch();

    const fullURL = window.location.href;

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(fullURL);

        dispatch(addSnackbar({
            message: "Copied to clipboard.",
            options: {
                autoHideDuration: 1500,
            },
        }));
    }, [dispatch, fullURL]);

    return (
        <div ref={ref} className={classes.root}>
            <Typography className={classes.label}>Copy this URL to share your search with other people:</Typography>
            <div className={classes.container}>
                <Typography className={classes.link}>
                    {fullURL}
                </Typography>
                <Button color="primary" variant="contained" onClick={copyToClipboard}>Copy</Button>
            </div>
            <Divider />
        </div>
    );
});

SearchURLWidget.displayName = "SearchURLWidget";

export default SearchURLWidget;

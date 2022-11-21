import React, { useCallback } from "react";

import { useDispatch } from "react-redux";
import { makeStyles, Typography, Icon, IconButton } from "@material-ui/core";

import { addSnackbar } from "../../../../actions/notificationActions";

const useSearchURLWidgetStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    label: {
        textAlign: "center",
    },
    container: {
        margin: "10px auto",
        padding: "2px 10px",
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eeeeee",
        borderRadius: "4px",
    },
    link: {
        fontWeight: "bold",
        userSelect: "none",
        whiteSpace: "nowrap",
        overflowX: "scroll",
        textAlign: "center",
    },
}));

const SearchURLWidget = () => {

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
        <div className={classes.root}>
            <Typography className={classes.label}>Copy this URL to share your search with other people:</Typography>
            <div className={classes.container}>
                <Typography className={classes.link}>
                    {fullURL}
                </Typography>
                <IconButton onClick={copyToClipboard}>
                    <Icon color="primary">
                        content_copy
                    </Icon>
                    <Typography variant="srOnly">Copy URL to clipboard</Typography>
                </IconButton>
            </div>
        </div>
    );
};

export default SearchURLWidget;

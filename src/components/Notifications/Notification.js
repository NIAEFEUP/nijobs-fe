import { Button, emphasize, IconButton, makeStyles, Paper } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => {
    const backgroundColor = emphasize(theme.palette.background.default, theme.palette.type === "light" ? 0.8 : 0.98);
    return {
        notification: {
            backgroundColor,
            color: theme.palette.getContrastText(backgroundColor),
            padding: theme.spacing(1, 2),
            borderRadius: "5px",
            minWidth: "500px",
            maxWidth: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        actions: {
            alignSelf: "flex-end",
        },
    };
});

const Notification = React.forwardRef(({ message, isUndo, handleCancel, handleClose, onMouseEnter, onMouseLeave }, ref) => {

    const classes = useStyles();

    return (
        <Paper
            ref={ref}
            className={ classes.notification }
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div>
                {message}
            </div>
            <div className={classes.actions}>

                {isUndo && <Button color="primary" onClick={handleCancel}>Undo</Button>}
                <IconButton
                    aria-label="Close"
                    size="small"
                    edge={isUndo ? false : "end"}
                    color="inherit"
                    onClick={handleClose}
                >
                    <Close />
                </IconButton>
            </div>
        </Paper>
    );
});

Notification.displayName = "Notification";

export default Notification;

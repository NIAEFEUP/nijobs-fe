import { Button, emphasize, IconButton, makeStyles, Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import { Close } from "@material-ui/icons";
import React from "react";
import { useDesktop } from "../../utils/media-queries";
import clsx from "clsx";

const useStyles = makeStyles((theme) => {
    const backgroundColor = emphasize(theme.palette.background.default, theme.palette.type === "light" ? 0.8 : 0.98);
    return {
        notification: ({ isMobile }) => ({
            backgroundColor,
            color: theme.palette.getContrastText(backgroundColor),
            padding: theme.spacing(1, 2),
            borderRadius: "5px",
            width: isMobile ? "100%" : "500px",
            display: "grid",
            alignItems: "center",
            // justifyContent: "space-between",
        }),
        generalNotification: {
            gridTemplateColumns: "9fr 1fr",
        },
        undoNotification: {
            gridTemplateColumns: "8fr 1fr 1fr",
        },
        closeAction: {
            gridColumnStart: 2,
            textAlign: "right",
        },
        closeActionUndo: {
            gridColumnStart: 3,
        },
        undoAction: {
            // minWidth: "100px",
            gridColumnStart: 2,
            textAlign: "right",
            // alignSelf: "flex-end",
        },
    };
});

const Notification = React.forwardRef(({ message, isUndo, handleCancel, handleClose, onMouseEnter, onMouseLeave }, ref) => {

    const classes = useStyles({ isMobile: !useDesktop() });

    return (
        <Paper
            ref={ref}
            className={clsx(classes.notification, {
                [classes.generalNotification]: !isUndo,
                [classes.undoNotification]: isUndo,
            })}

            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div>
                {message}
            </div>
            {isUndo &&
                <div className={classes.undoAction}>
                    <Button color="primary" onClick={handleCancel}>Undo</Button>
                </div>
            }
            <div className={clsx(classes.closeAction, { [classes.closeActionUndo]: isUndo })}>
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

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    isUndo: PropTypes.bool, // If true, will show an undo button (for undo type notifications)
    handleCancel: PropTypes.func,
    handleClose: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
};

export default Notification;

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
            gap: theme.spacing(2),
        }),
        generalNotification: {
            gridTemplateColumns: "9fr 1fr",
        },
        actionNotification: {
            gridTemplateColumns: "8fr 1fr 1fr",
        },
        closeAction: {
            gridColumnStart: 2,
            textAlign: "right",
        },
        closeActionUndo: {
            gridColumnStart: 3,
        },
        action: {
            gridColumnStart: 2,
            textAlign: "right",
            width: "max-content",
        },
    };
});

const Notification = React.forwardRef(({ message, actionText, actionHandler, handleClose, onMouseEnter, onMouseLeave }, ref) => {

    const classes = useStyles({ isMobile: !useDesktop() });

    const hasAction = actionText !== undefined;

    return (
        <Paper
            ref={ref}
            className={clsx(classes.notification, {
                [classes.generalNotification]: !hasAction,
                [classes.actionNotification]: hasAction,
            })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div>
                {message}
            </div>
            {hasAction &&
                <div className={classes.action}>
                    <Button color="primary" onClick={actionHandler}>
                        {actionText}
                    </Button>
                </div>
            }
            <div className={clsx(classes.closeAction, { [classes.closeActionUndo]: hasAction })}>
                <IconButton
                    aria-label="Close"
                    size="small"
                    edge={hasAction ? false : "end"}
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
    actionText: PropTypes.string, // If present, will show a button that calls actionHandler on click
    actionHandler: PropTypes.func,
    handleClose: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
};

export default Notification;


import { Alert as MUIAlert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { Warning as WarningIcon } from "@material-ui/icons";
import React from "react";

const useStyles = (props) => makeStyles(() => ({

    content: {
        fontSize: `${props.fontSize}em`,
        "& .MuiAlert-icon": {
            fontSize: `${props.fontSize + 0.3}em`,
        },
        margin: "0.5em 0em",
    },
}));

export const Alert = ({ type, title, fontSize = 1, children }) => {
    const classes = useStyles({ fontSize: fontSize })();
    return (
        <MUIAlert severity={type} className={classes.content} icon={<WarningIcon />} data-testid="Alert">
            {title ?
                <AlertTitle>
                    {title}
                </AlertTitle> : null}
            {children}
        </MUIAlert>
    );
};

Alert.propTypes = {
    type: PropTypes.oneOf(["error", "warning", "info", "success"]),
    title: PropTypes.string,
    children: PropTypes.string,
    fontSize: PropTypes.number,
};

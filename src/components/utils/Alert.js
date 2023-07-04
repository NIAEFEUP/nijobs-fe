import {Alert as MUI_Alert, AlertTitle} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import { Warning as WarningIcon } from "@material-ui/icons";
import React from 'react';

const useStyles = (props) => makeStyles((theme) => ({

    content:{
        fontSize: props.fontSize+"em",
        "& .MuiAlert-icon": {
            fontSize: (props.fontSize+0.3)+"em"
        },
        margin:"0.5em 0em"
    },
}));

export const Alert = ({type, title, fontSize = 1, children}) => {
    const classes = useStyles({fontSize: fontSize})();
    return (
        <MUI_Alert severity={type} className={classes.content} icon={<WarningIcon />}>
            {title ? <AlertTitle>{title}</AlertTitle> : null}
            {children}
        </MUI_Alert>
    )
}

Alert.propTypes = {
    type: PropTypes.oneOf(["error", "warning", "info", "success"]),
    title: PropTypes.string,
    children: PropTypes.string,
    fontSize: PropTypes.number,
}
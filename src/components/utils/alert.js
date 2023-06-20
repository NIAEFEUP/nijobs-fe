
import {Alert as Alert_, AlertTitle} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";

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
        <Alert_ severity={type} className={classes.content}>
            {title ? <AlertTitle>{title}</AlertTitle> : null}
            {children}
        </Alert_>
    )
}

Alert.propTypes = {
    type: PropTypes.oneOf(["error", "warning", "info", "success"]),
    title: PropTypes.string,
    children: PropTypes.string,
    fontSize: PropTypes.number,
}
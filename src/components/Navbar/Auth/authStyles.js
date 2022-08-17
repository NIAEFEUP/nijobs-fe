/* istanbul ignore file */
import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    modal: {
        width: "95vw",
        maxWidth: "130em",
        height: "80vh",
        maxHeight: "100em",
        margin: "0 auto",
    },
    loginBtnWrapper: {
        display: "grid",
    },
    loginBtn: {
        color: "white",
        gridColumn: 1,
        gridRow: 1,
    },
    loginProgress: {
        color: "white",
        gridColumn: 1,
        gridRow: 1,
        margin: "auto",
    },
    loginProgressRed: {
        composes: "$loginProgress",
        color: theme.palette.primary.main,
    },
}));

/* istanbul ignore file */
import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
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

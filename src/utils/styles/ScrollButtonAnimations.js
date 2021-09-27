/* istanbul ignore file */

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    "@keyframes bounce": {
        "80%": {
            transform: "translateY(0)",
        },
        "40%": {
            transform: "translateY(-12px)",
        },
        "60%": {
            transform: "translateY(-5px)",
        },
    },
    button: {
        animation: "$bounce infinite 1.5s",
        "&:hover": {
            animation: "none",
        },
    },
}));

export default useStyles;

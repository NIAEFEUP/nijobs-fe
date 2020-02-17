import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(() => ({
    maskWrapper: {
        height: "100vh",
        width: "100vw",
        position: "absolute",
        zIndex: -1,
        top: 0,
    },
    mainMask: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50%",
        width: "100%",
        backgroundColor: "rgb(220, 79, 71)",

        // "-webkit-clip-path": "polygon(25vw 50vh, 50vh 50vh, 75vw 50vh, 100vw 40vh, 100vw 0vh, 0vw 0vh, 0vw 40vh)",
        clipPath: "polygon(25vw 50vh, 50vh 50vh, 75vw 50vh, 100vw 40vh, 100vw 0vh, 0vw 0vh, 0vw 40vh)",
    },
}));

export const MainMask = ({ children }) => {
    const classes = useStyle();
    return (
        <div className={classes.maskWrapper}>
            <div className={classes.mainMask}>
                {children}
            </div>
        </div>
    );
};

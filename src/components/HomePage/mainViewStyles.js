/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    mainView: {
        height: "100vh",
        width: "100%",
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
    mainMaskMobile: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50%",
        width: "100%",
        backgroundColor: "rgb(220, 79, 71)",
    },
    mainLogo: {
        textAlign: "center",
        paddingBottom: "3em",
        "& img": {
            width: "50%",
        },
    },
    mainLogoMobile: {
        textAlign: "center",
        paddingBottom: "3em",
        "& img": {
            width: "80%",
        },
    },
    searchArea: {
        width: "100%",
        position: "absolute",
        top: "42.5vh",
        "& > *:first-child": {
            width: "60%",
            margin: "0 auto",
        },
    },
    searchAreaMobile: {
        width: "100%",
        position: "absolute",
        top: "42.5vh",
        "& > *:first-child": {
            width: "100%",
            margin: "0 auto",
        },
    },
    infoBox: {
        position: "absolute",
        margin: "0 auto",
        bottom: "10vh",
        zIndex: -1,
        width: "100%",
    },
    showMoreBtn: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        bottom: "1em",
    },
}))
;

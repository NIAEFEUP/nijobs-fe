/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    mainView: {
        height: "100vh",
        width: "100%",
    },
    mainLogo: ({ isMobile }) => ({
        textAlign: "center",
        paddingBottom: "3em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& img": {
            width: isMobile ? "80%" : "50%",
            maxHeight: isMobile ? "max(20vh, 6em)" : "unset",
        },
    }),
    mainLogoMobile: {
        textAlign: "center",
        paddingBottom: "3em",
        "& img": {
            width: "80%",
        },
    },
    searchArea: ({ isMobile }) => ({
        width: "100%",
        position: "absolute",
        top: "calc(50vh - 80px)",
        left: 0,
        "& > *:first-child": {
            width: isMobile ? "100%" : "60%",
            margin: "0 auto",
        },
        zIndex: 10,
    }),
    infoBox: ({ isMobile }) => ({
        padding: theme.spacing(0, 1),
        position: "absolute",
        margin: "0 auto",
        bottom: isMobile ? "15vh" : "25vh",
        zIndex: -1,
        width: "100%",
    }),
    showMoreBtn: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        bottom: "1em",
        zIndex: 1,
    },
}))
;

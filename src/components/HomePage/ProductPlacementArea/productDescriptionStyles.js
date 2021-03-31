/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    productDescription: ({ isMobile }) => ({
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        width: isMobile ? "100%" : "80%",
        margin: "5em auto",
    }),
    productDescriptionCol: ({ isMobile }) => ({
        flex: "1 1 0",
        padding: "2em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        "& > svg": {
            width: "125px",
            height: "auto",
            marginBottom: "2em",
        },
        "& > div": {
            flexGrow: "1",
            width: isMobile ? "100%" : "75%",
            textAlign: "center",
        },
    }),
    productDescriptionInfo: {
        display: "flex",
        flexDirection: "column",
        "& > p:not(:first-child)": {
            margin: "1em 0 0.5em 0",
        },
    },
    productDescriptionAnchor: {
        width: "100%",
        height: "100%",
        "&:hover": {
            textDecoration: "none",
        },
    },
}))
;

/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    divider: {
        margin: 0,
    },
    fullHeight: {
        height: "100%",
    },
    searchResults: {
        boxSizing: "border-box",
        minHeight: "100vh",
        width: "100%",
        margin: "0 auto",
        "& ol": {
            "list-style-type": "none",
        },
    },
    errorLoadingOffersIcon: {
        fontSize: "6em",
        color: theme.palette.secondary.main,
    },
    searchArea: {
        width: "80%",
    },
    reviseCriteriaErrorMessage: {
        marginBottom: theme.spacing(4),
    },
    noOffersColumn: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
}));

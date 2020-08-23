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
        margin: theme.spacing(4, 0),
        textAlign: "center",
    },
    noOffersColumn: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    offerBodyContainer: {
        height: "100%",
        paddingLeft: "2em",
    },
    searchOfferErrorContainer: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    offerContent: ({ isMobile }) => ({
        padding: !isMobile && theme.spacing(3),
        height: "100%",
    }),
    unselectedOffer: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    pleaseSelectOfferText: {
        color: "grey",
    },
    magnifyingGlassAnimationWrapper: {
        marginBottom: theme.spacing(2),
    },
}));

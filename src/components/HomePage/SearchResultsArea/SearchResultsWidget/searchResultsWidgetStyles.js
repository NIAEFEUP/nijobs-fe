/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    divider: {
        margin: 0,
    },
    fullHeight: {
        height: "100%",
    },
    fullWidth: {
        width: "100%",
    },
    searchResults: {
        boxSizing: "border-box",
        height: "100vh",
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
        width: "90%",
    },
    reviseCriteriaErrorMessage: {
        margin: theme.spacing(4, 0),
        textAlign: "center",
    },
    noOffersColumn: {
        flexGrow: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    offerItemsContainer: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        overflow: "auto",
    },
    offerBodyContainer: {
        height: "100%",
        paddingLeft: "2em",
        overflow: "auto",
    },
    offerDescription: {

    },
    searchOfferErrorContainer: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    offerHeader: ({ isMobile }) => ({
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        paddingBottom: theme.spacing(4),
        paddingTop: !isMobile ? theme.spacing(3) : 0,
    }),
    offerContent: ({ isMobile }) => {
        const paddingRules = isMobile ? { padding: 0 } : { padding: theme.spacing(3), paddingTop: 0 };
        return {
            ...paddingRules,
            height: "100%",
        };
    },
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

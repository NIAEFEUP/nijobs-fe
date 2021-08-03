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
    offerHeader: {
        marginBottom: theme.spacing(1),
        alignItems: "flex-start",

    },
    verticalDivider: {
        height: "auto",
        marginRight: theme.spacing(2),
    },
    offerOptions: ({ isMobile }) => ({
        display: "flex",
        justifyContent: !isMobile && "flex-end",
        marginTop: isMobile && theme.spacing(2),
        paddingLeft: isMobile && theme.spacing(1),
    }),
    offerOptionsButtons: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    offerTitle: {
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    offerTitleLink: {
        color: "inherit",
    },
    hiddenOfferInfo: {
        color: "grey",
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    searchOfferErrorContainer: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    iconStyle: {
        verticalAlign: "sub",
        marginRight: theme.spacing(1),
    },
    offerDivider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    offerDetails: ({ isMobile }) => ({
        backgroundColor: "white",
        paddingBottom: theme.spacing(1),
        paddingTop: !isMobile ? theme.spacing(3) : 0,
    }),
    visibilityButton: {
        padding: 0,
        marginBottom: theme.spacing(0.7),
        marginTop: theme.spacing(0.7),
    },
    companyInfo: ({ loading }) => ({
        display: "flex",
        alignItems: "center",
        width: loading && "30%",
    }),
    ownerNameSkeleton: {
        width: "30%",
        marginLeft: theme.spacing(1),
    },
    companyLogoInOffer: {
        height: "2em",
        display: "inline",
        marginRight: theme.spacing(1),
    },
    offerContent: ({ isMobile, isPage }) => {
        let paddingValue = !isMobile ? theme.spacing(3) : 0;
        let paddingTopValue = 0;
        if (isPage) {
            paddingValue = isMobile ? theme.spacing(3) : theme.spacing(10);
            paddingTopValue = !isMobile && theme.spacing(5);
        }
        return {
            paddingTop: paddingTopValue,
            paddingRight: paddingValue,
            paddingBottom: paddingValue,
            paddingLeft: paddingValue,
            height: "100%",
        };
    },
    offerDescription: {
        marginTop: theme.spacing(3),
    },
}));

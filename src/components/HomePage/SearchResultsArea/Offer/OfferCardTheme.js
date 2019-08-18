import AppTheme from "../../../../AppTheme";

export default {
    card: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    details: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    logo: {
        height: 100,
        width: 100,
        marginLeft: AppTheme.spacing(3),
        backgroundSize: "contain",
    },
    title: {
        fontWeight: 500,
    },
    subheader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "1em",
        paddingBottom: "0.5em",
        borderBottom: "1px solid #f3f3f3",
    },
    skeletonSubheader: {
        marginTop: "1em",
        paddingBottom: "0.5em",
        borderBottom: "1px solid #f3f3f3",
    },
    content: {
        paddingTop: 0,
    },
};

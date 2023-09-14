import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    companyDetails: {
        paddingTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    profileWidget: {
        paddingTop: theme.spacing(5),
        paddingRight: theme.spacing(10),
        paddingLeft: theme.spacing(10),
        paddingBottom: theme.spacing(10),
        height: "100%",
    },
    companyDescription: {
        display: "flex",
        alignItems: "center",
    },
    companyName: {
        paddingBottom: theme.spacing(2),
    },
    textSkeleton: {
        paddingBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    companyLogo: {
        height: "200px",
        width: "200px",
        // boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        marginRight: theme.spacing(2),
    },
    companyLogoSkeleton: {
        height: "200px",
        width: "200px",
    },
    companyText: {
        display: "absolute",
    },
    companyContacts: {
        "& ul": {
            marginBottom: "8px",
            marginTop: "8px",
        },
        paddingBlock: theme.spacing(2),
    },
    divider: {
        marginTop: "4px",
    },
    textButton: {
        alignItems: "center",
        padding: theme.spacing(1),
        marginInline: theme.spacing(1),
        "& .MuiTypography-root": {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
    },
    profileActions: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    actionsHeader: {
        paddingBottom: theme.spacing(0.4),
    },
}));

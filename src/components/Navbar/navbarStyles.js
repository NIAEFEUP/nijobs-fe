/* istanbul ignore file */
import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    navbar: ({ isMobile }) => ({
        paddingTop: theme.spacing(isMobile ? 0 : 3),
    }),
    toolbar: {
        display: "flex",
    },
    homePageLink: ({ isMobile }) => ({
        marginLeft: theme.spacing(isMobile ? 0 : 3),
    }),
    linkStyle: ({ isMobile }) => ({
        textDecoration: "none",
        color: isMobile ? theme.palette.secondary.main : "white",
        fontWeight: "500",
        fontSize: "medium",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
    }),
    homeIcon: {
        boxSizing: "content-box",
        paddingRight: theme.spacing(1),
    },
    userAccountArea: ({ isMobile }) => ({
        marginRight: theme.spacing(isMobile ? 0 : 3),
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    }),
    userLogo: ({ isMobile, showHomePageLink }) => ({
        backgroundColor: !isMobile && theme.palette.primary.main,
        zIndex: 1,
        cursor: "pointer",
        padding: theme.spacing(1),
        width: theme.spacing(6),
        height: theme.spacing(6),
        borderRadius: "50%",
        color: (isMobile && showHomePageLink) ? theme.palette.secondary.main : "white",
    }),
    userMenuButton: {
        color: "white",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
}));

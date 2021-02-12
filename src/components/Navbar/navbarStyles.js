/* istanbul ignore file */
import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    navbar: ({ isMobile }) => ({
        paddingTop: theme.spacing(isMobile ? 0 : 3),
    }),
    toolbar: {
        display: "flex",
    },
    HomePageLink: ({ isMobile }) => ({
        marginLeft: theme.spacing(isMobile ? 0 : 3),
        display: "flex",
        flex: 1,
    }),
    linkStyle: {
        textDecoration: "none",
        color: "white",
        fontWeight: "500",
        fontSize: "medium",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
    },
    homeIcon: {
        marginRight: theme.spacing(1),
    },
    userAccountArea: ({ isMobile }) => ({
        marginRight: theme.spacing(isMobile ? 0 : 3),
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    }),
    userLogo: {
        backgroundColor: theme.palette.primary.main,
        zIndex: 1,
        cursor: "pointer",
        padding: theme.spacing(1),
        width: theme.spacing(6),
        height: theme.spacing(6),
        borderRadius: "50%",
    },
    userMenuButton: {
        color: "white",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
}));

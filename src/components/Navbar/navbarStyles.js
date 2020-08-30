/* istanbul ignore file */
import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    navbar: ({ isMobile }) => ({
        paddingTop: theme.spacing(isMobile ? 0 : 3),
    }),
    toolbar: {
        display: "flex",
        justifyContent: "flex-end",
    },
    userAccountArea: ({ isMobile }) => ({
        marginRight: theme.spacing(isMobile ? 0 : 3),
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

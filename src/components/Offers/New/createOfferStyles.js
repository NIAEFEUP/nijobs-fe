import { makeStyles } from "@material-ui/core";

export default (isMobile) => makeStyles((theme) => ({
    form: {
        width: "100%",
        flexGrow: 1,
    },
    formCard: {
        padding: isMobile ? theme.spacing(0, 1) : theme.spacing(10),
        paddingBottom: !isMobile && theme.spacing(2),
        display: isMobile && "flex",
        flexDirection: isMobile &&  "column",
        height: isMobile && "100%",
    },
    formContent: {
        display: !isMobile && "flex",
        flexDirection: !isMobile && "column",
        alignItems: "center",
    },
    buttonsArea: {
        display: "flex",
        justifyContent: "flex-end",
        padding: theme.spacing(3, 2),
        paddingTop: isMobile && 0,
    },
    buttonsAreaMobile: {
        position: "sticky",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        justifyContent: "center",
        paddingBottom: 0,
        "& > *": {
            backgroundColor: "white",
            width: "100%",
            paddingBottom: theme.spacing(4),
        },
    },
    loginAlert: {
        left: 0,
        justifyContent: "flex-start",
    },
}));

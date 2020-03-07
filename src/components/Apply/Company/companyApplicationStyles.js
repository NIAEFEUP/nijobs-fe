import { makeStyles } from "@material-ui/core";

export default (isMobile) => makeStyles((theme) => ({
    form: {
        width: isMobile ? "100%" : "60%",
    },
    motivation: {
        marginTop: theme.spacing(5),
    },
    formCard: {
        padding: isMobile ? theme.spacing(0, 1) : theme.spacing(10),
        paddingBottom: !isMobile && theme.spacing(2),
        minHeight: isMobile && "100vh",
    },
    formContent: {
        display: !isMobile && "flex",
        flexDirection: !isMobile && "column",
    },
    buttonsArea: {
        display: "flex",
        justifyContent: "flex-end",
        padding: theme.spacing(3, 2),
        paddingTop: isMobile && 0,
    },
    showPasswordToggle: {
        bottom: theme.spacing(-1),
        marginRight: theme.spacing(-1),
    },
    passwordGroupWrapper: {
        justifyContent: !isMobile && "space-between",
        "& > div:first-child": {
            marginRight: !isMobile && theme.spacing(2),
        },
    },
}));

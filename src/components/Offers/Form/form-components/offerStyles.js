import { makeStyles } from "@material-ui/core";

export default (isMobile) => makeStyles((theme) => ({
    form: {
        width: "100%",
        flexGrow: 1,
    },
    formCard: {
        padding: isMobile ? theme.spacing(0, 1, 10) : theme.spacing(10),
        display: isMobile && "flex",
        flexDirection: isMobile &&  "column",
        height: isMobile && "100%",
    },
    formContent: {
        display: !isMobile && "flex",
        flexDirection: !isMobile && "column",
        alignItems: "center",
        marginTop: theme.spacing(4),
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
    gridWithInfo: {
        display: "flex",
        alignItems: "center",
    },
    autocompleteChipWrapper: {
        minHeight: "40px",
    },
    advancedSettingsDatePicker: {
        width: "100%",
        marginRight: theme.spacing(2),
    },
    menuSelect: {
        "&:focus": {
            backgroundColor: "inherit",
        },
    },
    vacanciesGrid: {
        marginBottom: theme.spacing(5),
    },
    advancedSettingsCollapse: {
        marginBottom: theme.spacing(4),
    },
    jobTypeGrid: {
        marginBottom: theme.spacing(4),
    },
    multiTextOptionGrid: {
        marginBottom: theme.spacing(4),
    },
    requiredFields: {
        marginTop: theme.spacing(2),
        color: "#9E9E9E",
    },
}));

import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
    chipListWrapper: {
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "100%",
        marginTop: theme.spacing(1),
        "& > *": {
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    },
}));

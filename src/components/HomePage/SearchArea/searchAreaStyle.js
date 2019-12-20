/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    searchArea: {
        padding: "1em 3em 3em 3em",
        position: "relative",
        "& > form": {
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "1fr auto",
            alignItems: "center",
            gridGap: "1em",
        },
    },
    searchBar: {
        gridColumn: 1,
    },
    advancedSearchContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr",
        alignItems: "center",
        gridGap: "1em",
    },
    mobileAdvancedSearchJobDuration: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    mobileAdvancedSearchActions: {
        padding: theme.spacing(2),
    },
    submitSearchButtonWrapper: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        bottom: "-2em",
        left: 0,
    },
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

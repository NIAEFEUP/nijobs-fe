/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    searchArea: {
        padding: "1em 3em 3em 3em",
        position: "relative",
        "& > form": {
            display: "grid",
            gridTemplateColumns: `auto ${theme.spacing(6)}px`,
            gridTemplateRows: "1fr auto",
            alignItems: "center",
            gridGap: theme.spacing(1),
            gridColumnGap: 0,
        },
    },
    searchBar: {
        gridColumn: 1,
    },
    advancedSearchOuterWrapper: {
        gridColumn: "1 / span 2",

    },
    advancedSearchContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 0.7fr 1fr 0.7fr",
        alignItems: "center",
        gridGap: "1em",
    },
    advancedSearchToggle: {
        marginBottom: theme.spacing(-2),
    },
    advancedSearchJobDuration: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(0),
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
    fieldsSelector: {
        gridRowStart: 3,
        gridColumnStart: 1,
        alignSelf: "flex-start",
        "& > div": {
            marginTop: 0,
        },
        "& .chip-wrapper": {
            gridColumnStart: 1,
            gridRowStart: 4,
        },
    },
    techsSelector: {
        gridRowStart: 3,
        gridColumnStart: 2,
        alignSelf: "flex-start",
        "& > div": {
            marginTop: 0,
        },
        "& .chip-wrapper": {
            gridColumnStart: 2,
            gridRowStart: 4,
        },
    },
    jobDurationSliderToggleMobile: {
        marginTop: theme.spacing(2),
    },
    jobDurationSliderToggle: {
        gridRowStart: 2,
        marginTop: theme.spacing(2),
    },
    jobDurationSliderCollapse: {
        gridRowStart: 2,
        gridColumnStart: 2,
    },
    resetBtnWrapper: {
        gridRowStart: 4,
        gridColumnStart: 1,
        "& > *": {
            marginTop: theme.spacing(2),
            marginLeft: theme.spacing(-1),
        },
        "& .chip-wrapper": {
            gridColumnStart: 2,
            gridRowStart: 4,
        },
    },
    jobHiddenSliderToggle: {
        gridRowStart: 4,
        gridColumnStart: 2,
    },
}));

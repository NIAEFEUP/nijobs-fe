/* istanbul ignore file */
import { darkTextColor } from "../../../AppTheme";

export default (theme) => ({

    root: {
        width: 200,
    },

    cssLabel: {
        color: darkTextColor,
    },
    cssLabelShrink: {},
    cssFocused: {},
    cssOutlinedInput: {

        "& $notchedOutline": {
            borderColor: darkTextColor,
        },

        "&$cssFocused $notchedOutline": {
            borderColor: theme.palette.primary.main,
        },
    },
    notchedOutline: {},
    formControl: {},


    searchButton: {
        color: darkTextColor,
    },
});
